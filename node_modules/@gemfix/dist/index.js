"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GEM_FARM_PROG_ID = exports.GEM_BANK_PROG_ID = void 0;
const web3_js_1 = require("@solana/web3.js");
__exportStar(require("./gem-bank"), exports);
__exportStar(require("./gem-farm"), exports);
__exportStar(require("./gem-common"), exports);
exports.GEM_BANK_PROG_ID = new web3_js_1.PublicKey('bankHHdqMuaaST4qQk6mkzxGeKPHWmqdgor6Gs8r88m');
exports.GEM_FARM_PROG_ID = new web3_js_1.PublicKey('farmL4xeBFVXJqtfxCzU9b28QACM7E2W2ctT6epAjvE');
