import { Router } from "express";

import { TablesSessionsController } from "@/controllers/tables-sessions-controller";

const tablesSessionsRoutes = Router(); // Cria o roteador para sessões de mesas
const tablesSessionsController = new TablesSessionsController();
// Instancia o controlador de sessões de mesas

tablesSessionsRoutes.post("/", tablesSessionsController.create);
// Define a rota POST / para criar uma nova sessão de mesa

export { tablesSessionsRoutes };
