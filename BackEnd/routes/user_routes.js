import express from "express"
import { allUser, login, logout, signup } from "../Controller/user_Controller.js"
import secureRoute from "../Middlewere/secureRoute.js"

const router = express.Router()

router.post("/signup", signup)
router.post("/login",login)
router.post("/logout", logout)
router.get("/allusers",secureRoute ,allUser)




export default router;