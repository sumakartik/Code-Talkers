/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("users").del();
  await knex("products").del();
  await knex("tasks").del();
  await knex("users_tasks").del();
  await knex("users_products").del();

  await knex("users").insert([
    {
      fname: "Sarfo",
      lname: "Frimpong",
      email: "frimpongsarfok@gmail.com",
      isAdmin: true,
    },
    {
      fname: "Patrick",
      lname: "Rocco",
      email: "rocco@rpatrick.com",
      isAdmin: false,
    },
  ]);
  await knex("products").insert([
    { title: "Project 1" },
    { title: "Project 2" },
  ]);
  await knex("tasks").insert([
    {
      title: "Data Flow Design",
      status: 1,
      tags: "Project 1 Data Flow",
      points: 30,
      product_id: 1,
    },
    {
      title: "Data Structure Design",
      status: 1,
      tags: "Project 2 Data Flow",
      points: 35,
      product_id: 2,
    },
  ]);
  await knex("users_tasks").insert([
    { user_id: 2, task_id: 1 },
    { user_id: 2, task_id: 2 },
  ]);
  await knex("users_products").insert([
    { user_id: 2, product_id: 1 },
    { user_id: 1, product_id: 1 },
    { user_id: 2, product_id: 2 },
    { user_id: 1, product_id: 2 },
  ]);
};
