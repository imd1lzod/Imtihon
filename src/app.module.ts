import { Module } from '@nestjs/common';
import { SequelizeModule } from "@nestjs/sequelize"
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModel } from './auth/model/user.model';
import { ProductModule } from './products/product.module';
import { ProductModel } from './products/model/product.model';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { JwtModule } from '@nestjs/jwt';



@Module({
  imports: [
    JwtModule.register({
      secret: 'www',
      privateKey: "www",
    }),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'uploads'),
      serveRoot: '/uploads'
    }),
    ConfigModule.forRoot({
      isGlobal: true
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      models: [UserModel, ProductModel],
      autoLoadModels: true,
      logging: false,
      sync: {
        alter: true,
        force: true
      }
      // logging: false
    }), AuthModule, ProductModule
  ],

})
export class AppModule { }
