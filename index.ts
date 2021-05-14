import express, { Router } from 'express'
const app = express()
import issuesRouter from './routes/issues'
import cors from 'cors'

require('dotenv')

const PORT = process.env.PORT || 8000
app.use(cors())
app.use('/api/', issuesRouter)





app.get('/', (req,res) => res.send('Express + TypeScript Server Test'));
app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running  at https://localhost:${PORT}`);
});