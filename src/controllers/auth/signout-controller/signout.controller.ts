import {Request, Response} from "express";

export async function signoutController(_req: Request, res: Response): Promise<Response>{
    try{
        console.log("Antes de fazer a req" + _req.headers.cookie)
        res.clearCookie("token").send();
        console.log("Depois de fazer a req" + _req.headers.cookie)
        return res.status(204);
    }catch (err){
        console.log(err);
        return res.status(500).json({ message: "Erro interno do servidor!" });
    }
}