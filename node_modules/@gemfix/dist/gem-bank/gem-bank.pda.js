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
Object.defineProperty(exports, "__esModule", { value: true });
exports.findRarityPDA = exports.findWhitelistProofPDA = exports.findVaultAuthorityPDA = exports.findGdrPDA = exports.findGemBoxPDA = exports.findVaultPDA = void 0;
const web3_js_1 = require("@solana/web3.js");
const index_1 = require("../index");
const findVaultPDA = (bank, creator) => __awaiter(void 0, void 0, void 0, function* () {
    return web3_js_1.PublicKey.findProgramAddress([Buffer.from('vault'), bank.toBytes(), creator.toBytes()], index_1.GEM_BANK_PROG_ID);
});
exports.findVaultPDA = findVaultPDA;
const findGemBoxPDA = (vault, mint) => __awaiter(void 0, void 0, void 0, function* () {
    return web3_js_1.PublicKey.findProgramAddress([Buffer.from('gem_box'), vault.toBytes(), mint.toBytes()], index_1.GEM_BANK_PROG_ID);
});
exports.findGemBoxPDA = findGemBoxPDA;
const findGdrPDA = (vault, mint) => __awaiter(void 0, void 0, void 0, function* () {
    return web3_js_1.PublicKey.findProgramAddress([Buffer.from('gem_deposit_receipt'), vault.toBytes(), mint.toBytes()], index_1.GEM_BANK_PROG_ID);
});
exports.findGdrPDA = findGdrPDA;
const findVaultAuthorityPDA = (vault) => __awaiter(void 0, void 0, void 0, function* () {
    return web3_js_1.PublicKey.findProgramAddress([vault.toBytes()], index_1.GEM_BANK_PROG_ID);
});
exports.findVaultAuthorityPDA = findVaultAuthorityPDA;
const findWhitelistProofPDA = (bank, whitelistedAddress) => __awaiter(void 0, void 0, void 0, function* () {
    return web3_js_1.PublicKey.findProgramAddress([Buffer.from('whitelist'), bank.toBytes(), whitelistedAddress.toBytes()], index_1.GEM_BANK_PROG_ID);
});
exports.findWhitelistProofPDA = findWhitelistProofPDA;
const findRarityPDA = (bank, mint) => __awaiter(void 0, void 0, void 0, function* () {
    return web3_js_1.PublicKey.findProgramAddress([Buffer.from('gem_rarity'), bank.toBytes(), mint.toBytes()], index_1.GEM_BANK_PROG_ID);
});
exports.findRarityPDA = findRarityPDA;
