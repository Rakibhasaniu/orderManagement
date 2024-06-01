import { TUser } from "./user.interface";
import User from "./user.model";


const createUserIntoDB = async(payload:TUser) =>{
    const result = await User.create(payload);
    const userObject = result.toObject() as TUser & {
        _id?: string;
        __v?: number;
        fullName?: { _id?: string };
        address?: { _id?: string };
      };
      delete userObject._id;
  delete userObject.__v;
  if (userObject.fullName) {
    delete userObject.fullName._id;
  }
  if (userObject.address) {
    delete userObject.address._id;
  }
    //   console.log(userObject)
    return userObject;
}

export const UserServices ={
    createUserIntoDB,
    
}