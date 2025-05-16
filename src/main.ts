import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ErrorHandler } from './filters/validation.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.useGlobalFilters(new ErrorHandler())

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    // forbidNonWhitelisted: true
  }))

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
    prefix: 'v'
  })

  app.enableCors({
    origin: process.env.CORS,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
  })

  const config = new DocumentBuilder()
    .setTitle('Auth')
    .setVersion('0.0')
    .addBearerAuth()
    .build()

  const documentFactory = () => SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('', app, documentFactory)

  const port = process.env.APP_PORT ? parseInt(process.env.APP_PORT) : 5432
  await app.listen(port, () => {
    console.log(`Server is listening ar ${port}`);

  });
}
bootstrap();
