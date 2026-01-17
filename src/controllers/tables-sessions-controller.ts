import { NextFunction, Request, Response } from "express"; // Importa os tipos do Express

class TablesSessionsController {
  // Define a classe TablesSessionsController
  async create(request: Request, response: Response, next: NextFunction) {
    try {
      return response.status(201).json;
    } catch (error) {
      next(error);
    }
  }
}

export { TablesSessionsController };
