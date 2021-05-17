import mongoose from 'mongoose'


enum LogsType {
  GetIssues = "get_issues",
  GetSingleIssue = "get_issue",
  SearchIssues = 'search_issues'
}

const logsSchema = new mongoose.Schema({
  ip: { type: String },
  logsType: {
    type: String,
    enum: Object.values(LogsType)
  }
}, { timestamps: { createdAt: 'created_at' }})

const logs = mongoose.model('Logs', logsSchema)
export default logs