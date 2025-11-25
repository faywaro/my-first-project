import express, { Request, Response } from "express";
import todoRouter from "./todo.routers.ts/todo.router.js";
import categoryRouter from "./todo.routers.ts/category.router.js";
import { setupSwagger } from "./swagger.js";
import cors from "cors";

export function MainApp() {
    const app = express();

    app.use(cors());
    app.use(express.json());
    
    app.get("/", (req: Request, res: Response) => {
        res.send("Hello word");
    });

    //contollers
    app.use("/api/todo", todoRouter)
    app.use("/api/category", categoryRouter)
    setupSwagger(app);

    //errors

    return app;
}

