"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClient = void 0;
/**
 * Returns a Mailgun client for sending emails.
 * @returns {Mailgun.Client} The Mailgun client instance.
 */
var form_data_1 = __importDefault(require("form-data"));
var mailgun_js_1 = __importDefault(require("mailgun.js"));
function getClient() {
    var mailgun = new mailgun_js_1.default(form_data_1.default);
    var client = mailgun.client({
        username: "api",
        key: process.env.MAILGUN_API_KEY || "",
    });
    return client;
}
exports.getClient = getClient;
