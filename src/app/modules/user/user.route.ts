import { Router } from "express";
import { UserController } from "./user.controller";



const router = Router();

router.post('/create',UserController.createUser)
router.get('/',UserController.getAllUser)
router.get('/:userId',UserController.getSingleUser)
router.patch('/:userId',UserController.updateOneUser)
router.delete('/:userId',UserController.deleteUser)


export const  UserRoutes = router