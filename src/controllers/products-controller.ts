import { NextFunction, Request, Response } from "express";

class ProductsController {
  async index(request: Request, response: Response, next: NextFunction) {
    try {
      // Lógica para listar todos os produtos
      return response.json({ message: "Ok" });
    } catch (error) {
      next(error);
    }
  }
}

export { ProductsController };
