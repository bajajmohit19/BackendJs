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
const user_1 = __importDefault(require("../controllers/user"));
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
