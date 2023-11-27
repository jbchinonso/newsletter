"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const app = (0, app_1.default)();
const port = process.env.PORT || "5000";
app.set("port", port);
//connect to database
mongoose_1.default
    .connect("mongodb://localhost:27017/newsletter")
    .then(() => { console.log("Database connected Successfully"); }, (err) => { console.error(err); });
app.listen(port, () => console.log("Listening on " + port));
