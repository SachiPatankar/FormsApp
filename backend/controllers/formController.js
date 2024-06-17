
import { Info } from "../models/InfoModel.js";

export async function handlePostInfo(req, res) {

    const { name, code, number } = req.body;
    
    try {
        const newInfo =  await Info.create({
            name,
            code,
            number
          });
          res.json(newInfo);
    } catch (e) {
        console.error("Error in /handlePostInfo controller: ", e);
        res.status(422).json({ error: e.message });

    }
}

export async function handleGetInfo(req, res) {
    
    try {
        const allInfo =  await Info.find();
          res.json(allInfo);
    } catch (e) {
        console.error("Error in /handleGetInfo controller: ", e);
        res.status(422).json({ error: e.message });

    }
}

