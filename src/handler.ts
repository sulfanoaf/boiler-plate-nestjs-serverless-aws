import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { APIGatewayProxyHandler, Context, Handler } from 'aws-lambda';
import serverlessExpress from '@vendia/serverless-express';
import express = require('express');

import { AppModule } from './app.module';

// NOTE: If you get ERR_CONTENT_DECODING_FAILED in your browser, this is likely
// due to a compressed response (e.g. gzip) which has not been handled correctly
// by aws-serverless-express and/or API Gateway. Add the necessary MIME types to
// binaryMimeTypes below
let cachedServers: Handler;

/* istanbul ignore next */
process.on('unhandledRejection', reason => {
  console.error(reason);
});

/* istanbul ignore next */
process.on('uncaughtException', reason => {
  console.error(reason);
});

async function bootstrapServer(): Promise<Handler> {
  try {
    const basePath = process.env.BASE_PATH;

    const expressApp = express();
    expressApp.disable('x-powered-by');

    const adapter = new ExpressAdapter(expressApp);

    const app = await NestFactory.create(AppModule, adapter);
    if (basePath) {
      app.setGlobalPrefix(basePath);
    }

    app.enableCors({
      credentials: true,
      allowedHeaders:
        'Content-Type,Authorization,X-Api-Key,X-Amz-Date,X-Amz-Security-Token,X-Amz-User-Agent',
    });

    await app.init();

    return serverlessExpress({ app: expressApp });
  } catch (error) {
    console.error(error);

    throw error;
  }
}

export const handler: APIGatewayProxyHandler = async (
  event: any,
  context: Context,
  callback: any,
) => {
  if (event.source === 'serverless-plugin-warmup') {
    console.info('WarmUp - Lambda is warm!');
    return;
  }

  if (event.pathParameters?.proxy) {
    event.pathParameters.proxy = event.path.substring(1);
  }

  if (!cachedServers) {
    cachedServers = await bootstrapServer();
  }

  return cachedServers(event, context, callback);
};
