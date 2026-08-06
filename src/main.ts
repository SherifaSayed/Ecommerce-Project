import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConsoleLogger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UnifiedResponseInterceptor } from './Common/interceptor';
import { LoggerMiddleWare } from './MiddleWares';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{logger: new ConsoleLogger({logLevels:['log']})});
  const configService= app.get(ConfigService)
app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
  }),
);
app.useGlobalInterceptors(new UnifiedResponseInterceptor)
const port = configService.get('app.port');
  await app.listen( port?? 3000,()=>console.log(port));
}
bootstrap();
