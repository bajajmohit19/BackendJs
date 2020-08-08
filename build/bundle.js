/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(__webpack_require__(/*! express */ "express"));
const body_parser_1 = __importDefault(__webpack_require__(/*! body-parser */ "body-parser"));
const path_1 = __importDefault(__webpack_require__(/*! path */ "path"));
const secrets_1 = __webpack_require__(/*! ./utils/secrets */ "./src/utils/secrets.ts");
const cors_1 = __importDefault(__webpack_require__(/*! cors */ "cors"));
const user_1 = __importDefault(__webpack_require__(/*! ./app/routes/user */ "./src/app/routes/user.ts"));
const mongoose_1 = __importDefault(__webpack_require__(/*! mongoose */ "mongoose"));
const yamljs_1 = __importDefault(__webpack_require__(/*! yamljs */ "yamljs"));
const swagger_ui_express_1 = __importDefault(__webpack_require__(/*! swagger-ui-express */ "swagger-ui-express"));
const morgan_1 = __importDefault(__webpack_require__(/*! morgan */ "morgan"));
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
user_1.default(app);
app.use("/", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
exports.default = app;

/* WEBPACK VAR INJECTION */}.call(this, "/"))

/***/ }),

/***/ "./src/app/controllers/user.ts":
/*!*************************************!*\
  !*** ./src/app/controllers/user.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __webpack_require__(/*! ../models/User */ "./src/app/models/User.ts");
const settings_1 = __webpack_require__(/*! ../../config/settings */ "./src/config/settings.ts");
const lodash_1 = __importDefault(__webpack_require__(/*! lodash */ "lodash"));
const moment_1 = __importDefault(__webpack_require__(/*! moment */ "moment"));
let userCtrl = {
    add: (data) => {
        return new Promise((resolve) => __awaiter(void 0, void 0, void 0, function* () {
            const entity = new User_1.User();
            lodash_1.default.each(data, (value, key) => {
                entity[key] = value;
            });
            entity.save((err, doc) => __awaiter(void 0, void 0, void 0, function* () {
                if (err || !doc) {
                    if (err.code === 11000)
                        return resolve(Object.assign(Object.assign({}, settings_1.errorObj), { message: "User Id already exist", data: doc }));
                    console.error(err);
                    return resolve(Object.assign(Object.assign({}, settings_1.errorObj), { message: "Error Saving User Details" }));
                }
                return resolve(Object.assign(Object.assign({}, settings_1.successObj), { message: "User data added successfully", data: doc }));
            }));
        }));
    },
    get: (id, data) => {
        return new Promise((resolve) => __awaiter(void 0, void 0, void 0, function* () {
            if (data.startDate && data.endDate) {
                data.date = { $gte: moment_1.default(data.startDate).toDate(), $lt: moment_1.default(data.endDate).toDate() };
                delete data.startDate;
                delete data.endDate;
            }
            User_1.User.aggregate([
                {
                    $match: Object.assign({ userId: parseInt(id) }, data)
                },
                {
                    "$group": {
                        "_id": '$userId',
                        sumDistance: { $sum: "$distance" }
                    }
                },
                {
                    $project: {
                        _id: '$_id',
                        sumDistance: { '$round': ['$sumDistance', 2] }
                    }
                }
            ]).exec((err, result) => {
                console.log(result);
                return resolve(result[0]);
            });
        }));
    }
};
exports.default = userCtrl;


/***/ }),

/***/ "./src/app/models/User.ts":
/*!********************************!*\
  !*** ./src/app/models/User.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(__webpack_require__(/*! mongoose */ "mongoose"));
const userSchema = new mongoose_1.default.Schema({
    userId: { type: Number, required: true },
    distance: { type: Number, required: true },
    date: { type: Date, default: new Date() }
}, { timestamps: true });
exports.User = mongoose_1.default.model("users", userSchema);


/***/ }),

/***/ "./src/app/routes/user.ts":
/*!********************************!*\
  !*** ./src/app/routes/user.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(__webpack_require__(/*! ../controllers/user */ "./src/app/controllers/user.ts"));
exports.default = (app) => {
    app
        .route("/user")
        .post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { body } = req;
        let resp = yield user_1.default.add(Object.assign({}, body));
        res.json(resp);
    }));
    app
        .route("/user/:id")
        .post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { body, params } = req;
        let resp = yield user_1.default.get(params.id, Object.assign({}, body));
        res.json(resp);
    }));
};


/***/ }),

/***/ "./src/config/settings.ts":
/*!********************************!*\
  !*** ./src/config/settings.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.secret = exports.successObj = exports.errorObj = void 0;
exports.errorObj = { error: true, type: "error", success: false };
exports.successObj = { error: false, type: "success", success: true };
exports.secret = process.env.SECRET_KEY || "asdfasdfasdfasdf";


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errorhandler_1 = __importDefault(__webpack_require__(/*! errorhandler */ "errorhandler"));
const app_1 = __importDefault(__webpack_require__(/*! ./app */ "./src/app.ts"));
var server = __webpack_require__(/*! http */ "http").Server(app_1.default);
server.listen(app_1.default.get("port"), () => {
    console.log(app_1.default.get("port"), " teting");
    console.log("App is running at http://localhost:%d in %s mode", app_1.default.get("port"), app_1.default.get("env"));
    console.log("  Press CTRL-C to stop\n");
});
app_1.default.use(errorhandler_1.default());
exports.default = server;


/***/ }),

/***/ "./src/utils/secrets.ts":
/*!******************************!*\
  !*** ./src/utils/secrets.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MONGODB_URI = exports.ENVIRONMENT = void 0;
const dotenv_1 = __importDefault(__webpack_require__(/*! dotenv */ "dotenv"));
const fs_1 = __importDefault(__webpack_require__(/*! fs */ "fs"));
if (fs_1.default.existsSync(".env")) {
    console.log("Using .env file to supply config environment variables");
    dotenv_1.default.config({ path: ".env" });
}
else if (fs_1.default.existsSync(".env.production")) {
    console.log("Using .env file to supply config environment variables");
    dotenv_1.default.config({ path: ".env.production" });
}
else {
    console.log("Using .env.dev file to supply config environment variables");
    dotenv_1.default.config({ path: ".env.dev" }); // you can delete this after you create your own .env file!
}
exports.ENVIRONMENT = "development";
const prod = exports.ENVIRONMENT === "production"; // Anything else is treated as 'dev'
exports.MONGODB_URI = process.env["MONGODB_URI"];


/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("cors");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("dotenv");

/***/ }),

/***/ "errorhandler":
/*!*******************************!*\
  !*** external "errorhandler" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("errorhandler");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),

/***/ "moment":
/*!*************************!*\
  !*** external "moment" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("moment");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),

/***/ "morgan":
/*!*************************!*\
  !*** external "morgan" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("morgan");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),

/***/ "swagger-ui-express":
/*!*************************************!*\
  !*** external "swagger-ui-express" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("swagger-ui-express");

/***/ }),

/***/ "yamljs":
/*!*************************!*\
  !*** external "yamljs" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("yamljs");

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map