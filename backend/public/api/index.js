"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var food_router_1 = __importDefault(require("./routes/food.router"));
var user_router_1 = __importDefault(require("./routes/user.router"));
var order_router_1 = __importDefault(require("./routes/order.router"));
var upload_router_1 = __importDefault(require("./routes/upload.router"));
var database_config_1 = require("../src/configs/database.config");
(0, database_config_1.dbConnect)();
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    credentials: true,
    origin: ["http://localhost:4200"]
}));
//Implement everything on food.service
app.use("/api/foods", food_router_1.default);
app.use("/api/users", user_router_1.default);
app.use("/api/orders", order_router_1.default);
app.use("/api/upload", upload_router_1.default);
var port = process.env.PORT || 5000;
app.listen(port, function () {
    console.log("Server started at http://localhost:" + port);
});
module.exports = app;
