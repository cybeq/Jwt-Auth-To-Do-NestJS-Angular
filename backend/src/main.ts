import {HttpAdapterHost, NestFactory} from '@nestjs/core';
import { AppModule } from './app.module';
import {UnhandledExceptionFilter} from "./common/exceptions/filters/UnhandledExceptionFilter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:4200'
  });
  const  httpAdapter  = app.get(HttpAdapterHost);
  app.useGlobalFilters(new UnhandledExceptionFilter(httpAdapter));

  await app.listen(3000);
}
bootstrap();
