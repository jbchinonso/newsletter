"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const subscriberSchema = new mongoose_1.Schema({
    firstName: { type: String, trim: true },
    lastName: String,
    email: {
        type: String,
        trim: true,
        lowercase: true,
    },
    verified: {
        type: Boolean,
        default: false,
    },
    verificationToken: {
        type: String,
        default: null,
    },
    verificationDate: {
        type: Date,
        default: null,
    },
    unsubscribed: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });
subscriberSchema.index({ email: 1 }, { unique: true });
const Subscriber = (0, mongoose_1.model)("Subscriber", subscriberSchema);
exports.default = Subscriber;
