import express from "express";

import {  getDashboardStats,getDashboardDetails} from "../controller/dashboardController.js";
import { isAuthenticated} from "../middleware/authMidleware.js";
import { authorizeRoles } from "../middleware/authorizeRoles.js";



const router = express.Router();

router.get(
    "/stats",
    isAuthenticated,
    authorizeRoles("Admin", "Engineer", "Operator"),
    getDashboardStats
);

router.get(
    "/details",
    isAuthenticated,
    authorizeRoles("Admin", "Engineer", "Operator"),
    getDashboardDetails
);

export default router;