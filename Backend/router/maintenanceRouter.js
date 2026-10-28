import express from "express";

import {createMaintenance,getAllMaintenance,updateMaintenance,deleteMaintenance} from "../controller/maintenanceController.js";

import {isAuthenticated} from "../middleware/authMidleware.js";
import {authorizeRoles} from "../middleware/authorizeRoles.js";

const router = express.Router();

router.post(
    "/create",
    isAuthenticated,
    authorizeRoles("Admin", "Engineer"),
    createMaintenance
);

router.get(
    "/all",
    isAuthenticated,
    authorizeRoles("Admin", "Engineer", "Operator"),
    getAllMaintenance
);

router.put(
    "/:id",
    isAuthenticated,
    authorizeRoles("Admin", "Engineer"),
    updateMaintenance
);

router.delete(
    "/:id",
    isAuthenticated,
    authorizeRoles("Admin"),
    deleteMaintenance
);

export default router;