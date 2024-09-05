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
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmailReceipt = void 0;
var mail_config_1 = require("../configs/mail.config");
var user_model_1 = require("../models/user.model");
/**
 * Sends an email receipt for the given order.
 * @param order - The order for which the receipt is being sent.
 */
var sendEmailReceipt = function (order) {
    return __awaiter(this, void 0, void 0, function () {
        var mailClient, user, userEmail;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mailClient = (0, mail_config_1.getClient)();
                    return [4 /*yield*/, user_model_1.UserModel.findById(order.user)];
                case 1:
                    user = _a.sent();
                    if (!user) {
                        console.error("User with id ".concat(order.user, " not found"));
                        return [2 /*return*/];
                    }
                    userEmail = user.email;
                    // console.log(user);
                    mailClient.messages
                        .create(process.env.MAIL_DOMAIN, {
                        from: 'orders@foodmine.com',
                        to: userEmail,
                        // to: 'mdshoaibansari0307@gmail.com',
                        subject: "Order ".concat(order.id, " is being processed"),
                        html: getReceiptHtml(order),
                    })
                        .then(function (msg) { return console.log(msg); }) // logs response data
                        .catch(function (err) { return console.log(err); }); // logs any error
                    return [2 /*return*/];
            }
        });
    });
};
exports.sendEmailReceipt = sendEmailReceipt;
var getReceiptHtml = function (order) {
    return "\n    <html>\n      <head>\n        <style>\n        table {\n          border-collapse: collapse;\n          max-width:35rem;\n          width: 100%;\n        }\n        th, td{\n          text-align: left;\n          padding: 8px;\n        }\n        th{\n          border-bottom: 1px solid #dddddd;\n        }\n        </style>\n      </head>\n      <body>\n        <h1>Order Payment Confirmation</h1>\n        <p>Dear ".concat(order.name, ",</p>\n        <p>Thank you for choosing us! Your order has been successfully paid and is now being processed.</p>\n        <p><strong>Tracking ID:</strong> ").concat(order.id, "</p>\n        <p><strong>Order Date:</strong> ").concat(order.createdAt
        .toISOString()
        .replace('T', ' ')
        .substr(0, 16), "</p>\n          <h2>Order Details</h2>\n          <table>\n          <thead>\n            <tr>\n              <th>Item</th>\n              <th>Unit Price</th>\n              <th>Quantity</th>\n              <th>Total Price</th>\n            </tr>\n          </thead>\n          <tbody>\n          ").concat(order.items
        .map(function (item) {
        return "\n              <tr>\n              <td>".concat(item.food.name, "</td>\n              <td>$").concat(item.food.price, "</td>\n              <td>").concat(item.quantity, "</td>    \n              <td>$").concat(item.price.toFixed(2), "</td>\n              </tr>\n              ");
    })
        .join('\n'), "\n            </tbody>\n            <tfoot>\n            <tr>\n            <td colspan=\"3\"><strong>Total:</strong></td>\n            <td>$").concat(order.totalPrice, "</td>\n            </tr>\n            </tfoot>\n            </table>\n            <p><strong>Shipping Address:</strong> ").concat(order.address, "</p>\n          </body>\n        </html>\n      \n      ");
};
