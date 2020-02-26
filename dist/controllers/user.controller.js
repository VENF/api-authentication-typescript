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
const user_1 = __importDefault(require("../models/user"));
const config_1 = __importDefault(require("../config/config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function createToken(user) {
    return jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, config_1.default.key, { expiresIn: 60 * 60 * 24 });
}
exports.signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body.email || !req.body.password) {
            return res.status(400).json({
                msg: 'please send your email and password'
            });
        }
        else {
            const user = yield user_1.default.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({
                    msg: 'this user already exist'
                });
            }
            else {
                const newUser = new user_1.default(req.body);
                yield newUser.save();
                return res.status(201).json({
                    msg: 'User has been created successfully',
                });
            }
        }
    }
    catch (error) {
        res.status(500).json({
            error
        });
    }
});
exports.signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({
            msg: 'please send your email and password'
        });
    }
    else {
        const user = yield user_1.default.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({
                msg: 'user not found'
            });
        }
        else {
            const validatePassword = yield user.comparePassword(req.body.password);
            if (validatePassword) {
                return res.status(200).json({
                    auth: true,
                    token: createToken(user)
                });
            }
            else {
                return res.status(401).json({
                    auth: false,
                    msg: 'password invalid'
                });
            }
        }
    }
});
