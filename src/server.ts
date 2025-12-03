import "dotenv/config";

import express, {
  ErrorRequestHandler,
  Request,
  Response,
  NextFunction,
} from "express";
import cors from "cors";
import { mainRoutes } from "./routes/main.routes";
import { env } from "./env";
import { ZodError } from "zod";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

app.use(express.json());
app.use(mainRoutes);

const errorHandler: ErrorRequestHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof ZodError) {
    res
      .status(400)
      .json({ message: "Erro de validação", issues: err.format() });
    return;
  }

  if (env.NODE_ENV !== "production") {
    console.error(err);
  } else {
    // TODO: adicionar ferramenta de log externa para quando tiver em produção
  }

  res.status(500).json({ message: "Erro interno do servidor!" });
  return;
};

app.use(errorHandler);

app.listen(env.PORT, () => {
  console.log(`Server running on http://localhost:${env.PORT} ✔`);
});
