/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("users", (table) => {
      table.increments("id").primary();
      table.string("fname");
      table.string("lname");
      table.string("email");
      table.boolean("isAdmin");
    })
    .createTable("products", (table) => {
      table.increments("id").primary();
      table.string("title");
      table.timestamps(true, true);
    })
    .createTable("tasks", (table) => {
      table.increments("id").primary();
      table.string("title");
      table.smallint("status");
      table.string("tags");
      table.smallint("points");
      table.integer("product_id");
      table
        .foreign("product_id")
        .references("id")
        .inTable("products")
        .onDelete("cascade");
    })
    .createTable("users_tasks", (table) => {
      table.increments("id").primary();
      table.integer("user_id");
      table.integer("task_id");
      table
        .foreign("user_id")
        .references("id")
        .inTable("users")
        .onDelete("cascade");
      table
        .foreign("task_id")
        .references("id")
        .inTable("tasks")
        .onDelete("cascade");
    })
    .createTable("users_products", (table) => {
      table.increments("id").primary();
      table.integer("user_id");
      table.integer("product_id");
      table
        .foreign("user_id")
        .references("id")
        .inTable("users")
        .onDelete("cascade");
      table
        .foreign("product_id")
        .references("id")
        .inTable("products")
        .onDelete("cascade");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("users_products")
    .dropTableIfExists("users_tasks")
    .dropTableIfExists("tasks")
    .dropTableIfExists("products")
    .dropTableIfExists("users");
};
