import express, {Request, Response, NextFunction} from 'express';
import MemberController from '../controllers/members.controllers';
const router = express.Router();


router.post('/join', MemberController.join)




export default router