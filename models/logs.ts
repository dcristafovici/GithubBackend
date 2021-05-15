import mongoose from 'mongoose'

const logsSchema = new mongoose.Schema({
  ip: { type: String },
})

const logs = mongoose.model('Logs', logsSchema)
export default logs