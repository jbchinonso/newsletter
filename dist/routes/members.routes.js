"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const members_controllers_1 = __importDefault(require("../controllers/members.controllers"));
const router = express_1.default.Router();
router.post('/join', members_controllers_1.default.join);
exports.default = router;
