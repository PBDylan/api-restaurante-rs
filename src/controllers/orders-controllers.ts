import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { knex } from "@/database/knex";
import { AppError } from "@/utils/AppError";
import { TableSessionsRepository } from "@/database/types/table-sessions-repository";
import { ProductRepository } from "@/database/types/product-repository";
import { OrderRepository } from "@/database/types/orders-repository";

class OrdersController {
  async create(request: Request, response: Response, next: NextFunction) {
    try {
      const bodySchema = z.object({
        table_session_id: z.number(),
        product_id: z.number(),
        quantity: z.number(),
      });

      const { table_session_id, product_id, quantity } = bodySchema.parse(
        request.body,
      );
      const session = await knex<TableSessionsRepository>("tables_sessions")
        .where({ id: table_session_id })
        .first();

      if (!session) {
        throw new AppError("Table session not found", 404);
      }

      if (session.closed_at) {
        throw new AppError("Table session already closed", 400);
      }

      const product = await knex<ProductRepository>("products")
        .select()
        .where({ id: product_id })
        .first();

      if (!product) {
        throw new AppError("Product not found", 404);
      }

      await knex<OrderRepository>("orders").insert({
        product_id,
        table_session_id,
        quantity,
        price: product.price,
      });

      return response.status(201).json();
    } catch (error) {
      next(error);
    }
  }
  async index(request: Request, response: Response, next: NextFunction) {
    try {
      const { table_session_id } = request.params

            const order = await knex("orders")
            .select(
                "orders.id",
                "orders.table_session_id",
                "orders.product_id",
                "products.name"
                "orders.price",
                "orders.quantity",
            )
            .join("products", "products.id", "=", "orders.product_id")
            .where ({ table_session_id })

      return response.json();
    } catch (error) {
      next(error);
    }
  }
}

export { OrdersController };
