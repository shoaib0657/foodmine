import { verify } from "jsonwebtoken";
import { HTTP_UNAUTHORIZED } from "../constants/http_status";

export default (req: any, res: any, next: any) => {
    
    // Extracting the access token from the request headers
    const token = req.headers.access_token as string;

    // If no token, return 401 Unauthorized
    if (!token) {
        return res.status(HTTP_UNAUTHORIZED).send();
    }

    try {
        // Verifying the token using the JWT_SECRET
        const decodedUser = verify(token, process.env.JWT_SECRET!);

        // If verification is successful, attaching the decoded user information to the request object
        req.user = decodedUser;

    } catch (error) {
        // If an error occurs during token verification, respond with 401 Unauthorized
        res.status(HTTP_UNAUTHORIZED).send();
    }

    // Continue to the next middleware or route handler
    return next();
}