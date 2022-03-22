"use strict";

const {ValidationError} = require(`../../utils/exceptions`);

module.exports =
  (fn, renderRoute, getRouteOptions) =>
    async (...args) => {
      try {
        await fn(...args);
      } catch (err) {
        const [req, res, next] = args;
        if (err instanceof ValidationError) {
          const templateData = {};
          const validationMessages = err.data.split(`\n`);

          if (getRouteOptions) {
            const routeOptions =
            typeof getRouteOptions === `function`
              ? getRouteOptions(req, res)
              : getRouteOptions;

            const data = await Promise.all(
                Object.values(routeOptions).map((request) =>
                  typeof request === `function` ? request() : request
                )
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
