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
      console.log(userObject)
    return userObject;
}

const getAllUserFromDB = async () => {
    const result = await User.aggregate([
        { $match: {} },
        {
          $project: {
            _id: 0,
            password: 0,
            __v: 0,
            "fullName._id": 0,
            "address._id": 0,
          },
        },
      ]);
    
      return result;
  };
const getSingleUserFromDB = async (payload:number) => {
    // console.log(payload)
    // const result = await User.findById(payload);
    // console.log(result)
    // const result = await User.aggregate([
    //     { $match: {userId:payload} },
    //     {
    //       $project: {
    //         _id: 0,
    //         password: 0,
    //         __v: 0,
    //         "fullName._id": 0,
    //         "address._id": 0,
    //       },
    //     },
    //   ]);
    // console.log(result)
    //   return result;
    const result = await User.aggregate([
        { $match: { userId: payload } },
        {
          $project: {
            _id: 0,
            password: 0,
            __v: 0,
            "fullName._id": 0,
            "address._id": 0,
          },
        },
      ]);
      return result;
  };

  const updateUserFromIntoDB = async(id:number,payload:TUser) => {
    // console.log(id)
    // // const result = await User.aggregate([
    // //   { $match: { userId: id } }])
    // const result = await User.findById( id)
    //   console.log(result)
      const adat = await User.findOneAndUpdate({ id }, payload, {
        upsert: true,
        setDefaultsOnInsert: true,
      });
      // console.log(adat)
      // const result = await User.aggregate([
      //   { $match: { userId: updatedData.userId } },
      //   {
      //     $project: {
      //       _id: 0,
      //       password: 0,
      //       __v: 0,
      //       "fullName._id": 0,
      //       "address._id": 0,
      //     },
      //   },
      // ]);
      // return result[0];
      return adat;
    
  }
  const deleteUserFromDB = async(id:string) => {
    const result  = await User.deleteOne({id})
    console.log(result)
    return result;
  }



export const UserServices ={
    createUserIntoDB,
    getAllUserFromDB,
    getSingleUserFromDB,
    updateUserFromIntoDB,
    deleteUserFromDB

}