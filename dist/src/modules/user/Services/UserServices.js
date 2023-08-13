"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("@/user/Models/user"));
const UserUtils_1 = require("@/user/Utils/UserUtils");
const ts_results_1 = require("ts-results");
const verification_1 = require("@/serviceProvider/services/verification");
const crypto_1 = __importDefault(require("crypto"));
class UserService {
    constructor() {
        this.signup = async (dto) => {
            const isUserAlreadyExist = await user_1.default.exists({ email: dto.email });
            //User is already signed up
            if (isUserAlreadyExist?._id) {
                return (0, ts_results_1.Err)('User already exists');
            }
            // User is not signed up yet, create a new one
            // hash password
            const hashedPassword = await (0, UserUtils_1.hashPassword)(dto.password);
            //change dto's password to hashedPassword
            dto.password = hashedPassword;
            //Presist the new user to the database
            const pin = crypto_1.default.randomBytes(4).toString('hex');
            const newUserCreated = await user_1.default.create({ ...dto, pin });
            //send verification email
            const mail = {
                from: '"test Ghanem" <mghanem@gmail.com>',
                to: dto.email,
                subject: 'Email Verification',
                text: `your verification pin is: ${pin}`,
            };
            await (0, verification_1.sendVerificationMail)(mail);
            //Build the suitable response format
            const userResult = (0, UserUtils_1.buildUserResult)(newUserCreated);
            return (0, ts_results_1.Ok)(userResult);
        };
        this.signin = async (dto) => {
            //Find the user in the database
            const user = await user_1.default.findOne({ email: dto.email }, { __v: false });
            // return Err if the user is not found
            if (user === null) {
                return (0, ts_results_1.Err)('user not found');
            }
            //compare passwords
            const isPasswordsMatch = await (0, UserUtils_1.verifyPassword)(dto.password, user.password);
            //if password don't matche return Err
            if (isPasswordsMatch === false) {
                return (0, ts_results_1.Err)('user not found or password is incorrect');
            }
            //if user's account is not verified then return Err
            if (user.isVerified === false) {
                return (0, ts_results_1.Err)('user is not verified, please verify and try again');
            }
            //Build the suitable response format
            const userResult = (0, UserUtils_1.buildUserResult)(user);
            return (0, ts_results_1.Ok)(userResult);
        };
        this.verify = async (dto) => {
            //Find the user in the database
            const user = await user_1.default.findOne({ email: dto.email, pin: dto.pin }, { pin: true });
            // return Err if the user is not found or pin is wrong
            if (user === null) {
                return (0, ts_results_1.Err)('user not found or pin is wrong');
            }
            await user_1.default.updateOne({ email: dto.email, pin: dto.pin }, { pin: null, isVerified: true });
            return (0, ts_results_1.Ok)('Pin is correct, your account verified successfully');
        };
    }
}
exports.default = UserService;
