import { Schema, model } from 'mongoose'

const reportSchema = new Schema({
  status: { type: String, required: true },
  availability: { type: Number, required: true },
  ups: { type: Number, required: false },
  outages: { type: Number, required: true },
  downtime: { type: Number, required: true },
  uptime: { type: Number, required: true },
  averageResponseTime: { type: Number, required: true },
  history: { type: [], required: true },
  timestamp: { type: Number, required: true },
  forCheck: { type: Schema.Types.ObjectId, ref: 'Check' },
})

const Report = model('Report', reportSchema)

export default Report
