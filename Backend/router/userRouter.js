import express from "express";
import { isAuthenticated } from "../middleware/authMidleware.js";
import { registerUser, loginUser,  getMyProfile, logoutUser  } from "../controller/userController.js";
import { authorizeRoles } from "../middleware/authorizeRoles.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", isAuthenticated, getMyProfile);
router.get("/admin-test",isAuthenticated,authorizeRoles("Admin"),
    (req, res) => {
        res.status(200).json({
            success: true,
            message: "Welcome Admin"
        });
    }
);
router.get("/logout", logoutUser);



export default router;