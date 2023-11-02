import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

type Routes = { method: string; url: string; version: string }[];

function serializeVersion(path: string, prefix?: string): string {
  return path.split('/')[1].replace(prefix || 'v', '');
}

function serializeUrl(path: string) {
  const pathArray = path.split('/');
  return `/${pathArray.slice(2, pathArray.length).join('/')}`;
}

function checkRouteExists(
  method: string,
  url: string,
  version: string,
  routes: Routes,
): boolean {
  return routes.some(
    (route) =>
      route.method === method &&
      route.url === url &&
      route.version === version.replace(/[^\d\.]/g, ''),
  );
}

function findPreviousVersion(
  method: string,
  url: string,
  routes: Routes,
): string | null {
  const versions = routes.reduce((prev, curr) => {
    if (prev.every((item) => item !== curr.version)) {
      prev.push(curr.version);
    }

    return prev;
  }, []);

  for (const version of versions) {
    if (checkRouteExists(method, url, version, routes)) {
      return version;
    }
  }
  return null;
}

@Injectable()
export class VersionFallbackMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const version = req.path.split('/')[1];
    const originalUrl = req.path.replace(`/${version}`, '');

    const routes = req.app._router.stack
      .map((layer: { route: { path: any; stack: { method: any }[] } }) => {
        if (layer.route) {
          const path = layer.route?.path;
          const method = layer.route?.stack[0].method;
          return {
            method: method.toUpperCase(),
            url: serializeUrl(path),
            version: serializeVersion(path),
          };
        }
      })
      .filter((item: any) => item !== undefined && item.version !== '');

    const routeExists = checkRouteExists(
      req.method,
      originalUrl,
      version,
      routes,
    );

    if (!routeExists) {
      const previousVersion = findPreviousVersion(
        req.method,
        originalUrl,
        routes,
      );

      const createUrlHandler = (...paths: string[]) => {
        paths = paths.map((item) => item.replace('/', ''));

        return `/${paths.join('/')}`;
      };
      if (previousVersion) {
        const v = version.replace(/[\d\.]/g, previousVersion);

        return res.redirect(createUrlHandler(v, originalUrl));
      }
    }
    next();
  }
}
