"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BACKEND_PORT = 4002;
exports.BACKEND_URL = `http://localhost:${exports.BACKEND_PORT}`;
exports.FRONTEND_URLS = [
    'http://localhost:3000',
    'http://localhost:3001'
];
exports.BUCKET_URL = `${exports.BACKEND_URL}/public`;
exports.DB_NAME = 'forrest';
exports.BCRYPT_SALT = 12;
exports.EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
exports.USERNAME_REGEX = /^(?=.{3,25}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;
exports.PROJECT_NAME = 'Forrest';
//# sourceMappingURL=constants.js.map