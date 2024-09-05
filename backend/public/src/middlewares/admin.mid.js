"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_status_1 = require("../constants/http_status");
var auth_mid_1 = __importDefault(require("./auth.mid"));
var adminMid = function (req, res, next) {
    // Checking if the user in the request is not an admin.
    if (!req.user.isAdmin) {
        // If the user is not an admin, send a 401 Unauthorized status and end the response.
        res.status(http_status_1.HTTP_UNAUTHORIZED).send();
    }
    // If the user is an admin, proceed to the next middleware or route handler.
    return next();
};
// Exporting an array containing both the authMid and adminMid middlewares.
// The array represents the order in which these middlewares should be executed.
exports.default = [auth_mid_1.default, adminMid];
// This defines an admin middleware that first runs the auth middleware to authenticate the user.
//It then checks if the user is an admin, and if not, sends a 401 Unauthorized response. 
//If the user is an admin, it calls next() to move on to the next middleware/route handler.
//The middlewares are exported as an array so they will compose in that order 
//- first auth, then admin check. This ensures the user is authenticated before checking if they are an admin.
