import {Machine} from "../models/machineSchema.js";
import {Maintenance} from "../models/maintenanceSchema.js";
import {User} from "../models/userSchema.js";
import {catchAsyncError} from "../middleware/catchAsyncError.js";

export const createMaintenance = catchAsyncError(async (req, res, next) => {
    const {machine, engineer, issue, description, priority } = req.body;

    if(!machine || !engineer || !issue){
        return res.status(400).json({
            success:false,
            message:"Please provide all required fields"
        })
    }

    const machineExists = await Machine.findById(machine);

    if(!machineExists){
        return res.status(404).json({
            success:false,
            message:"Machine not found"
        })
    }

    const engineerExists = await User.findById(engineer);

    if(!engineerExists){
        return res.status(404).json({
            success:false,
            message:"Engineer not found"
        })
    }

    if(engineerExists.role !== "Engineer"){
        return res.status(400).json({
            success:false,
            message:" Selected user is not an engineer"
        })
    }

    const maintenance = await Maintenance.create({
        machine,
        engineer,
        issue,
        description,
        priority
    })

    res.status(201).json({
        success:true,
        message:"Maintenance record created successfully",
        data:maintenance
    })
})

export const getAllMaintenance = catchAsyncError(
    async (req, res, next) => {

        const { status, priority } = req.query;

        const filter = {};

        if (status) {
            filter.status = status;
        }

        if (priority) {
            filter.priority = priority;
        }

        const maintenanceRecords = await Maintenance.find(filter)
            .populate(
                "machine",
                "machineId machineName type department location status"
            )
            .populate(
                "engineer",
                "name email role"
            )
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: maintenanceRecords.length,
            maintenanceRecords
        });
    }
);


export const updateMaintenance = catchAsyncError(
    async (req, res, next) => {

        const maintenance = await Maintenance.findById(req.params.id);

        if (!maintenance) {
            return res.status(404).json({
                success: false,
                message: "Maintenance record not found"
            });
        }

        const {
            status,
            priority,
            description,
            resolution
        } = req.body;

        if (status) {
            maintenance.status = status;
        }

        if (priority) {
            maintenance.priority = priority;
        }

        if (description) {
            maintenance.description = description;
        }

        if (resolution) {
            maintenance.resolution = resolution;
        }

        if (status === "Completed") {
            maintenance.completedDate = new Date();
        }

        await maintenance.save();

        const updatedMaintenance = await Maintenance.findById(
            maintenance._id
        )
            .populate(
                "machine",
                "machineId machineName type department location status"
            )
            .populate(
                "engineer",
                "name email role"
            );

        res.status(200).json({
            success: true,
            message: "Maintenance record updated successfully",
            maintenance: updatedMaintenance
        });
    }
);

export const deleteMaintenance = catchAsyncError(
    async (req, res, next) => {

        const maintenance = await Maintenance.findById(req.params.id);

        if (!maintenance) {
            return res.status(404).json({
                success: false,
                message: "Maintenance record not found"
            });
        }

        await maintenance.deleteOne();

        res.status(200).json({
            success: true,
            message: "Maintenance record deleted successfully"
        });
    }
);