import { MainApp } from "./app.js";
import { connectDB, disconnectDB } from "./db/prisma_db.js";

const PORT = process.env.PORT || 3000;

const app = MainApp();

async function start() {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`Server is running at on port: ${process.env.PORT}`);
    });
}

start().catch(async (err) => {
    console.log("Error start server^ ", err);
    await disconnectDB();
    process.exit(0);
})

async function stop() {
    await disconnectDB();
    process.exit(1);
}

process.on("SIGINT", stop);
process.on("SIGTERM", stop);

