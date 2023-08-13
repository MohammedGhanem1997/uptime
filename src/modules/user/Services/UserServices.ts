import {  SignInDTO, VerifyDTO } from '@/user/user.dtos'
import User from '@/user/Models/user'
import { hashPassword, verifyPassword,buildUserResult } from '@/user/Utils/UserUtils'
import { Ok, Err, Result } from 'ts-results'
import { sendVerificationMail } from '@/serviceProvider/services/verification'
import crypto from 'crypto'

export default class UserService  {
  signup = async (dto: any) => {
    const isUserAlreadyExist = await User.exists({ email: dto.email })

    //User is already signed up
    if (isUserAlreadyExist?._id) {
      return Err('User already exists')
    }

    // User is not signed up yet, create a new one

    // hash password
    const hashedPassword = await hashPassword(dto.password)

    //change dto's password to hashedPassword
    dto.password = hashedPassword

    //Presist the new user to the database
    const pin = crypto.randomBytes(4).toString('hex')
    const newUserCreated: any = await User.create({ ...dto, pin })

    //send verification email
    const mail: any = {
      from: '"test Ghanem" <mghanem@gmail.com>',
      to: dto.email,
      subject: 'Email Verification',
      text: `your verification pin is: ${pin}`,
    }

    await sendVerificationMail(mail)

    //Build the suitable response format
    const userResult: any = buildUserResult(newUserCreated)

    return Ok(userResult)
  }

  signin = async (dto: SignInDTO) => {
    //Find the user in the database
    const user:any = await User.findOne({ email: dto.email }, { __v: false })

    // return Err if the user is not found
    if (user === null) {
      return Err('user not found')
    }

    //compare passwords
    const isPasswordsMatch = await verifyPassword(dto.password, user.password)

    //if password don't matche return Err
    if (isPasswordsMatch === false) {
      return Err('user not found or password is incorrect')
    }

    //if user's account is not verified then return Err
    if (user.isVerified === false) {
      return Err('user is not verified, please verify and try again')
    }

    //Build the suitable response format
    const userResult:any = buildUserResult(user)
    return Ok(userResult)
  }

  verify = async (dto: VerifyDTO): Promise<Result<string, string>> => {
    //Find the user in the database
    const user= await User.findOne({ email: dto.email, pin: dto.pin }, { pin: true })

    // return Err if the user is not found or pin is wrong
    if (user === null) {
      return Err('user not found or pin is wrong')
    }

    await User.updateOne({ email: dto.email, pin: dto.pin }, { pin: null, isVerified: true })

    return Ok('Pin is correct, your account verified successfully')
  }
}
