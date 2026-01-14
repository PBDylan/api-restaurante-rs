import { Router } from "express"; // Importa o roteador do Express

import { ProductsController } from "../controllers/products-controller"; // Importa o controlador de produtos

const productsRouter = Router(); // Cria um roteador para produtos
const productsController = new ProductsController(); // Instancia o controlador de produtos

productsRouter.get("/", productsController.index); // Listamos todos os produtos
productsRouter.post("/", productsController.create); // Criamos um novo produto
productsRouter.put("/:id", productsController.update); // Atualizamos um produto existente
productsRouter.delete("/:id", productsController.remove); // Removemos um produto existente

export { productsRouter }; // Exporta o roteador de produtos
