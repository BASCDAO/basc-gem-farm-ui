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
exports.findRewardsPotPDA = exports.findAuthorizationProofPDA = exports.findFarmTreasuryPDA = exports.findFarmAuthorityPDA = exports.findFarmerPDA = void 0;
const web3_js_1 = require("@solana/web3.js");
const index_1 = require("../index");
const findFarmerPDA = (farm, identity) => __awaiter(void 0, void 0, void 0, function* () {
    return web3_js_1.PublicKey.findProgramAddress([Buffer.from('farmer'), farm.toBytes(), identity.toBytes()], index_1.GEM_FARM_PROG_ID);
});
exports.findFarmerPDA = findFarmerPDA;
const findFarmAuthorityPDA = (farm) => __awaiter(void 0, void 0, void 0, function* () {
    return web3_js_1.PublicKey.findProgramAddress([farm.toBytes()], index_1.GEM_FARM_PROG_ID);
});
exports.findFarmAuthorityPDA = findFarmAuthorityPDA;
const findFarmTreasuryPDA = (farm) => {
    return web3_js_1.PublicKey.findProgramAddress([Buffer.from('treasury'), farm.toBytes()], index_1.GEM_FARM_PROG_ID);
};
exports.findFarmTreasuryPDA = findFarmTreasuryPDA;
const findAuthorizationProofPDA = (farm, funder) => {
    return web3_js_1.PublicKey.findProgramAddress([Buffer.from('authorization'), farm.toBytes(), funder.toBytes()], index_1.GEM_FARM_PROG_ID);
};
exports.findAuthorizationProofPDA = findAuthorizationProofPDA;
const findRewardsPotPDA = (farm, rewardMint) => {
    return web3_js_1.PublicKey.findProgramAddress([Buffer.from('reward_pot'), farm.toBytes(), rewardMint.toBytes()], index_1.GEM_FARM_PROG_ID);
};
exports.findRewardsPotPDA = findRewardsPotPDA;
