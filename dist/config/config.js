"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    key: process.env.JWT_KEY || '23%&$/(&&$24ffg446',
    DB: {
        URI: process.env.URI || 'mongodb://localhost/apits',
        USER: process.env.USER,
        PASSWORD: process.env.PASSWORD
    }
};
