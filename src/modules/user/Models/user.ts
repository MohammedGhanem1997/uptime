import { Schema, model } from 'mongoose'

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  pin: { type: String, required: false },
  isVerified: { type: Boolean, required: false, default: false },
})

const User = model('User', userSchema)

export default User
