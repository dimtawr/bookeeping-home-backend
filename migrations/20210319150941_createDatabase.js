const { default: knex } = require("knex");

exports.up = async (knex) => {
  await knex.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"'),
	await knex.schema.createTable('users', (t) => {
		t.string('uid').primary().defaultTo(knex.raw('uuid_generate_v4()'));
		t.string('username');
		t.string('password')
	});
  await Promise.all([
		knex.schema.createTable('category', (t) => {
			t.string('uid').primary().defaultTo(knex.raw('uuid_generate_v4()'));
			t.string('category');
			t.string('type');
			t.string('user');
			t.foreign('user').references('uid').inTable('users');
		}),
		knex.schema.createTable('operations', (t) => {
			t.string('uid').primary().defaultTo(knex.raw('uuid_generate_v4()'));
			t.string('user');
			t.decimal('amount', 10, 2).defaultTo(0);
			t.string('category');
			t.foreign('user').references('uid').inTable('users');
			t.foreign('category').references('uid').inTable('category')
		}),
		knex.schema.createTable('comingExpenses', (t) => {
			t.string('uid').primary().defaultTo(knex.raw('uuid_generate_v4()'));
			t.string('user');
			t.decimal('amount', 10, 2);
			t.date('date');
			t.string('discription')
			t.foreign('user').references('uid').inTable('users')
		})
  ])
};

exports.down = async (knex) => {
  await Promise.all([
		knex.schema.dropTable('comingExpenses'),
		knex.schema.dropTable('operations'),
		knex.schema.dropTable('category')
	]);
	await knex.schema.dropTable('users')
};
