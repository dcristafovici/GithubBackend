import { Request, Response,  NextFunction } from 'express'
import fetch from 'node-fetch'

const getIssues = async (req: Request, res: Response, next: NextFunction) => {
  try{
    const { user , repository} = req.query
    console.log(req.query)
    const response = await fetch(`https://api.github.com/repos/${user}/${repository}/issues`)
    const data = await response.json()
    if(!data.message)
      res.status(200).json(data)
    else
      res.status(404).json({message: data.message})

  } catch(e){
    res.status(500).json({err: e.message})
  }
 
}

export { getIssues }