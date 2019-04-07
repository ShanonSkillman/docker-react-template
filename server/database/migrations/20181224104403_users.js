exports.up = function (knex, Promise) {
  return knex.schema.createTable('users', table => {
    table.increments('id');
    table.string('first_name').notNullable();
    table.string('last_name').notNullable();
    table.string('email').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
    table.timestamp('updated_at').defaultTo(knex.fn.now()).notNullable();
  })
    .createTable('cards', table => {
      table.increments('id');
      table.string('task', 255).notNullable();
      table.string('status', 1024).notNullable();
      // table.foreign('priority_id').references('id').inTable('priorities').notNullable();
      // table.foreign('status_id').references('id').inTable('statuses').notNullable();
      // table.foreign('created_by').references('id').inTable('users').notNullable();
      // table.foreign('assigned_to').references('id').inTable('users').nullable();
      table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
      table.timestamp('updated_at').defaultTo(knex.fn.now()).notNullable();
    })
};



// .createTable('priorities', table => {
//   table.increments('id').notNullable().unique();
//   table.string('name').notNullable();
//   table.integer('rank').notNullable();
//   table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
//   table.timestamp('updated_at').defaultTo(knex.fn.now()).notNullable();
// })

// .createTable('statuses', table => {
//   table.increments('id').notNullable().unique();
//   table.string('name').notNullable();
//   table.integer('rank').notNullable();
//   table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
//   table.timestamp('updated_at').defaultTo(knex.fn.now()).notNullable();
// })



exports.down = function (knex, Promise) {
  return knex.schema.dropTable('users')
    .dropTable('cards')
  // .dropTable('priorities')
  // .dropTable('statuses')
};
