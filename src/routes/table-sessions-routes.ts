import { Router } from "express";

import { TablesSessionsController } from "@/controllers/tables-sessions-controller";

const tablesSessionsRoutes = Router(); // Cria o roteador para sessões de mesas
const tablesSessionsController = new TablesSessionsController();
// Instancia o controlador de sessões de mesas

tablesSessionsRoutes.get("/", tablesSessionsController.index);
// Define a rota GET / para listar todas as sessões de mesa
tablesSessionsRoutes.post("/", tablesSessionsController.create);
// Define a rota POST / para criar uma nova sessão de mesa
tablesSessionsRoutes.put(":id", tablesSessionsController.update);
// Define a rota PUT /:id para atualizar uma sessão de mesa existente

export { tablesSessionsRoutes };
