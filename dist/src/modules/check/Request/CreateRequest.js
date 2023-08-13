"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCheckSchema = void 0;
const zod_1 = require("zod");
// Schemas Area
exports.createCheckSchema = zod_1.z.object({
    name: zod_1.z
        .string({
        required_error: 'name is required',
        invalid_type_error: 'name must be a string',
    })
        .min(1, { message: 'name can not be empty string' }),
    url: zod_1.z.string({
        required_error: 'url is required',
        invalid_type_error: 'url must be a string',
    }),
    protocol: zod_1.z.enum(['HTTP', 'HTTPS', 'TCP']).optional(),
    path: zod_1.z
        .string({
        invalid_type_error: 'path must be a string',
    })
        .default('/'),
    port: zod_1.z
        .number({
        invalid_type_error: 'port must be a number',
    })
        .positive('port must be positive')
        .optional(),
    email: zod_1.z
        .string({
        invalid_type_error: 'email must be a string',
    })
        .email({
        message: 'email is invalid',
    })
        .optional(),
    webhook: zod_1.z
        .string({
        invalid_type_error: 'webhook must be a string',
    })
        .optional(),
    timeout: zod_1.z
        .number({
        invalid_type_error: 'timeout must be a number',
    })
        .positive('timeout must be positive')
        .default(5)
        .transform((val) => {
        return val * 1000;
    }),
    interval: zod_1.z
        .number({
        invalid_type_error: 'interval must be a number',
    })
        .positive('interval must be positive')
        .default(10)
        .transform((val) => {
        return val * 60 * 1000;
    }),
    threshold: zod_1.z
        .number({
        invalid_type_error: 'threshold must be a number',
    })
        .positive('interval must be positive')
        .default(1),
    authentication: zod_1.z
        .object({
        username: zod_1.z.string({
            invalid_type_error: 'username must be a string',
        }),
        password: zod_1.z.string({
            invalid_type_error: 'password must be a string',
        }),
    })
        .optional(),
    tags: zod_1.z.array(zod_1.z.string()).optional(),
    httpHeaders: zod_1.z
        .array(zod_1.z.object({
        key: zod_1.z.string(),
        value: zod_1.z.string(),
    }))
        .default([])
        .optional(),
    assert: zod_1.z
        .object({
        statusCode: zod_1.z
            .number({
            invalid_type_error: 'interval must be a number',
        })
            .positive('interval must be positive'),
    })
        .optional(),
    ignoreSSL: zod_1.z
        .boolean({
        invalid_type_error: 'interval must be boolean',
    })
        .optional(),
});
