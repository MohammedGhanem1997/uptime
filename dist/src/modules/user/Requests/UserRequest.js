"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifySchema = exports.signInSchema = exports.signUpSchema = void 0;
const zod_1 = require("zod");
// Schemas Area
exports.signUpSchema = zod_1.z.object({
    name: zod_1.z
        .string({
        required_error: 'name is required',
        invalid_type_error: 'name must be a string',
    })
        .min(1, { message: 'name can not be empty string' }),
    email: zod_1.z
        .string({
        required_error: 'email is required',
        invalid_type_error: 'email must be a string',
    })
        .email({
        message: 'email is invalid',
    }),
    password: zod_1.z
        .string({
        required_error: 'password is required',
        invalid_type_error: 'password must be a string',
    })
        .min(8, { message: 'password must be 8 characters or more' }),
});
exports.signInSchema = exports.signUpSchema.pick({
    email: true,
    password: true,
});
exports.verifySchema = zod_1.z.object({
    pin: zod_1.z.string({
        required_error: 'pin is required',
        invalid_type_error: 'pin must be a string',
    }),
    email: zod_1.z
        .string({
        required_error: 'email is required',
        invalid_type_error: 'email must be a string',
    })
        .email({
        message: 'email is invalid',
    }),
});
