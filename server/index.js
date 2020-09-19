require('dotenv/config');
const express = require('express');

const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');

const app = express();

app.use(express.json());
app.use(staticMiddleware);
app.use(sessionMiddleware);

// app.use(express.json());

app.get('/api/health-check', (req, res, next) => {
  db.query('select \'successfully connected\' as "message"')
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});

app.get('/api/products', (req, res, next) => {
  req.session.carId = '123';
  if (req.session.carId) { console.log(req.session.carId); }
  db.query('select "productId", name, price, image, "shortDescription" , "longDescription" from products')
    .then(result => res.json(result.rows))
    .catch(err => next(err));
});

app.get('/api/products/:productId', (req, res, next) => {
  db.query(`select * from products where "productId" = '${req.params.productId}'`)
    .then(response => {
      if (response.rows.length === 0) {
        next(new ClientError(`cannot find ${req.params.productId} in the products table`, 404));
      } else {
        res.json(response.rows[0]);
      }
    })
    .catch(err => next(err));
});

app.get('/api/cart', (req, res, next) => {
  console.log('req', req.session.cartId);
  if (!req.session.cartId) {
    res.json({});
  }
  db.query(`select "c"."cartItemId",
        "c"."price",
        "p"."productId",
        "p"."image",
        "p"."name",
        "p"."shortDescription"
    from "cartItems" as "c"
    join "products" as "p" using ("productId")
    where "c"."cartId" = ${req.session.cartId}`)
    .then(response => res.json(response.rows));
});

// app.post('/api/cart', (req, res, next) => {
//   const { productId } = req.body;
//   if (!parseInt(productId, 10)) {
//     return res.status(400).json({
//       error: '"GradeId" must be a positive integer'
//     });
//   }
//   db.query(`select "price" from "products" where "productId" = ${req.body.productId}`)
//     .then(response => {
//       if (response.rows.length === 0) {
//         next(new ClientError(`cannot find ${req.params.productId} in the products table`, 400));
//       }
//       const price = response.rows[0].price;
//       var obj = {};
//       db.query('insert into carts ("cartId", "createdAt") values (default, default) returning "cartId"')
//         .then(response => {
//           obj = {
//             cartId: response.rows[0].cartId,
//             price: price
//           };
//           return obj;
//         })
//         .then(response => {
//           console.log('Obj', response);
//           req.session.cartId = response.cartId;
//           db.query(`insert into "cartItems" ("cartId", "productId", "price")
//                     values (${response.cartId},${req.body.productId},${response.price})
//                     returning "cartItemId"`)
//             .then(response => { return response.rows[0].cartItemId; })
//             .then(response => {
//               db.query(`select "c"."cartItemId",
//                          "c"."price",
//                           "p"."productId",
//                           "p"."name",
//                           "p"."image",
//                           "p"."shortDescription",
//                           "p"."longDescription"
//                         from "cartItems" as "c"
//                         join "products" as"p" using ("productId")
//                         where "c"."cartItemId" = ${response}`)
//                 .then(response => res.status(201).json(response.rows[0]));
//             });
//         })
//         .catch(err => next(err));
//     });
// });

app.post('/api/cart', (req, res, next) => {
  const { productId } = req.body;
  if (!parseInt(productId, 10)) {
    return res.status(400).json({
      error: '"GradeId" must be a positive integer'
    });
  }
  db.query(`select "price" from "products" where "productId" = ${req.body.productId}`)
    .then(response => {
      if (response.rows.length === 0) {
        next(new ClientError(`cannot find ${req.params.productId} in the products table`, 400));
      }
      const price = response.rows[0].price;
      var obj = {};
      if (req.session.cartId) {
        return {
          cartId: req.session.cartId,
          price: response.rows[0].price
        };
      }
      return (db.query('insert into carts ("cartId", "createdAt") values (default, default) returning "cartId"')
        .then(response => {
          obj = {
            cartId: response.rows[0].cartId,
            price: price
          };
          return obj;
        })
      );
    })
    .then(response => {
      req.session.cartId = response.cartId;
      db.query(`insert into "cartItems" ("cartId", "productId", "price")
                    values (${response.cartId},${req.body.productId},${response.price}) 
                    returning "cartItemId"`)
        .then(response => { return response.rows[0].cartItemId; })
        .then(response => {
          db.query(`select "c"."cartItemId",
                         "c"."price",
                          "p"."productId",
                          "p"."name",
                          "p"."image",
                          "p"."shortDescription",
                          "p"."longDescription"  
                        from "cartItems" as "c" 
                        join "products" as"p" using ("productId")  
                        where "c"."cartItemId" = ${response}`)
            .then(response => res.status(201).json(response.rows[0]));
        });
    })
    .catch(err => next(err));
});

app.use('/api', (req, res, next) => {
  next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', process.env.PORT);
});
