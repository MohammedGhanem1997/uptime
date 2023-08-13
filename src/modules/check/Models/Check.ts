import { Schema, model } from 'mongoose'

const checkSchema = new Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
  protocol: { type: String,  },
  port: { type: Number, required: false },
  webhook: { type: String, required: false },
  timeout: { type: Number, required: false },
  interval: { type: Number, required: false },
  threshold: { type: Number, required: false },
  email: { type: String, required: false },
  authentication: {
    type: { username: { type: String, required: true }, password: { type: String, required: true } },
    required: false,
  },
  httpHeaders: { type: [String], required: false },
  assert: {
    type: { statusCode: { type: Number, required: true } },
    required: false,
  },
  tags: { type: [String], required: false },
  ignoreSSL: { type: Boolean, required: false },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
})

const Check = model('Check', checkSchema)

export default Check
