import mongoose from 'mongoose';

const machineSchema = new mongoose.Schema({
    machineId: {
        type: String,
        required: true,
        unique: true, 
        trim: true
    },
    machineName: {
        type: String,
        required: true,
        trim: true
    },
    machineType: {
        type: String,
        required: true,
        trim: true
    },
    department: {
        type: String,
        required: true,
        trim: true
    },
    location:{
        type: String,
        required: true,
        trim: true
    },
    status:{
        type: String,
        enum: ["Operational", "Under Maintenance", "Breakdown", "Inactive"],
        default: "Operational",
    },
    assignedEngineer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    assignedOperator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
    },
    purchaseDate: {
      type: Date,
      default: null,
    },
    lastMaintenanceDate: {
      type: Date,
      default: null,
    },
    nextMaintenanceDate: {
      type: Date,
      default: null,
    },
    description: {
      type: String,
      trim: true,
    },
    
},
 {
    timestamps: true,
  }
);

export const Machine = mongoose.model("Machine", machineSchema);