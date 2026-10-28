import { Machine } from "../models/machineSchema.js";
import { Maintenance } from "../models/maintenanceSchema.js";
import { catchAsyncError } from "../middleware/catchAsyncError.js";

export const getDashboardStats = catchAsyncError(
    async (req, res, next) => {

        const totalMachines = await Machine.countDocuments();

        const operationalMachines = await Machine.countDocuments({
            status: "Operational"
        });

        const maintenanceMachines = await Machine.countDocuments({
            status: "Under Maintenance"
        });

        const breakdownMachines = await Machine.countDocuments({
            status: "Breakdown"
        });

        const inactiveMachines = await Machine.countDocuments({
            status: "Inactive"
        });

        const totalMaintenance = await Maintenance.countDocuments();

        const pendingMaintenance = await Maintenance.countDocuments({
            status: "Pending"
        });

        const inProgressMaintenance = await Maintenance.countDocuments({
            status: "In Progress"
        });

        const completedMaintenance = await Maintenance.countDocuments({
            status: "Completed"
        });

        const highPriorityMaintenance = await Maintenance.countDocuments({
            priority: "High"
        });

        const criticalMaintenance = await Maintenance.countDocuments({
            priority: "Critical"
        });

        res.status(200).json({
            success: true,

            statistics: {
                machines: {
                    total: totalMachines,
                    operational: operationalMachines,
                    underMaintenance: maintenanceMachines,
                    breakdown: breakdownMachines,
                    inactive: inactiveMachines
                },

                maintenance: {
                    total: totalMaintenance,
                    pending: pendingMaintenance,
                    inProgress: inProgressMaintenance,
                    completed: completedMaintenance,
                    highPriority: highPriorityMaintenance,
                    critical: criticalMaintenance
                }
            }
        });
    }
);

export const getDashboardDetails = catchAsyncError(
    async (req, res, next) => {

        const machinesNeedingAttention = await Machine.find({
            status: {
                $in: ["Under Maintenance", "Breakdown"]
            }
        })
            .populate("assignedEngineer", "name email")
            .populate("assignedOperator", "name email")
            .select(
                "machineId machineName type department location status assignedEngineer assignedOperator"
            );

        const recentMaintenance = await Maintenance.find()
            .populate(
                "machine",
                "machineId machineName type department location status"
            )
            .populate(
                "engineer",
                "name email role"
            )
            .sort({ createdAt: -1 })
            .limit(5);

        res.status(200).json({
            success: true,

            machinesNeedingAttention,

            recentMaintenance
        });
    }
);

