"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const path_1 = __importDefault(require("path"));
const secrets_1 = require("./utils/secrets");
const cors_1 = __importDefault(require("cors"));
const chatLogs_1 = __importDefault(require("./app/routes/chatLogs"));
const mongoose_1 = __importDefault(require("mongoose"));
const yamljs_1 = __importDefault(require("yamljs"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const morgan_1 = __importDefault(require("morgan"));
const app = express_1.default();
const swaggerDocument = yamljs_1.default.load("./swagger.yaml");
const rejectFolders = [
    "css",
    "bower_components",
    "js",
    "img",
    "fonts",
    "images"
];
// removing static resources from the logger
app.use(morgan_1.default(":method :url :status :res[content-length] - :response-time ms", {
    skip: req => rejectFolders.indexOf(req.url.split("/")[1]) !== -1
}));
mongoose_1.default.connect(secrets_1.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('MongoDB Connected');
}).catch(err => {
    console.warn("MongoDB connection error. Please make sure MongoDB is running. " + err);
    // process.exit();
});
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(cors_1.default({
    preflightContinue: true
}));
app.set("port", process.env.PORT);
app.use(express_1.default.static(path_1.default.join(__dirname, "../public"), { maxAge: 31557600000 }));
mongoose_1.default.set('debug', true);
chatLogs_1.default(app);
app.use("/", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
exports.default = app;
