import express, {Express, Request, Response} from "express";
import dotenv from "dotenv";
import { router } from "./app/app-controller";
import { loadData, overWrite } from "./app/app-repository";

const app : Express = express();
const PORT = 3000;

dotenv.config();
app.use(express.json());


async function prepare(): Promise<void> {
    await loadData();
}

app.get("/", (req : Request, res : Response) => {
    res.status(200).send("Halo Assalamualaikum, welcome to database-movie API\n");
});

app.use("/movies", router);

app.listen(PORT, () => {
    prepare();
    console.log(`[Server] : App running at PORT : ${PORT}`);
});