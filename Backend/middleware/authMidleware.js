
import jwt from "jsonwebtoken";
import { User } from "../models/userSchema.js";
import ErrorHandler from "./errorMidleware.js";
import { catchAsyncError } from "./catchAsyncError.js";

export const isAuthenticated = catchAsyncError(async (req, res, next) => {

    // 1. Get token from cookie
    const token = req.cookies.token;

    console.log("TOKEN FROM COOKIE:", token);

    if (!token) {
        return next(
            new ErrorHandler(
                "Please login to access this resource",
                401
            )
        );
    }

    // 2. Verify token
    const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET_KEY
    );

    console.log("DECODED TOKEN:", decoded);

    // 3. Find user
    const user = await User.findById(decoded.id);

    console.log("USER FOUND:", user);

    if (!user) {
        return next(
            new ErrorHandler(
                "User not found. Please login again.",
                401
            )
        );
    }

    // 4. Store user in request
    req.user = user;

    next();
});

