import { Router } from "express"; // Importa o roteador do Express

import { productsRouter } from "./products-routes"; // Importa as rotas de produtos

const routes = Router(); // Cria o roteador principal

routes.use("/products", productsRouter); // Usa as rotas de produtos no caminho /products

export { routes }; // Exporta o roteador principal
