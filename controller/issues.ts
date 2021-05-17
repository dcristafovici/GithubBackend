import { Request, Response,  NextFunction } from 'express'
import { Octokit } from '@octokit/core'
import logs from '../models/logs'

const octokit = new Octokit({ auth: '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' })

const getIssues = async (req: Request, res: Response) => {
  const newLogs = new logs({
    ip: '195.22.251.48',
    logsType: "search_issues"
  })

  await newLogs.save()
  try{
    const { user , repository, count, page } = req.query


    const totalCount = await octokit.request(`https://api.github.com/search/issues`,{
      q : `repo:${user}/${repository}+type:issue+state:open`
    })

  

    const response = await octokit.request(`https://api.github.com/repos/${user}/${repository}/issues`, {
      per_page: count,
      state: "open",
      page: page
    })

    const newLogsGets = new logs({
      ip: "195.22.251.48",
      logsType: "get_issues"
    })

    await newLogsGets.save()

    res.status(200).json({
      data: response.data,
      count: totalCount.data.total_count
    })
 

  } catch(e){
    res.status(500).json({err: e.message})
  }
 
}


const getSingleIssue = async(req: Request, res: Response) => {
  try{
    const { user , repository, number } = req.query
    
    const response = await octokit.request(`https://api.github.com/repos/${user}/${repository}/issues/${number}`)

    const newLogGetIssue = new logs({
      ip: "195.22.251.48",
      logsType: "get_issue"
    })
    await newLogGetIssue.save()
    res.status(200).json(response.data)
 

  } catch(e){
    res.status(500).json({err: e.message})
  }
}

export { getIssues, getSingleIssue }