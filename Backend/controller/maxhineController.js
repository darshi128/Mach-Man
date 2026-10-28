import {Machine} from '../models/machineSchema.js';
import { User } from '../models/userSchema.js';
import ErrorHandler from "../middleware/errorMidleware.js";
import {catchAsyncError} from '../middleware/catchAsyncError.js';
import { generateToken } from '../utils/generateToken.js';

export const addMachine = catchAsyncError(async (req, res, next) => {
    const {
    machineId,
    machineName,
    machineType,
    department,
    location,
    status,
    assignedEngineer,
    assignedOperator,
    lastMaintenanceDate,
    nextMaintenanceDate,
    purchaseDate,
    description
    } = req.body;

    if (
  !machineId ||
  !machineName ||
  !machineType ||
  !department ||
  !location
) {
  return res.status(400).json({
    success: false,
    message: "Please enter all required fields",
  });
}

    const existingMachine = await Machine.findOne({ machineId });
    if(existingMachine) {
        return next(new ErrorHandler("Machine with this ID already exists", 400));
    }

     const machine = await Machine.create({
    machineId,
    machineName,
    machineType,
    department,
    location,
    status,
    assignedEngineer,
    assignedOperator,
    purchaseDate,
    description,
  });

   res.status(201).json({
  success: true,
  message: "Machine added successfully",
  machine,
})
})

export const getAllMachines = catchAsyncError(async(req,res,next) =>{
    const machines = await Machine.find()
    .populate("assignedEngineer", "name email")
    .populate("assignedOperator", "name email");

    res.status(200).json({
        success: true,
        count: machines.length,
        machines
    });
})

export const getSingleMachine = catchAsyncError(
    async (req, res, next) => {
        const machine = await Machine.findOne({
            machineId: req.params.id
        }).populate("assignedEngineer", "name email");

        if (!machine) {
            return res.status(404).json({
                success: false,
                message: "Machine not found"
            });
        }

        res.status(200).json({
            success: true,
            machine
        });
    }
);

export const updateMachine = catchAsyncError(async (req,res,next)=>{
  const machine = await Machine.findOne({machineId: req.params.id});
  if(!machine){
    return res.status(404).json({
      success: false,
      message: "Machine not found"
    });
  }
  const {
        machineName,
        machineType,
        department,
        location,
        status,
        assignedEngineer,
        assignedOperator,
        lastMaintenanceDate,
        nextMaintenanceDate,
        description
    } = req.body;

  machine.machineName = machineName || machine.machineName;
  machine.machineType = machineType || machine.machineType;
  machine.department = department || machine.department;
  machine.location = location || machine.location;
  machine.status = status || machine.status;
  machine.assignedEngineer = assignedEngineer || machine.assignedEngineer;
  machine.assignedOperator = assignedOperator || machine.assignedOperator;
  machine.lastMaintenanceDate = lastMaintenanceDate || machine.lastMaintenanceDate;
  machine.nextMaintenanceDate = nextMaintenanceDate || machine.nextMaintenanceDate;
  machine.description = description || machine.description;

  await machine.save();

   res.status(200).json({
  success: true,
  message: "Machine updated successfully",
  machine,
});
})

export const deleteMachine= catchAsyncError(async (req,res,next)=>{
  const machine = await Machine.findOne({machineId: req.params.id});
  if(!machine){
    return res.status(404).json({
      success: false,
      message: "Machine not found"
    });
  }
 await machine.deleteOne();
 res.status(200).json({
  success: true,
  message: "Machine deleted successfully",
});
})


export const assignMachine = catchAsyncError(async (req, res, next) => {

    const { assignedEngineer, assignedOperator } = req.body;

    const machine = await Machine.findOne({
        machineId: req.params.id
    });

    if (!machine) {
        return res.status(404).json({
            success: false,
            message: "Machine not found"
        });
    }

    // Check Engineer
    if (assignedEngineer) {

        const engineer = await User.findById(assignedEngineer);

        if (!engineer) {
            return res.status(404).json({
                success: false,
                message: "Engineer not found"
            });
        }

        if (engineer.role !== "Engineer") {
            return res.status(400).json({
                success: false,
                message: "Selected user is not an Engineer"
            });
        }

        machine.assignedEngineer = assignedEngineer;
    }

    // Check Operator
    if (assignedOperator) {

        const operator = await User.findById(assignedOperator);

        if (!operator) {
            return res.status(404).json({
                success: false,
                message: "Operator not found"
            });
        }

        if (operator.role !== "Operator") {
            return res.status(400).json({
                success: false,
                message: "Selected user is not an Operator"
            });
        }

        machine.assignedOperator = assignedOperator;
    }

    await machine.save();

    const updatedMachine = await Machine.findOne({
        machineId: req.params.id
    })
        .populate("assignedEngineer", "name email role")
        .populate("assignedOperator", "name email role");

    res.status(200).json({
        success: true,
        message: "Machine assigned successfully",
        machine: updatedMachine
    });
});

