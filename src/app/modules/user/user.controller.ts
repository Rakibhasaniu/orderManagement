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
const  getAllUser = async(req:Request,res:Response) => {
    try {
        const result = await UserServices.getAllUserFromDB();
        res.json({
            success: true,
            message: 'User retrieve successfully!',
            data: result,
          })
    } catch (error) {
        res.json({
            success: false,
            message: 'failed to retrieve user',
            error: error,
          })
    }
}
const  getSingleUser = async(req:Request,res:Response) => {
    try {
        const userId = req.params.userId;
        const result = await UserServices.getSingleUserFromDB(parseInt(userId));
        res.json({
            success: true,
            message: 'Get Single User successfully!',
            data: result,
          })
    } catch (error) {
        res.json({
            success: false,
            message: 'failed to Get Single User',
            error: error,
          })
    }
}

export const UserController = {
    createUser,
    getAllUser,
    getSingleUser
}