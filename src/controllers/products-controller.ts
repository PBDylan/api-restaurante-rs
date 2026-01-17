import { AppError } from "@/utils/AppError";
import { NextFunction, Request, Response } from "express";
import { knex } from "@/database/knex";
import { z } from "zod";

class ProductsController {
  async index(request: Request, response: Response, next: NextFunction) {
    try {
      const { name } = request.query; // Aqui você pode obter parâmetros de consulta,
      // se necessário, name seria um exemplo
      const products = await knex<ProductRepository>("products")
        .select()
        .whereLike("name", `%${name ?? ""}%`) // Filtra por nome se fornecido
        // O significado é o seguinte: se name for fornecido na consulta, ele
        // filtra os produtos cujo nome contém o valor de name.
        // Especificamente lendo .whereLike("name", `%${name ?? ""}%`), significa:
        // "Filtre os produtos onde o campo 'name' contém a substring fornecida em 'name'.
        // Se 'name' não for fornecido, use uma string vazia, o que resulta em
        // todos os produtos sendo retornados, pois todo nome contém uma string vazia."
        .orderBy("name");

      return response.json(products);
    } catch (error) {
      next(error);
    }
  }
  async create(request: Request, response: Response, next: NextFunction) {
    try {
      const { name, price } = request.body;

      await knex<ProductRepository>("products").insert({
        name,
        price,
      });

      return response.status(201).json({ name, price });
    } catch (error) {
      next(error);
    }
  }
  async update(request: Request, response: Response, next: NextFunction) {
    try {
      const id = z // valida e transforma o id do parâmetro de string para número
        .string() // Significa que o valor inicial é uma string
        .transform((value) => Number(value)) // Transforma a string em número
        .refine((value) => !isNaN(value), { message: "id must be a number" }) // Garante que o valor transformado seja um número válido
        .parse(request.params.id); // Aplica a validação e transformação ao valor do parâmetro de rota 'id'
      // parse é o método que executa a validação e transformação definida anteriormente
      // request é o objeto da requisição HTTP
      // Então basicamente, estou validando em parse, a request/valor inserido no parâmetro de rota 'id'
      // params é a propriedade do objeto request que contém os parâmetros de rota, exemplo: /products/:id
      // id é o nome do parâmetro de rota que estamos validando e transformando

      const bodySchema = z.object({
        // valida o corpo da requisição
        name: z.string().trim().min(6), // nome deve ter no mínimo 6 caracteres
        price: z.number().gt(0), // preço deve ser um número maior que 0
      });

      const { name, price } = bodySchema.parse(request.body); // Aplica a validação ao corpo da requisição
      // o parse é o método que executa a validação definida no bodySchema
      // request.body é o corpo da requisição HTTP
      // o bodySchema define a estrutura esperada do corpo da requisição a partir do qual os dados serão extraídos
      // "Mas de onde o bodySchema define a estrutura esperada do corpo da requisição a partir do qual os dados serão extraídos?"
      // Ele é definido logo acima, onde usamos z.object para criar um esquema que espera um objeto com as propriedades name e price
      // name deve ser uma string com no mínimo 6 caracteres e price deve ser um número maior que 0

      const product = await knex<ProductRepository>("products") // verifica se o produto existe // <ProductRepository> é uma
        // tipagem genérica para o knex, ela é feita para garantir que o TypeScript reconheça os tipos das colunas da tabela products
        // Ela se encontra em src/repositories/ProductRepository.ts, é criaada pelo desenvolvedor para ajudar na tipagem
        .select() // Seleciona todas as colunas
        .where({ id }) // Filtra pelo id fornecido
        .first(); // Pega o primeiro resultado, já que o id é único

      if (!product) {
        // Se o produto não existir, lança um erro
        throw new AppError("Product not found");
      }

      await knex<ProductRepository>("products") // Atualiza o produto
        .update({ name, price, updated_at: knex.fn.now() }) // Atualiza os campos name, price e updated_at
        // knex é o objeto de conexão com o banco de dados, fn é uma propriedade do knex que contém funções auxiliares
        // now() é uma função que retorna a data e hora atual do banco de dados
        .where({ id }); // Filtra pelo id fornecido
      // o .where está dizendo "Atualize o produto onde o id é igual ao id fornecido"

      return response.json();
    } catch (error) {
      next(error);
    }
  }
  async remove(request: Request, response: Response, next: NextFunction) {
    // next é uma função que passa o erro para o próximo middleware de tratamento de erros
    // NextFunction é o tipo do next, ele é importado do express
    // Sua função é capturar erros assíncronos em middlewares e controladores do Express
    // middlewares e controladores do Express são funções que lidam com requisições HTTP
    try {
      const id = z
        .string() // Indica que o valor inicial é uma string
        .transform((value) => Number(value)) // "Esse value não tinha de estar declarado antes?"
        // Na verdade, não. O value é um parâmetro implícito da função de transformação.
        // Quando usamos o método transform do Zod, ele automaticamente passa o valor que está sendo validado
        // para a função de transformação como um argumento. Então, mesmo que não tenhamos declarado value antes,
        // ele é fornecido pelo Zod quando a função é chamada durante o processo de validação e transformação.
        .refine((value) => !isNaN(value), { message: "id must be a number" })
        // refine é como se fosse uma validação personalizada de if, onde verificamos se o valor não é NaN.
        .parse(request.params.id);

      const product = await knex<ProductRepository>("products") // verifica se o produto existe
        .select() // Seleciona todas as colunas
        .where({ id }) // Filtra pelo id fornecido
        .first(); // Pega o primeiro resultado, já que o id é único

      if (!product) {
        throw new AppError("Product not found");
      }

      await knex<ProductRepository>("products").delete().where({ id }); // Remove o produto onde o id é igual ao id fornecido

      return response.json(); // Retorna uma resposta vazia indicando sucesso
    } catch (error) {
      // Captura qualquer erro que ocorra durante o processo
      next(error); // Passa o erro para o próximo middleware de tratamento de erros
    }
  }
}

export { ProductsController };
