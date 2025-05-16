import { ArgumentsHost, Catch, ExceptionFilter, flatten, HttpException } from "@nestjs/common";

@Catch()
export class ErrorHandler implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const request = ctx.getRequest()
        const response = ctx.getResponse()

        const status = exception instanceof HttpException ? exception.getStatus() : 500
        // console.log(exception.response.message);


        response
            .status(status)
            .json({
                success: false,
                statusCode: status,
                // message: exception.response.message ? exception.response.message : "Internal server error"
            })
    }
}