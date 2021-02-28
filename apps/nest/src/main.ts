// # PLUGINS IMPORTS //
import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

// # EXTRA IMPORTS //
import { AppModule } from '@server/app.module'
import { IConstants } from '@server/config/constants'

/////////////////////////////////////////////////////////////////////////////

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // Validation
  app.useGlobalPipes(new ValidationPipe())

  const configService = app.get(ConfigService)
  const nestConfig = configService.get<IConstants.NestConfig>('nest')
  const corsConfig = configService.get<IConstants.CorsConfig>('cors')
  const swaggerConfig = configService.get<IConstants.SwaggerConfig>('swagger')

  // Swagger Api
  if (swaggerConfig.enabled) {
    const options = new DocumentBuilder()
      .setTitle(swaggerConfig.title || 'Nestjs')
      .setDescription(swaggerConfig.description || 'The nestjs API description')
      .setVersion(swaggerConfig.version || '1.0')
      .build()
    const document = SwaggerModule.createDocument(app, options)

    SwaggerModule.setup(swaggerConfig.path || 'api', app, document)
  }

  // Cors
  if (corsConfig.enabled) {
    app.enableCors()
  }

  await app.listen(process.env.PORT || nestConfig.port || 3000)
}
bootstrap()
