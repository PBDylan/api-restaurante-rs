import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("tables", (table) => {
    // A tipagem significa:
    // "Crie uma tabela chamada 'tables' com a seguinte estrutura:"
    table.increments("id").primary();
    table.integer("table_number").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now()); // timestamp é usado para armazenar data e hora
    table.timestamp("updated_at").defaultTo(knex.fn.now()); // timestamps cria duas colunas: created_at e updated_at
    // defaultTo(knex.fn.now()) define o valor padrão como a data e hora atual do banco de dados
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("tables");
}
