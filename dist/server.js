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
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const passport_1 = __importDefault(require("passport"));
const passport_2 = __importDefault(require("./middlewares/passport"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const private_routes_1 = __importDefault(require("./routes/private.routes"));
class Server {
    constructor(port) {
        this.port = port;
        this.server = express_1.default();
        this.setting();
        this.middlewares();
        this.routes();
    }
    setting() {
        this.server.set('port', process.env.PORT || this.port || 4000);
    }
    middlewares() {
        this.server.use(morgan_1.default('dev'));
        this.server.use(cors_1.default());
        this.server.use(express_1.default.json());
        this.server.use(express_1.default.urlencoded({ extended: true }));
        this.server.use(passport_1.default.initialize());
        passport_1.default.use(passport_2.default);
    }
    routes() {
        this.server.use(auth_routes_1.default);
        this.server.use(private_routes_1.default);
    }
    listen() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.server.listen(this.server.get('port'));
            console.log('server listen on port ' + this.server.get('port'));
        });
    }
}
exports.Server = Server;
