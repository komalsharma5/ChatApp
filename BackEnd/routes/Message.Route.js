// import express from "express"
// import  {sendMessage}  from "../Controller/message.Controller.js";
// import secureRoute from "../Middlewere/secureRoute.js";

// const router = express.Router()

// router.post("/send/:id", secureRoute , sendMessage)

// export default router;

import express from "express";
import { getMessage, sendMessage } from "../Controller/message.Controller.js";
import secureRoute from "../Middlewere/secureRoute.js";

const router = express.Router();

router.post("/send/:id", secureRoute, sendMessage);
router.get("/get/:id", secureRoute,getMessage);

export default router;
