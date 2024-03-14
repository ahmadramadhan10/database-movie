import express, {Express, Request, Response} from "express";
import dotenv from "dotenv";

const app : Express = express();
const PORT = process.env.PORT;

dotenv.config();
app.use(express.json());

app.get("/", (req : Request, res : Response) => {
    res.send("Halo Assalamualaikum");
});

app.listen(PORT, () => {
    console.log(`[Server] : App running at PORT : ${PORT}`);
});