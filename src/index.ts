import express, {Express, Request, Response} from "express";
import dotenv from "dotenv";
import { router } from "./app-controller";

const app : Express = express();
const PORT = 3000;

dotenv.config();
app.use(express.json());

app.get("/", (req : Request, res : Response) => {
    res.status(200).send("Halo Assalamualaikum, welcome to database-movie API\n");
});

app.use("/movies", router);

app.listen(PORT, () => {
    console.log(`[Server] : App running at PORT : ${PORT}`);
});