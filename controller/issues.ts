import { Request, Response,  NextFunction } from 'express'
import { Octokit } from '@octokit/core'
import ip from 'ip'
import logs from '../models/logs'


const getIssues = async (req: Request, res: Response, next: NextFunction) => {
  try{
    const { user , repository, count, page } = req.query

    const octokit = new Octokit({ auth: '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' })

    const totalCount = await octokit.request(`https://api.github.com/search/issues`,{
      q : `repo:${user}/${repository}+type:issue+state:open`
    })


    const response = await octokit.request(`https://api.github.com/repos/${user}/${repository}/issues`, {
      per_page: count,
      state: "open",
      page: page
    })

    res.status(200).json({
      data: response.data,
      count: totalCount.data.total_count
    })
 

  } catch(e){
    res.status(500).json({err: e.message})
  }
 
}

export { getIssues }