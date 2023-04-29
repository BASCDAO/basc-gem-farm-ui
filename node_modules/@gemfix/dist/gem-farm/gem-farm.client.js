"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.GemFarmClient = exports.RewardType = exports.feeAccount = void 0;
const anchor = __importStar(require("@project-serum/anchor"));
const anchor_1 = require("@project-serum/anchor");
const web3_js_1 = require("@solana/web3.js");
const gem_common_1 = require("../gem-common");
const gem_bank_1 = require("../gem-bank");
const spl_token_1 = require("@solana/spl-token");
const gem_farm_pda_1 = require("./gem-farm.pda");
const generated_1 = require("@metaplex-foundation/mpl-token-auth-rules/dist/src/generated");
const generated_2 = require("@metaplex-foundation/mpl-token-metadata/dist/src/generated");
exports.feeAccount = new web3_js_1.PublicKey('2xhBxVVuXkdq2MRKerE9mr2s1szfHSedy21MVqf8gPoM');
//acts as an enum
exports.RewardType = {
    Variable: { variable: {} },
    Fixed: { fixed: {} },
};
class GemFarmClient extends gem_bank_1.GemBankClient {
    constructor(conn, wallet, farmIdl, farmProgramId, bankIdl, bankProgramId) {
        super(conn, wallet, bankIdl, bankProgramId);
        this.setFarmProgram(farmIdl, farmProgramId);
    }
    setFarmProgram(idl, programId) {
        //instantiating program depends on the environment
        if (idl && programId) {
            //means running in prod
            this.farmProgram = new anchor.Program(idl, programId, this.provider);
        }
        else {
            //means running inside test suite
            this.farmProgram = anchor.workspace.GemFarm;
        }
    }
    // --------------------------------------- fetch deserialized accounts
    fetchFarmAcc(farm) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.farmProgram.account.farm.fetch(farm);
        });
    }
    fetchFarmerAcc(farmer) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.farmProgram.account.farmer.fetch(farmer);
        });
    }
    fetchAuthorizationProofAcc(authorizationProof) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.farmProgram.account.authorizationProof.fetch(authorizationProof);
        });
    }
    fetchTokenAcc(rewardMint, rewardAcc) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.deserializeTokenAccount(rewardMint, rewardAcc);
        });
    }
    fetchTreasuryBalance(farm) {
        return __awaiter(this, void 0, void 0, function* () {
            const [treasury] = yield (0, gem_farm_pda_1.findFarmTreasuryPDA)(farm);
            return this.getBalance(treasury);
        });
    }
    // --------------------------------------- get all PDAs by type
    //https://project-serum.github.io/anchor/ts/classes/accountclient.html#all
    fetchAllFarmPDAs(manager) {
        return __awaiter(this, void 0, void 0, function* () {
            const filter = manager
                ? [
                    {
                        memcmp: {
                            offset: 10,
                            bytes: manager.toBase58(),
                        },
                    },
                ]
                : [];
            const pdas = yield this.farmProgram.account.farm.all(filter);
            console.log(`found a total of ${pdas.length} farm PDAs`);
            return pdas;
        });
    }
    fetchAllFarmerPDAs(farm, identity) {
        return __awaiter(this, void 0, void 0, function* () {
            const filter = [];
            if (farm) {
                filter.push({
                    memcmp: {
                        offset: 8,
                        bytes: farm.toBase58(),
                    },
                });
            }
            if (identity) {
                filter.push({
                    memcmp: {
                        offset: 40,
                        bytes: identity.toBase58(),
                    },
                });
            }
            const pdas = yield this.farmProgram.account.farmer.all(filter);
            console.log(`found a total of ${pdas.length} farmer PDAs`);
            return pdas;
        });
    }
    fetchAllAuthProofPDAs(farm, funder) {
        return __awaiter(this, void 0, void 0, function* () {
            const filter = [];
            if (farm) {
                filter.push({
                    memcmp: {
                        offset: 40,
                        bytes: farm.toBase58(),
                    },
                });
            }
            if (funder) {
                filter.push({
                    memcmp: {
                        offset: 8,
                        bytes: funder.toBase58(),
                    },
                });
            }
            const pdas = yield this.farmProgram.account.authorizationProof.all(filter);
            console.log(`found a total of ${pdas.length} authorized funders`);
            return pdas;
        });
    }
    // --------------------------------------- core ixs
    initFarm(farm, farmManager, payer, bank, rewardAMint, rewardAType, //RewardType instance
    rewardBMint, rewardBType, //RewardType instance
    farmConfig, maxCounts) {
        return __awaiter(this, void 0, void 0, function* () {
            const [farmAuth, farmAuthBump] = yield (0, gem_farm_pda_1.findFarmAuthorityPDA)(farm.publicKey);
            const [farmTreasury, farmTreasuryBump] = yield (0, gem_farm_pda_1.findFarmTreasuryPDA)(farm.publicKey);
            const [rewardAPot, rewardAPotBump] = yield (0, gem_farm_pda_1.findRewardsPotPDA)(farm.publicKey, rewardAMint);
            const [rewardBPot, rewardBPotBump] = yield (0, gem_farm_pda_1.findRewardsPotPDA)(farm.publicKey, rewardBMint);
            const signers = [farm, bank];
            if ((0, gem_common_1.isKp)(farmManager))
                signers.push(farmManager);
            console.log('starting farm at', farm.publicKey.toBase58());
            const txSig = yield this.farmProgram.methods
                .initFarm(farmAuthBump, farmTreasuryBump, rewardAType, rewardBType, farmConfig, maxCounts !== null && maxCounts !== void 0 ? maxCounts : null, farmTreasury)
                .accounts({
                farm: farm.publicKey,
                farmManager: (0, gem_common_1.isKp)(farmManager)
                    ? farmManager.publicKey
                    : farmManager,
                farmAuthority: farmAuth,
                payer: (0, gem_common_1.isKp)(payer) ? payer.publicKey : farmManager,
                feeAcc: exports.feeAccount,
                rewardAPot,
                rewardAMint,
                rewardBPot,
                rewardBMint,
                bank: bank.publicKey,
                gemBank: this.bankProgram.programId,
                tokenProgram: spl_token_1.TOKEN_PROGRAM_ID,
                systemProgram: web3_js_1.SystemProgram.programId,
                rent: anchor.web3.SYSVAR_RENT_PUBKEY,
            })
                .signers(signers)
                .rpc();
            return {
                farmAuth,
                farmAuthBump,
                farmTreasury,
                farmTreasuryBump,
                rewardAPot,
                rewardAPotBump,
                rewardBPot,
                rewardBPotBump,
                txSig,
            };
        });
    }
    updateFarm(farm, farmManager, config = null, newManager = null, maxCounts) {
        return __awaiter(this, void 0, void 0, function* () {
            const signers = [];
            if ((0, gem_common_1.isKp)(farmManager))
                signers.push(farmManager);
            console.log('updating farm');
            const txSig = yield this.farmProgram.methods
                .updateFarm(config, newManager, maxCounts !== null && maxCounts !== void 0 ? maxCounts : null)
                .accounts({
                farm,
                farmManager: (0, gem_common_1.isKp)(farmManager)
                    ? farmManager.publicKey
                    : farmManager,
            })
                .signers(signers)
                .rpc();
            return { txSig };
        });
    }
    payoutFromTreasury(farm, farmManager, destination, lamports) {
        return __awaiter(this, void 0, void 0, function* () {
            const [farmAuth, farmAuthBump] = yield (0, gem_farm_pda_1.findFarmAuthorityPDA)(farm);
            const [farmTreasury, farmTreasuryBump] = yield (0, gem_farm_pda_1.findFarmTreasuryPDA)(farm);
            const signers = [];
            if ((0, gem_common_1.isKp)(farmManager))
                signers.push(farmManager);
            console.log('paying out from treasury', farmTreasury.toBase58());
            const txSig = yield this.farmProgram.methods
                .payoutFromTreasury(farmAuthBump, farmTreasuryBump, lamports)
                .accounts({
                farm,
                farmManager: (0, gem_common_1.isKp)(farmManager)
                    ? farmManager.publicKey
                    : farmManager,
                farmAuthority: farmAuth,
                farmTreasury,
                destination,
                systemProgram: web3_js_1.SystemProgram.programId,
            })
                .signers(signers)
                .rpc();
            return {
                farmAuth,
                farmAuthBump,
                farmTreasury,
                farmTreasuryBump,
                txSig,
            };
        });
    }
    addToBankWhitelist(farm, farmManager, addressToWhitelist, whitelistType) {
        return __awaiter(this, void 0, void 0, function* () {
            const farmAcc = yield this.fetchFarmAcc(farm);
            const [farmAuth, farmAuthBump] = yield (0, gem_farm_pda_1.findFarmAuthorityPDA)(farm);
            const [whitelistProof, whitelistProofBump] = yield (0, gem_bank_1.findWhitelistProofPDA)(farmAcc.bank, addressToWhitelist);
            const signers = [];
            if ((0, gem_common_1.isKp)(farmManager))
                signers.push(farmManager);
            console.log(`adding ${addressToWhitelist.toBase58()} to whitelist`);
            const txSig = yield this.farmProgram.methods
                .addToBankWhitelist(farmAuthBump, whitelistType)
                .accounts({
                farm,
                farmManager: (0, gem_common_1.isKp)(farmManager)
                    ? farmManager.publicKey
                    : farmManager,
                farmAuthority: farmAuth,
                bank: farmAcc.bank,
                addressToWhitelist,
                whitelistProof,
                systemProgram: web3_js_1.SystemProgram.programId,
                gemBank: this.bankProgram.programId,
            })
                .signers(signers)
                .rpc();
            return {
                farmAuth,
                farmAuthBump,
                whitelistProof,
                whitelistProofBump,
                txSig,
            };
        });
    }
    removeFromBankWhitelist(farm, farmManager, addressToRemove) {
        return __awaiter(this, void 0, void 0, function* () {
            const farmAcc = yield this.fetchFarmAcc(farm);
            const [farmAuth, farmAuthBump] = yield (0, gem_farm_pda_1.findFarmAuthorityPDA)(farm);
            const [whitelistProof, whitelistProofBump] = yield (0, gem_bank_1.findWhitelistProofPDA)(farmAcc.bank, addressToRemove);
            const signers = [];
            if ((0, gem_common_1.isKp)(farmManager))
                signers.push(farmManager);
            console.log(`removing ${addressToRemove.toBase58()} from whitelist`);
            const txSig = yield this.farmProgram.methods
                .removeFromBankWhitelist(farmAuthBump, whitelistProofBump)
                .accounts({
                farm,
                farmManager: (0, gem_common_1.isKp)(farmManager)
                    ? farmManager.publicKey
                    : farmManager,
                farmAuthority: farmAuth,
                bank: farmAcc.bank,
                addressToRemove,
                whitelistProof,
                gemBank: this.bankProgram.programId,
            })
                .signers(signers)
                .rpc();
            return {
                farmAuth,
                farmAuthBump,
                whitelistProof,
                whitelistProofBump,
                txSig,
            };
        });
    }
    // --------------------------------------- farmer ops ixs
    initFarmer(farm, farmerIdentity, payer) {
        return __awaiter(this, void 0, void 0, function* () {
            const { farmer, farmerBump, vault, vaultBump, vaultAuth, vaultAuthBump, builder, } = yield this.buildInitFarmer(farm, farmerIdentity, payer);
            const txSig = yield builder.rpc();
            return {
                farmer,
                farmerBump,
                vault,
                vaultBump,
                vaultAuth,
                vaultAuthBump,
                txSig,
            };
        });
    }
    buildInitFarmer(farm, farmerIdentity, payer) {
        return __awaiter(this, void 0, void 0, function* () {
            const identityPk = (0, gem_common_1.isKp)(farmerIdentity)
                ? farmerIdentity.publicKey
                : farmerIdentity;
            const farmAcc = yield this.fetchFarmAcc(farm);
            const [farmer, farmerBump] = yield (0, gem_farm_pda_1.findFarmerPDA)(farm, identityPk);
            const [vault, vaultBump] = yield (0, gem_bank_1.findVaultPDA)(farmAcc.bank, identityPk);
            const [vaultAuth, vaultAuthBump] = yield (0, gem_bank_1.findVaultAuthorityPDA)(vault); //nice-to-have
            const signers = [];
            if ((0, gem_common_1.isKp)(farmerIdentity))
                signers.push(farmerIdentity);
            if ((0, gem_common_1.isKp)(payer))
                signers.push(payer);
            console.log('adding farmer', identityPk.toBase58());
            const builder = this.farmProgram.methods
                .initFarmer()
                .accounts({
                farm,
                farmer,
                identity: identityPk,
                payer: (0, gem_common_1.isKp)(payer) ? payer.publicKey : payer,
                feeAcc: exports.feeAccount,
                bank: farmAcc.bank,
                vault,
                gemBank: this.bankProgram.programId,
                systemProgram: web3_js_1.SystemProgram.programId,
            })
                .signers(signers);
            return {
                farmer,
                farmerBump,
                vault,
                vaultBump,
                vaultAuth,
                vaultAuthBump,
                builder,
            };
        });
    }
    stakeCommon(farm, farmerIdentity, unstake = false, skipRewards = false) {
        return __awaiter(this, void 0, void 0, function* () {
            const { farmer, farmerBump, vault, vaultBump, farmAuth, farmAuthBump, farmTreasury, farmTreasuryBump, builder, } = yield this.buildStakeCommon(farm, farmerIdentity, unstake, skipRewards);
            const txSig = yield builder.rpc();
            return {
                farmer,
                farmerBump,
                vault,
                vaultBump,
                farmAuth,
                farmAuthBump,
                farmTreasury,
                farmTreasuryBump,
                txSig,
            };
        });
    }
    buildStakeCommon(farm, farmerIdentity, unstake = false, skipRewards = false) {
        return __awaiter(this, void 0, void 0, function* () {
            const identityPk = (0, gem_common_1.isKp)(farmerIdentity)
                ? farmerIdentity.publicKey
                : farmerIdentity;
            const farmAcc = yield this.fetchFarmAcc(farm);
            const [farmer, farmerBump] = yield (0, gem_farm_pda_1.findFarmerPDA)(farm, identityPk);
            const [vault, vaultBump] = yield (0, gem_bank_1.findVaultPDA)(farmAcc.bank, identityPk);
            const [farmAuth, farmAuthBump] = yield (0, gem_farm_pda_1.findFarmAuthorityPDA)(farm);
            const [farmTreasury, farmTreasuryBump] = yield (0, gem_farm_pda_1.findFarmTreasuryPDA)(farm);
            const signers = [];
            if ((0, gem_common_1.isKp)(farmerIdentity))
                signers.push(farmerIdentity);
            const builder = unstake
                ? yield this.farmProgram.methods
                    .unstake(farmAuthBump, farmTreasuryBump, farmerBump, skipRewards)
                    .accounts({
                    farm,
                    farmer,
                    farmTreasury,
                    identity: identityPk,
                    bank: farmAcc.bank,
                    vault,
                    farmAuthority: farmAuth,
                    gemBank: this.bankProgram.programId,
                    systemProgram: web3_js_1.SystemProgram.programId,
                    feeAcc: exports.feeAccount,
                })
                    .signers(signers)
                : yield this.farmProgram.methods
                    .stake(farmAuthBump, farmerBump)
                    .accounts({
                    farm,
                    farmer,
                    identity: identityPk,
                    bank: farmAcc.bank,
                    vault,
                    farmAuthority: farmAuth,
                    gemBank: this.bankProgram.programId,
                    feeAcc: exports.feeAccount,
                    systemProgram: web3_js_1.SystemProgram.programId,
                })
                    .signers(signers);
            return {
                farmer,
                farmerBump,
                vault,
                vaultBump,
                farmAuth,
                farmAuthBump,
                farmTreasury,
                farmTreasuryBump,
                builder,
            };
        });
    }
    stake(farm, farmerIdentity) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.stakeCommon(farm, farmerIdentity, false);
        });
    }
    unstake(farm, farmerIdentity, skipRewards = false) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.stakeCommon(farm, farmerIdentity, true, skipRewards);
        });
    }
    claim(farm, farmerIdentity, rewardAMint, rewardBMint) {
        return __awaiter(this, void 0, void 0, function* () {
            const identityPk = (0, gem_common_1.isKp)(farmerIdentity)
                ? farmerIdentity.publicKey
                : farmerIdentity;
            const [farmAuth, farmAuthBump] = yield (0, gem_farm_pda_1.findFarmAuthorityPDA)(farm);
            const [farmer, farmerBump] = yield (0, gem_farm_pda_1.findFarmerPDA)(farm, identityPk);
            const [potA, potABump] = yield (0, gem_farm_pda_1.findRewardsPotPDA)(farm, rewardAMint);
            const [potB, potBBump] = yield (0, gem_farm_pda_1.findRewardsPotPDA)(farm, rewardBMint);
            const rewardADestination = yield this.findATA(rewardAMint, identityPk);
            const rewardBDestination = yield this.findATA(rewardBMint, identityPk);
            const signers = [];
            if ((0, gem_common_1.isKp)(farmerIdentity))
                signers.push(farmerIdentity);
            const txSig = yield this.farmProgram.methods
                .claim(farmAuthBump, farmerBump, potABump, potBBump)
                .accounts({
                farm,
                farmAuthority: farmAuth,
                farmer,
                identity: identityPk,
                rewardAPot: potA,
                rewardAMint,
                rewardADestination,
                rewardBPot: potB,
                rewardBMint,
                rewardBDestination,
                tokenProgram: spl_token_1.TOKEN_PROGRAM_ID,
                associatedTokenProgram: spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID,
                systemProgram: web3_js_1.SystemProgram.programId,
                rent: anchor.web3.SYSVAR_RENT_PUBKEY,
            })
                .signers(signers)
                .rpc();
            return {
                farmAuth,
                farmAuthBump,
                farmer,
                farmerBump,
                potA,
                potABump,
                potB,
                potBBump,
                rewardADestination,
                rewardBDestination,
                txSig,
            };
        });
    }
    flashDeposit(farm, farmerIdentity, gemAmount, gemMint, gemSource, mintProof, metadata, creatorProof) {
        return __awaiter(this, void 0, void 0, function* () {
            const identityPk = (0, gem_common_1.isKp)(farmerIdentity)
                ? farmerIdentity.publicKey
                : farmerIdentity;
            const farmAcc = yield this.fetchFarmAcc(farm);
            const [farmer, farmerBump] = yield (0, gem_farm_pda_1.findFarmerPDA)(farm, identityPk);
            const [vault, vaultBump] = yield (0, gem_bank_1.findVaultPDA)(farmAcc.bank, identityPk);
            const [farmAuth, farmAuthBump] = yield (0, gem_farm_pda_1.findFarmAuthorityPDA)(farm);
            const [gemBox, gemBoxBump] = yield (0, gem_bank_1.findGemBoxPDA)(vault, gemMint);
            const [GDR, GDRBump] = yield (0, gem_bank_1.findGdrPDA)(vault, gemMint);
            const [vaultAuth, vaultAuthBump] = yield (0, gem_bank_1.findVaultAuthorityPDA)(vault);
            const [gemRarity, gemRarityBump] = yield (0, gem_bank_1.findRarityPDA)(farmAcc.bank, gemMint);
            const remainingAccounts = [];
            if (mintProof)
                remainingAccounts.push({
                    pubkey: mintProof,
                    isWritable: false,
                    isSigner: false,
                });
            if (metadata)
                remainingAccounts.push({
                    pubkey: metadata,
                    isWritable: false,
                    isSigner: false,
                });
            if (creatorProof)
                remainingAccounts.push({
                    pubkey: creatorProof,
                    isWritable: false,
                    isSigner: false,
                });
            const signers = [];
            if ((0, gem_common_1.isKp)(farmerIdentity))
                signers.push(farmerIdentity);
            console.log('flash depositing on behalf of', identityPk.toBase58());
            const flashDepositIx = yield this.farmProgram.instruction.flashDeposit(farmerBump, vaultAuthBump, gemRarityBump, gemAmount, {
                accounts: {
                    farm,
                    farmAuthority: farmAuth,
                    farmer,
                    identity: identityPk,
                    bank: farmAcc.bank,
                    vault,
                    vaultAuthority: vaultAuth,
                    gemBox,
                    gemDepositReceipt: GDR,
                    gemSource,
                    gemMint,
                    gemRarity,
                    tokenProgram: spl_token_1.TOKEN_PROGRAM_ID,
                    systemProgram: web3_js_1.SystemProgram.programId,
                    rent: anchor.web3.SYSVAR_RENT_PUBKEY,
                    gemBank: this.bankProgram.programId,
                    feeAcc: exports.feeAccount,
                },
                remainingAccounts,
            });
            //will have no effect on solana networks < 1.9.2
            const extraComputeIx = this.createExtraComputeIx(256000);
            //craft transaction
            let tx = new web3_js_1.Transaction({
                feePayer: this.wallet.publicKey,
                recentBlockhash: (yield this.conn.getRecentBlockhash()).blockhash,
            });
            tx.add(extraComputeIx);
            tx.add(flashDepositIx);
            tx = yield this.wallet.signTransaction(tx);
            if (signers.length > 0) {
                tx.partialSign(...signers);
            }
            const txSig = yield this.conn.sendRawTransaction(tx.serialize());
            return {
                farmer,
                farmerBump,
                vault,
                vaultBump,
                farmAuth,
                farmAuthBump,
                gemBox,
                gemBoxBump,
                GDR,
                GDRBump,
                vaultAuth,
                vaultAuthBump,
                txSig,
            };
        });
    }
    flashDepositPnft(farm, farmerIdentity, gemAmount, gemMint, gemSource, mintProof, creatorProof) {
        return __awaiter(this, void 0, void 0, function* () {
            const identityPk = (0, gem_common_1.isKp)(farmerIdentity)
                ? farmerIdentity.publicKey
                : farmerIdentity;
            const farmAcc = yield this.fetchFarmAcc(farm);
            const [farmer, farmerBump] = yield (0, gem_farm_pda_1.findFarmerPDA)(farm, identityPk);
            const [vault, vaultBump] = yield (0, gem_bank_1.findVaultPDA)(farmAcc.bank, identityPk);
            const [farmAuth, farmAuthBump] = yield (0, gem_farm_pda_1.findFarmAuthorityPDA)(farm);
            const [gemBox, gemBoxBump] = yield (0, gem_bank_1.findGemBoxPDA)(vault, gemMint);
            const [GDR, GDRBump] = yield (0, gem_bank_1.findGdrPDA)(vault, gemMint);
            const [vaultAuth, vaultAuthBump] = yield (0, gem_bank_1.findVaultAuthorityPDA)(vault);
            const [gemRarity, gemRarityBump] = yield (0, gem_bank_1.findRarityPDA)(farmAcc.bank, gemMint);
            //pnft
            const { meta, ownerTokenRecordBump, ownerTokenRecordPda, destTokenRecordBump, destTokenRecordPda, ruleSet, nftEditionPda, authDataSerialized, } = yield this.prepPnftAccounts({
                nftMint: gemMint,
                destAta: gemBox,
                authData: null,
                sourceAta: gemSource,
            });
            const remainingAccounts = [];
            if (!!ruleSet) {
                remainingAccounts.push({
                    pubkey: ruleSet,
                    isSigner: false,
                    isWritable: false,
                });
            }
            if (mintProof)
                remainingAccounts.push({
                    pubkey: mintProof,
                    isWritable: false,
                    isSigner: false,
                });
            if (creatorProof)
                remainingAccounts.push({
                    pubkey: creatorProof,
                    isWritable: false,
                    isSigner: false,
                });
            const signers = [];
            if ((0, gem_common_1.isKp)(farmerIdentity))
                signers.push(farmerIdentity);
            console.log('(PNFT) flash depositing on behalf of', identityPk.toBase58());
            const flashDepositIx = yield this.farmProgram.instruction.flashDepositPnft(farmerBump, vaultAuthBump, gemRarityBump, gemAmount, !!ruleSet, {
                accounts: {
                    farm,
                    farmAuthority: farmAuth,
                    farmer,
                    identity: identityPk,
                    bank: farmAcc.bank,
                    vault,
                    vaultAuthority: vaultAuth,
                    gemBox,
                    gemDepositReceipt: GDR,
                    gemSource,
                    gemMint,
                    gemRarity,
                    tokenProgram: spl_token_1.TOKEN_PROGRAM_ID,
                    systemProgram: web3_js_1.SystemProgram.programId,
                    rent: anchor.web3.SYSVAR_RENT_PUBKEY,
                    gemBank: this.bankProgram.programId,
                    feeAcc: exports.feeAccount,
                    gemMetadata: meta,
                    gemEdition: nftEditionPda,
                    ownerTokenRecord: ownerTokenRecordPda,
                    destTokenRecord: destTokenRecordPda,
                    authorizationRulesProgram: generated_1.PROGRAM_ID,
                    tokenMetadataProgram: generated_2.PROGRAM_ID,
                    instructions: web3_js_1.SYSVAR_INSTRUCTIONS_PUBKEY,
                    associatedTokenProgram: spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID,
                },
                remainingAccounts,
            });
            //will have no effect on solana networks < 1.9.2
            const extraComputeIx = this.createExtraComputeIx(400000);
            //craft transaction
            let tx = new web3_js_1.Transaction({
                feePayer: this.wallet.publicKey,
                recentBlockhash: (yield this.conn.getRecentBlockhash()).blockhash,
            });
            tx.add(extraComputeIx);
            tx.add(flashDepositIx);
            tx = yield this.wallet.signTransaction(tx);
            if (signers.length > 0) {
                tx.partialSign(...signers);
            }
            const txSig = yield this.conn.sendRawTransaction(tx.serialize());
            return {
                farmer,
                farmerBump,
                vault,
                vaultBump,
                farmAuth,
                farmAuthBump,
                gemBox,
                gemBoxBump,
                GDR,
                GDRBump,
                vaultAuth,
                vaultAuthBump,
                txSig,
                meta,
                ownerTokenRecordBump,
                ownerTokenRecordPda,
                destTokenRecordBump,
                destTokenRecordPda,
            };
        });
    }
    refreshFarmer(farm, farmerIdentity, reenroll) {
        return __awaiter(this, void 0, void 0, function* () {
            const identityPk = (0, gem_common_1.isKp)(farmerIdentity)
                ? farmerIdentity.publicKey
                : farmerIdentity;
            const [farmer, farmerBump] = yield (0, gem_farm_pda_1.findFarmerPDA)(farm, identityPk);
            let txSig;
            if (reenroll !== null && reenroll !== undefined) {
                const signers = [];
                if ((0, gem_common_1.isKp)(farmerIdentity))
                    signers.push(farmerIdentity);
                console.log('refreshing farmer (SIGNED)', identityPk.toBase58());
                txSig = yield this.farmProgram.methods
                    .refreshFarmerSigned(farmerBump, reenroll)
                    .accounts({
                    farm,
                    farmer,
                    identity: identityPk,
                })
                    .signers(signers)
                    .rpc();
            }
            else {
                console.log('refreshing farmer', identityPk.toBase58());
                txSig = yield this.farmProgram.methods
                    .refreshFarmer(farmerBump)
                    .accounts({
                    farm,
                    farmer,
                    identity: identityPk,
                })
                    .rpc();
            }
            return {
                farmer,
                farmerBump,
                txSig,
            };
        });
    }
    // --------------------------------------- funder ops ixs
    authorizeCommon(farm, farmManager, funder, deauthorize = false) {
        return __awaiter(this, void 0, void 0, function* () {
            const [authorizationProof, authorizationProofBump] = yield (0, gem_farm_pda_1.findAuthorizationProofPDA)(farm, funder);
            const signers = [];
            if ((0, gem_common_1.isKp)(farmManager))
                signers.push(farmManager);
            let txSig;
            if (deauthorize) {
                console.log('DEauthorizing funder', funder.toBase58());
                txSig = yield this.farmProgram.methods
                    .deauthorizeFunder(authorizationProofBump)
                    .accounts({
                    farm,
                    farmManager: (0, gem_common_1.isKp)(farmManager)
                        ? farmManager.publicKey
                        : farmManager,
                    funderToDeauthorize: funder,
                    authorizationProof,
                    systemProgram: web3_js_1.SystemProgram.programId,
                })
                    .signers(signers)
                    .rpc();
            }
            else {
                console.log('authorizing funder', funder.toBase58());
                txSig = yield this.farmProgram.methods
                    .authorizeFunder()
                    .accounts({
                    farm,
                    farmManager: (0, gem_common_1.isKp)(farmManager)
                        ? farmManager.publicKey
                        : farmManager,
                    funderToAuthorize: funder,
                    authorizationProof,
                    systemProgram: web3_js_1.SystemProgram.programId,
                })
                    .signers(signers)
                    .rpc();
            }
            return { authorizationProof, authorizationProofBump, txSig };
        });
    }
    authorizeFunder(farm, farmManager, funderToAuthorize) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.authorizeCommon(farm, farmManager, funderToAuthorize, false);
        });
    }
    deauthorizeFunder(farm, farmManager, funderToDeauthorize) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.authorizeCommon(farm, farmManager, funderToDeauthorize, true);
        });
    }
    // --------------------------------------- reward ops ixs
    fundReward(farm, rewardMint, funder, rewardSource, variableRateConfig = null, fixedRateConfig = null) {
        return __awaiter(this, void 0, void 0, function* () {
            const funderPk = (0, gem_common_1.isKp)(funder)
                ? funder.publicKey
                : funder;
            const [farmAuth, farmAuthBump] = yield (0, gem_farm_pda_1.findFarmAuthorityPDA)(farm);
            const [authorizationProof, authorizationProofBump] = yield (0, gem_farm_pda_1.findAuthorizationProofPDA)(farm, funderPk);
            const [pot, potBump] = yield (0, gem_farm_pda_1.findRewardsPotPDA)(farm, rewardMint);
            const signers = [];
            if ((0, gem_common_1.isKp)(funder))
                signers.push(funder);
            console.log('funding reward pot', pot.toBase58());
            const txSig = yield this.farmProgram.methods
                .fundReward(authorizationProofBump, potBump, variableRateConfig, fixedRateConfig)
                .accounts({
                farm,
                authorizationProof,
                authorizedFunder: funderPk,
                rewardPot: pot,
                rewardSource,
                rewardMint,
                tokenProgram: spl_token_1.TOKEN_PROGRAM_ID,
                systemProgram: web3_js_1.SystemProgram.programId,
            })
                .signers(signers)
                .rpc();
            return {
                farmAuth,
                farmAuthBump,
                authorizationProof,
                authorizationProofBump,
                pot,
                potBump,
                txSig,
            };
        });
    }
    cancelReward(farm, farmManager, rewardMint, receiver) {
        return __awaiter(this, void 0, void 0, function* () {
            const [farmAuth, farmAuthBump] = yield (0, gem_farm_pda_1.findFarmAuthorityPDA)(farm);
            const [pot, potBump] = yield (0, gem_farm_pda_1.findRewardsPotPDA)(farm, rewardMint);
            const rewardDestination = yield this.findATA(rewardMint, receiver);
            const signers = [];
            if ((0, gem_common_1.isKp)(farmManager))
                signers.push(farmManager);
            const txSig = yield this.farmProgram.methods
                .cancelReward(farmAuthBump, potBump)
                .accounts({
                farm,
                farmManager: (0, gem_common_1.isKp)(farmManager)
                    ? farmManager.publicKey
                    : farmManager,
                farmAuthority: farmAuth,
                rewardPot: pot,
                rewardDestination,
                rewardMint,
                receiver,
                tokenProgram: spl_token_1.TOKEN_PROGRAM_ID,
                associatedTokenProgram: spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID,
                systemProgram: web3_js_1.SystemProgram.programId,
                rent: anchor.web3.SYSVAR_RENT_PUBKEY,
            })
                .signers(signers)
                .rpc();
            return {
                farmAuth,
                farmAuthBump,
                pot,
                potBump,
                rewardDestination,
                txSig,
            };
        });
    }
    lockReward(farm, farmManager, rewardMint) {
        return __awaiter(this, void 0, void 0, function* () {
            const signers = [];
            if ((0, gem_common_1.isKp)(farmManager))
                signers.push(farmManager);
            const txSig = yield this.farmProgram.methods
                .lockReward()
                .accounts({
                farm,
                farmManager: (0, gem_common_1.isKp)(farmManager)
                    ? farmManager.publicKey
                    : farmManager,
                rewardMint,
            })
                .signers(signers)
                .rpc();
            return { txSig };
        });
    }
    // --------------------------------------- rarity
    addRaritiesToBank(farm, farmManager, rarityConfigs) {
        return __awaiter(this, void 0, void 0, function* () {
            const farmAcc = yield this.fetchFarmAcc(farm);
            const bank = farmAcc.bank;
            const [farmAuth, farmAuthBump] = yield (0, gem_farm_pda_1.findFarmAuthorityPDA)(farm);
            //prepare rarity configs
            const completeRarityConfigs = [...rarityConfigs];
            const remainingAccounts = [];
            for (const config of completeRarityConfigs) {
                const [gemRarity] = yield (0, gem_bank_1.findRarityPDA)(bank, config.mint);
                //add mint
                remainingAccounts.push({
                    pubkey: config.mint,
                    isWritable: false,
                    isSigner: false,
                });
                //add rarity pda
                remainingAccounts.push({
                    pubkey: gemRarity,
                    isWritable: true,
                    isSigner: false,
                });
            }
            const signers = [];
            if ((0, gem_common_1.isKp)(farmManager))
                signers.push(farmManager);
            console.log("adding rarities to farm's bank");
            const txSig = yield this.farmProgram.methods
                .addRaritiesToBank(farmAuthBump, completeRarityConfigs)
                .accounts({
                farm,
                farmManager: (0, gem_common_1.isKp)(farmManager)
                    ? farmManager.publicKey
                    : farmManager,
                farmAuthority: farmAuth,
                bank,
                gemBank: this.bankProgram.programId,
                systemProgram: web3_js_1.SystemProgram.programId,
            })
                .remainingAccounts(remainingAccounts)
                .signers(signers)
                .rpc();
            return {
                bank,
                farmAuth,
                farmAuthBump,
                completeRarityConfigs,
                txSig,
            };
        });
    }
    // --------------------------------------- helpers
    //returns "variable" or "fixed"
    parseRewardType(reward) {
        return Object.keys(reward.rewardType)[0];
    }
    //returns "staked" / "unstaked" / "pendingCooldown"
    parseFarmerState(farmer) {
        return Object.keys(farmer.state)[0];
    }
    createExtraComputeIx(newComputeBudget) {
        const data = Buffer.from(Uint8Array.of(0, ...new anchor_1.BN(newComputeBudget).toArray('le', 4), ...new anchor_1.BN(0).toArray('le', 4)));
        return new web3_js_1.TransactionInstruction({
            keys: [],
            programId: new web3_js_1.PublicKey('ComputeBudget111111111111111111111111111111'),
            data,
        });
    }
}
exports.GemFarmClient = GemFarmClient;
