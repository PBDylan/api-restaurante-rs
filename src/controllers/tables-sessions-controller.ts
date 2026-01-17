import { NextFunction, Request, Response } from "express"; // Importa os tipos do Express
import { knex } from "@/database/knex"; // Importa a instância do Knex
import { z } from "zod"; // Importa o Zod para validação
import { TableSessionsRepository } from "@/database/types/table-sessions-repository";
import { AppError } from "@/utils/AppError";

class TablesSessionsController {
  // Define a classe TablesSessionsController
  async create(request: Request, response: Response, next: NextFunction) {
    try {
      const bodySchema = z.object({
        table_id: z.number(),
      });

      const { table_id } = bodySchema.parse(request.body);

      const session = await knex<TableSessionsRepository>("tables_sessions")
        .select()
        .where({ table_id })
        .orderBy("opened_at", "desc")
        .first();

      if (session && !session.closed_at) {
        throw new AppError(
          "There is already an open session for this table.",
          400,
        );
      }

      await knex<TableSessionsRepository>("tables_sessions").insert({
        table_id,
        opened_at: knex.fn.now(),
      });

      return response.status(201).json();
    } catch (error) {
      next(error);
    }
  }
}

export { TablesSessionsController };
