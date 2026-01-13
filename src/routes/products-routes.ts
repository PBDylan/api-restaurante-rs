import { Router } from "express"; // Importa o roteador do Express

import { ProductsController } from "../controllers/products-controller"; // Importa o controlador de produtos

const productsRouter = Router(); // Cria um roteador para produtos
const productsController = new ProductsController(); // Instancia o controlador de produtos

productsRouter.get("/", productsController.index); // Listamos todos os produtos

export { productsRouter }; // Exporta o roteador de produtos
