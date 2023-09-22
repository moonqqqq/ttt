import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ERROR_CODE } from 'src/shared/constants/error-code';
import { ILoggerService } from 'src/shared/logger/interface/logger-service.interface';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: ILoggerService) {}

  catch(exception, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();

    const status = HttpStatus.INTERNAL_SERVER_ERROR;
    const message =
      process.env.NODE_ENV !== 'prod' ? (exception as any).message : '';
    const error = ERROR_CODE.INTERNER_SERVER_ERROR;

    if (exception instanceof HttpException) {
      const detail = exception.getResponse();
      return res.status(exception.getStatus()).json(detail);
    }

    // Send alert here or in logging server
    this.logger.error(
      `[${new Date()}] [${req.method}] ${req.url} / body: ${
        req.body
      } / code:${error}- ${exception} - ${(exception as any).stack}}`,
    );

    res.status(status).json({ error, statusCode: status, message });
  }
}
