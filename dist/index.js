"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errorhandler_1 = __importDefault(require("errorhandler"));
const app_1 = __importDefault(require("./app"));
var server = require('http').Server(app_1.default);
server.listen(app_1.default.get("port"), () => {
    console.log(app_1.default.get("port"), " teting");
    console.log("App is running at http://localhost:%d in %s mode", app_1.default.get("port"), app_1.default.get("env"));
    console.log("  Press CTRL-C to stop\n");
});
app_1.default.use(errorhandler_1.default());
exports.default = server;
