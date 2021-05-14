import Router from 'express'
import { getIssues } from '../controller/issues'
const router = Router()


router.get('/issues', getIssues)


export = router