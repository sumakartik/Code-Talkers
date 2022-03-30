const { round } = require("cli-boxes");
var express = require("express");
var router = express.Router();
const knex = require("knex")(
  require("../knexfile.js")[process.env.NODE_ENV || "development"]
);

/* GET home page. */
router.get("/users", function (req, res, next) {
  const { id } = req.query;
  id
    ? knex("users")
        .where({ id: id })
        .then((rows) => {
          res.status(200).json(rows);
        })
        .catch((err) => res.status(400).send(err))
    : knex("users")
        .then((rows) => {
          res.status(200).json(rows);
        })
        .catch((err) => res.status(400).send(err));
});

router.get("/users/:command", function (req, res, next) {
  const { users_id } = req.query;
  const { command } = req.params;
  switch (command) {
    case "products":
      {
        users_id
          ? knex.schema
              .raw(
                `SELECT products.id,
                        products.title,
                        products.created_at,
                        products.updated_at
                    FROM products join users_products 
                    ON (products.id=users_products.product_id)  
                    JOIN users 
                    ON (users.id=users_products.user_id) where users.id=${parseInt(
                      users_id
                    )}`
              )
              .then((select) => res.json(select.rows))
          : res.status(400).json({ status: 400, err: "user id not specified" });
      }
      break;
    case "tasks":
      {
        users_id
          ? knex.schema
              .raw(
                `SELECT tasks.id,
          tasks.title,
          tasks.status,
          tasks.tags
      FROM tasks join users_tasks 
      ON (tasks.id=users_tasks.task_id)  
      JOIN users 
      ON (users.id=users_tasks.user_id) where users.id=${parseInt(users_id)}`
              )
              .then((select) => res.json(select.rows))
          : res.status(400).json({ status: 400, err: "user id not specified" });
      }
      break;
    default: {
      res.status(400).json({ status: 400, err: "incorrect request" });
    }
  }
});
router.get("/products", function (req, res, next) {
  const { id } = req.query;

  id
    ? knex("products")
        .where({ id: id })
        .then((rows) => {
          res.status(200).json(rows);
        })
        .catch((err) => res.status(400).send(err))
    : knex("products")
        .then((rows) => {
          res.status(200).json(rows);
        })
        .catch((err) => res.status(400).send(err));
});

router.get("/tasks", function (req, res, next) {
  const { product_id } = req.query;
  knex("tasks")
    .where({ product_id: product_id })
    .then((rows) => {
      res.status(200).json(rows);
    })
    .catch((err) => res.status(400).send(err));
});

/* POST */

router.post("/users", function (req, res, next) {
  knex("users")
    .insert(req.query)
    .then((select) => {
      res.status(201).json({ status: 201, msg: "Added Successful" });
    })
    .catch((err) => res.json(err));
});

router.post("/products", function (req, res, next) {
  knex("products")
    .insert(req.query)
    .then((select) => {
      res.status(201).json({ status: 201, msg: "Added Successful" });
    })
    .catch((err) => res.json(err));
});

router.post("/tasks", function (req, res, next) {
  knex("tasks")
    .insert(req.query)
    .then((select) => {
      res.status(201).json({ status: 201, msg: "Added Successful" });
    })
    .catch((err) => res.json(err));
});

router.patch("/tasks", function (req, res, next) {
  knex("tasks")
    .update(req.query)
    .where({ product_id: req.query.product_id })
    .then((rows) => {
      res.status(201).json({ status: 204, msg: "Update Successful" });
    })
    .catch((err) => res.json(err));
});

/*knex.raw("select products.title,products.created_at,products.updated_at,users.id,users.fname,users.lname from products join users_products on (users_products.product_id=products.id) join users on (users.id=users_products.user_id);").then(select=>{
      let products=[];
      select.rows.forEach(product => {
        let tmpProduct=null;
        products.forEach(prod=>{
          if(prod.title===product.title){
            tmpProduct=prod;
          }
        });
       if(!tmpProduct){
           products.push({title:product.title,created_at:product.created_at,users:[{fname:product.fname,lname:product.lname}]});
       }else{
          tmpProduct.users.push({fname:product.fname,lname:product.lname});
       }     
    });
    res.json(products);
}); */
//SELECT products.id,products.title,products.created_at,products.updated_at  FROM products join users_products ON (products.id=users_products.product_id)  JOIN users ON (users.id=users_products.user_id) where users.id=1;
module.exports = router;
