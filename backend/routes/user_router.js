import express from "express";
import {
  NewUser,
  Login,
  Logout,
  profile,
  Update_Usr,
  DeleteUser,
} from "../controller/user_controller.js";
import { auth } from "../middleware/auth.js";
import { CheckPrimeStatus, upgrade_User } from "../controller/subscription.js";
const router = express.Router();

// new user
router.post("/new", NewUser);
// login
router.post("/login", Login);
// logout
router.get("/logout", auth, Logout);
// profile
router.get("/profile", auth, profile);
//  user data update
router.post("/profile/update", auth, Update_Usr);
// del profile and user data by (id)
router.delete("/del/all/:id", auth, DeleteUser);

// upgrade

router.post("/upgrade", auth, upgrade_User);

// check prime status
router.get("/prime/status", auth, CheckPrimeStatus);

export default router;
