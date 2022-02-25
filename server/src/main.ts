import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //Bootstrap Swagger API
  const config = new DocumentBuilder()
    .setTitle('Tinder Clone')
    .setDescription('A clone for Tinder')
    .setVersion('1.0')
    .addTag('Tinder Clone v1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  //Enable Cors
  app.enableCors();

  await app.listen(3000);
}
bootstrap();
