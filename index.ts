require("dotenv").config()
import express, { Router } from 'express'
const app = express()
import mongoose from 'mongoose'
import issuesRouter from './routes/issues'
import cors from 'cors'

const PORT = process.env.PORT || 8000
const mongoBase = process.env.MONGODB || ''
app.use(cors())
app.use('/api/', issuesRouter)



app.get('/', (req,res) => res.send('Express + TypeScript Server Test'));


const start = async() => {
  try{
    await mongoose.connect(mongoBase, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    })
    app.listen(PORT, () => console.log(`App has been started on port ${PORT}`))

  } catch (err){
    console.log(err.message)
  }
}
start()
