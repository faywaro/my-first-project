import express from 'express';
import { config } from 'dotenv';
import healthRouter from './routes/health.router.js';
import todosRouter from './routes/todos.router.js';

config();

export function buildApp() {
    const app = express();

    app.use(express.json());
    app.use('/health', healthRouter);
    app.use('/api/todos', todosRouter);

    // 404
    app.use((_req: express.Request, res: express.Response) => {
        res.status(404).json({ error: 'Not Found' });
    });

    // Ошибки
    app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    });

    return app;
}