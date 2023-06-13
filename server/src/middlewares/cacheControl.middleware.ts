import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class CacheControlMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { url } = req;

    // Check if the requested resource is an image
    if (url.match(/\.(jpg|jpeg|png|gif|svg|webp)$/i)) {
      res.setHeader('Cache-Control', 'public, max-age=31536000');
    }

    next();
  }
}
