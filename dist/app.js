"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./routes/index"));
const members_routes_1 = __importDefault(require("./routes/members.routes"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function default_1() {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: false }));
    app.use("/", index_1.default);
    app.use("/api/v1/members", members_routes_1.default);
    process.on("unhandledRejection", function (reason, p) {
        console.log("Unhandled", reason, p); // log all your errors, "unsuppressing" them.
        throw reason; // optional, in case you want to treat these as errors
    });
    //404 catcher
    app.all("*", (req, res, next) => {
        const msg = `Can't find ${req.originalUrl} on this server!`;
        console.error(msg);
        res.status(404).send({ status: res.statusCode, message: msg, data: null });
        // next()
    });
    //Gobal error
    app.use((err, _req, res, _next) => {
        console.error(err.stack);
        res.status(err.statusCode || 400).send({
            message: err.message,
            status: err.statusCode || 400,
            data: null,
        });
    });
    return app;
}
exports.default = default_1;
