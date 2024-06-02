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
// const  updateUser = async(req:Request,res:Response) => {
//     try {
//         const {userId} = req.params;
//         const result = await UserServices.updateUserFromIntoDB(parseInt(userId),req.body);
//         res.json({
//             success: true,
//             message: 'User updated successfully!',
//             data: result,
//           })
//     } catch (error) {
//         res.json({
//             success: false,
//             message: 'failed to update User',
//             error: error,
//           })
//     }
// }
const updateOneUser = async (req: Request, res: Response) => {
    try {
      const userId = req.params.userId
      const updatedData = req.body
    //   const { error, value } = userValidatorSchema.validate(updatedData)
    //   if (error) {
    //     res.json({
    //       error: error.details,
    //     })
    //   } else {
        const result = await UserServices.updateUserFromIntoDB(parseInt(userId), updatedData)
        if (result) {
          res.json({
            success: true,
            message: 'User updated successfully!',
            data: result,
          })
        } else {
          res.json({
            success: false,
            message: 'User not found',
            error: {
              code: 404,
              description: 'User not found!',
            },
          })
        }
      
    } catch (err) {
      res.json({
        success: false,
        message: 'Update failed!',
        error: {
          code: 11000,
          description: 'User ID or User Name already exsist',
        },
      })
    }
  }
  const  deleteUser = async(req:Request,res:Response) => {
    try {
        const {userId} = req.params;
        const result = await UserServices.deleteUserFromDB(userId);
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
    getSingleUser,
    updateOneUser,
    deleteUser
}