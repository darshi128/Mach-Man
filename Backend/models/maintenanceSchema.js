import mongoose from "mongoose";

const maintenanceSchema = new mongoose.Schema(
    {
        machine: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Machine",
            required: true
        },

        engineer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        issue: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            trim: true
        },

        priority: {
            type: String,
            enum: ["Low", "Medium", "High", "Critical"],
            default: "Medium"
        },

        status: {
            type: String,
            enum: ["Pending", "In Progress", "Completed"],
            default: "Pending"
        },

        maintenanceDate: {
            type: Date,
            default: Date.now
        },

        completedDate: {
            type: Date
        },

        resolution: {
            type: String,
            trim: true
        }
    },
    {
        timestamps: true
    }
);

export const Maintenance = mongoose.model(
    "Maintenance",
    maintenanceSchema
);