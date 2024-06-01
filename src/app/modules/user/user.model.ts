import { Schema, model } from 'mongoose'
import { TAddress, TFullName, TUser } from './user.interface'
import bcrypt from 'bcrypt';
import { config } from '../../config';

const fullNameSchema = new Schema<TFullName>({
  firstName: { type: String, required: [true, 'first name is required'] },
  lastName: { type: String, required: [true, 'last name is required'] },
})

const addressSchema = new Schema<TAddress>({
  street: { type: String, required: [true, 'street is required'] },
  city: { type: String, required: [true, 'city is required'] },
  country: { type: String, required: [true, 'country is required'] },
})

const userSchema = new Schema<TUser>({
  userId: {
    type: Number,
    required: [true, 'userId is required'],
    unique: true,
    index: true,
  },
  username: {
    type: String,
    required: [true, 'username is required'],
    unique: true,
    index: true,
  },
  password: {
    type: String,
    required: [true, 'username is required'],
  },
  fullName: {
    type: fullNameSchema,
    required: true,
  },
  age: {
    type: Number,
    required: [true, 'age is required'],
  },
  email: {
    type: String,
    required: [true, 'email is required'],
  },
  isActive: {
    type: Boolean,
    required: [true, 'active status  is required'],
  },
  hobbies: {
    type: [String],
  },
  address: {
    type: addressSchema,
    required: true,
  },
})

userSchema.pre('save', async function (next) {
    const user = this; // doc
    user.password = await bcrypt.hash(
      user.password,
      Number(config.salt_round),
    );
    next();
  });
  userSchema.post('save', function (doc, next) {
    doc.password = '';
    next();
  });
// userSchema.statics.isUserExsistById = async (userId: number) => {
//   if (await User.exists({ userId })) {
//     return true
//   } else {
//     return false
//   }
// }

const User = model<TUser>('user', userSchema)

export default User;
