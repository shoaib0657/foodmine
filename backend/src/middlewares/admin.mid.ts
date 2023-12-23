import { HTTP_UNAUTHORIZED } from "../constants/http_status";
import authMid from "./auth.mid";

const adminMid = (req: any, res: any, next: any) => {
    
    // Checking if the user in the request is not an admin.
    if(!req.user.isAdmin)
    {
        // If the user is not an admin, send a 401 Unauthorized status and end the response.
        res.status(HTTP_UNAUTHORIZED).send();
    }

    // If the user is an admin, proceed to the next middleware or route handler.
    return next();

};

// Exporting an array containing both the authMid and adminMid middlewares.
// The array represents the order in which these middlewares should be executed.
export default [authMid, adminMid];

// This defines an admin middleware that first runs the auth middleware to authenticate the user.
//It then checks if the user is an admin, and if not, sends a 401 Unauthorized response. 
//If the user is an admin, it calls next() to move on to the next middleware/route handler.

//The middlewares are exported as an array so they will compose in that order 
//- first auth, then admin check. This ensures the user is authenticated before checking if they are an admin.