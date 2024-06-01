import { Request, Response } from "express";
import { UserServices } from "./user.service";


const  createUser = async(req:Request,res:Response) => {
    try {
        const data = req.body;
        const result = await UserServices.createUserIntoDB(data);
        res.json({
            success: true,
            message: 'User created successfully!',
            data: result,
          })
    } catch (error) {
        res.json({
            success: false,
            message: 'failed to create user',
            error: error,
          })
    }
}

export const UserController = {
    createUser,
}