import { Router } from "express";
import { UserController } from "./user.controller";



const router = Router();

router.post('/create',UserController.createUser)
router.get('/',UserController.getAllUser)
router.get('/:userId',UserController.getSingleUser)


export const  UserRoutes = router