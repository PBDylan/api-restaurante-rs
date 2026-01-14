import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("products").del();

  // Inserts seed entries
  await knex("products").insert([
    { name: "Isca de frango", price: "60" },
    { name: "Picadinho Gourmet com Ovo Poché e Farofa de Banana", price: "68" },
    {
      name: "Bife Ancho Grelhado com Batatas Rústicas e Chimichurri",
      price: "92",
    },
    {
      name: "Polpetone Recheado de Mussarela com Tagliatelle na Manteiga",
      price: "72",
    },
    { name: "Peito de Frango Cordon Bleu com Salada de Rúcula", price: "65" },
    { name: "Sobrecoxa Desossada ao Molho de Laranja e Mel", price: "58" },
    {
      name: "Frango Grelhado ao Molho Dijon com Arroz de Amêndoas",
      price: "62",
    },
  ]);
}
