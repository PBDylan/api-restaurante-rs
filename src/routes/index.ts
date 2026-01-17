import { Router } from "express"; // Importa o roteador do Express

import { productsRouter } from "./products-routes"; // Importa as rotas de produtos
import { tablesRoutes } from "./tables-routes"; // Importa as rotas de mesas

const routes = Router(); // Cria o roteador principal

routes.use("/products", productsRouter); // Usa as rotas de produtos no caminho /products
routes.use("/tables", tablesRoutes); // Usa as rotas de mesas no caminho /tables

export { routes }; // Exporta o roteador principal
