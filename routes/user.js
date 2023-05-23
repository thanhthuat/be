import express from 'express';
import { getDetaiUser, loginUser, registerUser } from '../controllers/index.js';

const router = express.Router() ;
router.get('/',(req,res)=>{

})
router.get('/:id',getDetaiUser)
router.post('/login',loginUser)
router.post('/register',registerUser) ;

export default router


