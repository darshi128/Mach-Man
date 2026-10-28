import express from "express";
import { isAuthenticated } from "../middleware/authMidleware.js";
import {addMachine, getAllMachines, getSingleMachine, updateMachine, deleteMachine,assignMachine} from "../controller/maxhineController.js";
import { authorizeRoles } from "../middleware/authorizeRoles.js";

const router = express.Router();

router.post("/add", isAuthenticated,authorizeRoles("Admin"), addMachine);
router.get("/all", isAuthenticated,authorizeRoles("Admin","Engineer","Operator"), getAllMachines);
router.get(
    "/:id",
    isAuthenticated,
    authorizeRoles("Admin", "Engineer", "Operator"),
    getSingleMachine
);
router.put(
    "/:id",
    isAuthenticated,
    authorizeRoles("Admin"),
    updateMachine
);
router.delete(
    "/:id",
    isAuthenticated,
    authorizeRoles("Admin"),
    deleteMachine
);

router.put("/assign/:id", isAuthenticated, authorizeRoles("Admin"),assignMachine);


export default router;