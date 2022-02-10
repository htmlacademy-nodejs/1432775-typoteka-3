"use strict";

const {ValidationErr} = require(`../../utils/exceptions`);

module.exports =
  (fn, renderRoute, getRouteOptions) =>
    async (...args) => {
      try {
        await fn(...args);
      } catch (err) {
        const [req, res, next] = args;
        if (err instanceof ValidationErr) {
          const templateData = {};
          const validationMessages = err.data.split(`\n`);

          if (getRouteOptions) {
            let routeOptions;
            if (typeof getRouteOptions === `function`) {
              routeOptions = getRouteOptions(req, res);
            } else {
              routeOptions = getRouteOptions;
            }

            const data = await Promise.all(
                Object.values(routeOptions).map((request) => request())
            );

            Object.keys(routeOptions).forEach((key, i) => {
              templateData[key] = data[i];
            });
          }

          res.render(renderRoute, {...templateData, validationMessages});
          return;
        }

        next(err);
      }
    };
