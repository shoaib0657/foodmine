"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var data_1 = require("../../src/data");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var express_async_handler_1 = __importDefault(require("express-async-handler"));
var user_model_1 = require("../../src/models/user.model");
var http_status_1 = require("../../src/constants/http_status");
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var auth_mid_1 = __importDefault(require("../../src/middlewares/auth.mid"));
var admin_mid_1 = __importDefault(require("../../src/middlewares/admin.mid"));
var router = (0, express_1.Router)();
// Endpoint to seed sample users into the database
router.get("/seed", (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var usersCount, _i, sample_users_1, user, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, user_model_1.UserModel.countDocuments()];
            case 1:
                usersCount = _b.sent();
                if (usersCount > 0) {
                    res.send("Sample users already seeded");
                    return [2 /*return*/];
                }
                _i = 0, sample_users_1 = data_1.sample_users;
                _b.label = 2;
            case 2:
                if (!(_i < sample_users_1.length)) return [3 /*break*/, 6];
                user = sample_users_1[_i];
                _a = user;
                return [4 /*yield*/, bcryptjs_1.default.hash(user.password, 10)];
            case 3:
                _a.password = _b.sent();
                return [4 /*yield*/, user_model_1.UserModel.create(user)];
            case 4:
                _b.sent();
                _b.label = 5;
            case 5:
                _i++;
                return [3 /*break*/, 2];
            case 6:
                // Send success message
                res.send("Sample users seeded successfully");
                return [2 /*return*/];
        }
    });
}); }));
// Endpoint for user login
router.post("/login", (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, user, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password;
                return [4 /*yield*/, user_model_1.UserModel.findOne({ email: email })];
            case 1:
                user = _c.sent();
                _b = user;
                if (!_b) return [3 /*break*/, 3];
                return [4 /*yield*/, bcryptjs_1.default.compare(password, user.password)];
            case 2:
                _b = (_c.sent());
                _c.label = 3;
            case 3:
                if (_b) {
                    res.send(generateTokenResponse(user));
                }
                else {
                    res.status(http_status_1.HTTP_BAD_REQUEST).send("User name or password is not valid!");
                }
                return [2 /*return*/];
        }
    });
}); }));
// Endpoint for user registration
router.post("/register", (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, email, password, address, user, encryptedPassword, newUser, dbUser;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, name = _a.name, email = _a.email, password = _a.password, address = _a.address;
                return [4 /*yield*/, user_model_1.UserModel.findOne({ email: email })];
            case 1:
                user = _b.sent();
                if (!user) return [3 /*break*/, 2];
                res.status(http_status_1.HTTP_BAD_REQUEST).send("User already exists!, please login!");
                return [3 /*break*/, 5];
            case 2: return [4 /*yield*/, bcryptjs_1.default.hash(password, 10)];
            case 3:
                encryptedPassword = _b.sent();
                newUser = {
                    id: "",
                    name: name,
                    email: email.toLowerCase(),
                    password: encryptedPassword,
                    address: address,
                    isAdmin: false,
                    isBlocked: false,
                };
                return [4 /*yield*/, user_model_1.UserModel.create(newUser)];
            case 4:
                dbUser = _b.sent();
                // Send token response for the newly registered user
                res.send(generateTokenResponse(dbUser));
                _b.label = 5;
            case 5: return [2 /*return*/];
        }
    });
}); }));
// Endpoint to update user profile
router.put("/updateProfile", auth_mid_1.default, (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, address, user;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, name = _a.name, address = _a.address;
                return [4 /*yield*/, user_model_1.UserModel.findByIdAndUpdate(req.user.id, { name: name, address: address }, { new: true })];
            case 1:
                user = _b.sent();
                if (user) {
                    // Send token response if profile update is successful
                    res.send(generateTokenResponse(user));
                }
                else {
                    res.status(http_status_1.HTTP_BAD_REQUEST).send("User not found!");
                }
                return [2 /*return*/];
        }
    });
}); }));
// Endpoint to change user password
router.put("/changePassword", auth_mid_1.default, (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, currentPassword, newPassword, user, equal, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.body, currentPassword = _a.currentPassword, newPassword = _a.newPassword;
                return [4 /*yield*/, user_model_1.UserModel.findById(req.user.id)];
            case 1:
                user = _c.sent();
                if (!user) {
                    res.status(http_status_1.HTTP_BAD_REQUEST).send("User not found!");
                    return [2 /*return*/];
                }
                return [4 /*yield*/, bcryptjs_1.default.compare(currentPassword, user.password)];
            case 2:
                equal = _c.sent();
                if (!!equal) return [3 /*break*/, 3];
                res.status(http_status_1.HTTP_BAD_REQUEST).send("Curent Password Is Not Correct!");
                return [3 /*break*/, 6];
            case 3:
                // Update password and save the user
                _b = user;
                return [4 /*yield*/, bcryptjs_1.default.hash(newPassword, 10)];
            case 4:
                // Update password and save the user
                _b.password = _c.sent();
                return [4 /*yield*/, user.save()];
            case 5:
                _c.sent();
                res.send();
                _c.label = 6;
            case 6: return [2 /*return*/];
        }
    });
}); }));
// Endpoint to get all users (with optional search term)
router.get("/getAll/:searchTerm?", admin_mid_1.default, (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var searchTerm, filter, users;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                searchTerm = req.params.searchTerm;
                filter = searchTerm
                    ? { name: { $regex: new RegExp(searchTerm, "i") } }
                    : {};
                return [4 /*yield*/, user_model_1.UserModel.find(filter, { password: 0 })];
            case 1:
                users = _a.sent();
                res.send(users);
                return [2 /*return*/];
        }
    });
}); }));
// Endpoint to toggle user block status (admin only)
router.put("/toggleBlock/:userId", admin_mid_1.default, (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.params.userId;
                if (userId === req.user.id) {
                    // Send error response if attempting to block oneself
                    res.status(http_status_1.HTTP_BAD_REQUEST).send("You cannot block yourself!");
                    return [2 /*return*/];
                }
                return [4 /*yield*/, user_model_1.UserModel.findById(userId)];
            case 1:
                user = _a.sent();
                user.isBlocked = !user.isBlocked;
                user.save();
                // Send updated block status as the response
                res.send(user.isBlocked);
                return [2 /*return*/];
        }
    });
}); }));
// Endpoint to get a user by ID (admin access required)
router.get("/getById/:userId", admin_mid_1.default, // Middleware to ensure admin access
(0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.params.userId;
                return [4 /*yield*/, user_model_1.UserModel.findById(userId, { password: 0 })];
            case 1:
                user = _a.sent();
                // Check if user is found and send the user data, otherwise send an error response
                if (user) {
                    res.send(user);
                }
                else {
                    res.status(http_status_1.HTTP_BAD_REQUEST).send("User not found!");
                }
                return [2 /*return*/];
        }
    });
}); }));
// Endpoint to update user details (admin access required)
router.put("/update/:userId", admin_mid_1.default, // Middleware to ensure admin access
(0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, name, email, address, isAdmin;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = req.params.userId;
                _a = req.body, name = _a.name, email = _a.email, address = _a.address, isAdmin = _a.isAdmin;
                // Update user details in the database based on the provided ID
                return [4 /*yield*/, user_model_1.UserModel.findByIdAndUpdate(id, {
                        name: name,
                        email: email,
                        address: address,
                        isAdmin: isAdmin,
                    })];
            case 1:
                // Update user details in the database based on the provided ID
                _b.sent();
                res.send();
                return [2 /*return*/];
        }
    });
}); }));
// Function to generate a token response for a user
var generateTokenResponse = function (user) {
    var token = jsonwebtoken_1.default.sign({
        id: user.id,
        email: user.email,
        isAdmin: user.isAdmin,
    }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
    return {
        id: user.id,
        email: user.email,
        name: user.name,
        address: user.address,
        isAdmin: user.isAdmin,
        token: token,
    };
};
exports.default = router;
