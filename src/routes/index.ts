import { Router } from "express"; // Importa o roteador do Express

import { productsRouter } from "./products-routes"; // Importa as rotas de produtos
import { tablesRoutes } from "./tables-routes"; // Importa as rotas de mesas
import { tablesSessionsRoutes } from "./table-sessions-routes"; // Importa as rotas de sessões de mesas
import { ordersRoutes } from "./orders-routes";

const routes = Router(); // Cria o roteador principal

routes.use("/products", productsRouter); // Usa as rotas de produtos no caminho /products
routes.use("/tables", tablesRoutes); // Usa as rotas de mesas no caminho /tables
routes.use("/tables/sessions", tablesSessionsRoutes); // Usa as rotas de sessões de mesas no caminho /tables/sessions
routes.use("/orders", ordersRoutes); // Usa as rotas de pedidos no caminho /orders

export { routes }; // Exporta o roteador principal
