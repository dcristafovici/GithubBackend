import Router from 'express'
import { getIssues, getSingleIssue } from '../controller/issues'
const router = Router()


router.get('/issues', getIssues)
router.get('/issue', getSingleIssue)


export = router