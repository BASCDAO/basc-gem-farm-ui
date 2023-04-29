import * as anchor from '@project-serum/anchor';
import { BN, Idl } from '@project-serum/anchor';
import { Connection, Keypair, PublicKey } from '@solana/web3.js';
import { AccountUtils } from '../gem-common';
import { GemBank } from '../types/gem_bank';
import { AuthorizationData } from '@metaplex-foundation/mpl-token-metadata';
export declare enum BankFlags {
    FreezeVaults = 1
}
export declare enum WhitelistType {
    Creator = 1,
    Mint = 2
}
export declare class GemBankClient extends AccountUtils {
    wallet: anchor.Wallet;
    provider: anchor.Provider;
    bankProgram: anchor.Program<GemBank>;
    constructor(conn: Connection, wallet: anchor.Wallet, idl?: Idl, programId?: PublicKey);
    setProvider(): void;
    setBankProgram(idl?: Idl, programId?: PublicKey): void;
    fetchBankAcc(bank: PublicKey): Promise<{
        version: number;
        bankManager: anchor.web3.PublicKey;
        flags: number;
        whitelistedCreators: number;
        whitelistedMints: number;
        vaultCount: anchor.BN;
        reserved: number[] | number[] | number[];
        vault: anchor.web3.PublicKey;
        gemBoxAddress: anchor.web3.PublicKey;
        gemMint: anchor.web3.PublicKey;
        gemCount: anchor.BN;
        points: number;
        bank: anchor.web3.PublicKey;
        owner: anchor.web3.PublicKey;
        creator: anchor.web3.PublicKey;
        authority: anchor.web3.PublicKey;
        authoritySeed: anchor.web3.PublicKey;
        authorityBumpSeed: number[];
        locked: boolean;
        name: number[];
        gemBoxCount: anchor.BN;
        rarityPoints: anchor.BN;
        whitelistType: number;
        whitelistedAddress: anchor.web3.PublicKey;
    }>;
    fetchVaultAcc(vault: PublicKey): Promise<{
        version: number;
        bankManager: anchor.web3.PublicKey;
        flags: number;
        whitelistedCreators: number;
        whitelistedMints: number;
        vaultCount: anchor.BN;
        reserved: number[] | number[] | number[];
        vault: anchor.web3.PublicKey;
        gemBoxAddress: anchor.web3.PublicKey;
        gemMint: anchor.web3.PublicKey;
        gemCount: anchor.BN;
        points: number;
        bank: anchor.web3.PublicKey;
        owner: anchor.web3.PublicKey;
        creator: anchor.web3.PublicKey;
        authority: anchor.web3.PublicKey;
        authoritySeed: anchor.web3.PublicKey;
        authorityBumpSeed: number[];
        locked: boolean;
        name: number[];
        gemBoxCount: anchor.BN;
        rarityPoints: anchor.BN;
        whitelistType: number;
        whitelistedAddress: anchor.web3.PublicKey;
    }>;
    fetchGDRAcc(GDR: PublicKey): Promise<{
        version: number;
        bankManager: anchor.web3.PublicKey;
        flags: number;
        whitelistedCreators: number;
        whitelistedMints: number;
        vaultCount: anchor.BN;
        reserved: number[] | number[] | number[];
        vault: anchor.web3.PublicKey;
        gemBoxAddress: anchor.web3.PublicKey;
        gemMint: anchor.web3.PublicKey;
        gemCount: anchor.BN;
        points: number;
        bank: anchor.web3.PublicKey;
        owner: anchor.web3.PublicKey;
        creator: anchor.web3.PublicKey;
        authority: anchor.web3.PublicKey;
        authoritySeed: anchor.web3.PublicKey;
        authorityBumpSeed: number[];
        locked: boolean;
        name: number[];
        gemBoxCount: anchor.BN;
        rarityPoints: anchor.BN;
        whitelistType: number;
        whitelistedAddress: anchor.web3.PublicKey;
    }>;
    fetchGemAcc(mint: PublicKey, gemAcc: PublicKey): Promise<AccountInfo>;
    fetchWhitelistProofAcc(proof: PublicKey): Promise<{
        version: number;
        bankManager: anchor.web3.PublicKey;
        flags: number;
        whitelistedCreators: number;
        whitelistedMints: number;
        vaultCount: anchor.BN;
        reserved: number[] | number[] | number[];
        vault: anchor.web3.PublicKey;
        gemBoxAddress: anchor.web3.PublicKey;
        gemMint: anchor.web3.PublicKey;
        gemCount: anchor.BN;
        points: number;
        bank: anchor.web3.PublicKey;
        owner: anchor.web3.PublicKey;
        creator: anchor.web3.PublicKey;
        authority: anchor.web3.PublicKey;
        authoritySeed: anchor.web3.PublicKey;
        authorityBumpSeed: number[];
        locked: boolean;
        name: number[];
        gemBoxCount: anchor.BN;
        rarityPoints: anchor.BN;
        whitelistType: number;
        whitelistedAddress: anchor.web3.PublicKey;
    }>;
    fetchRarity(rarity: PublicKey): Promise<{
        version: number;
        bankManager: anchor.web3.PublicKey;
        flags: number;
        whitelistedCreators: number;
        whitelistedMints: number;
        vaultCount: anchor.BN;
        reserved: number[] | number[] | number[];
        vault: anchor.web3.PublicKey;
        gemBoxAddress: anchor.web3.PublicKey;
        gemMint: anchor.web3.PublicKey;
        gemCount: anchor.BN;
        points: number;
        bank: anchor.web3.PublicKey;
        owner: anchor.web3.PublicKey;
        creator: anchor.web3.PublicKey;
        authority: anchor.web3.PublicKey;
        authoritySeed: anchor.web3.PublicKey;
        authorityBumpSeed: number[];
        locked: boolean;
        name: number[];
        gemBoxCount: anchor.BN;
        rarityPoints: anchor.BN;
        whitelistType: number;
        whitelistedAddress: anchor.web3.PublicKey;
    }>;
    fetchAllBankPDAs(manager?: PublicKey): Promise<anchor.ProgramAccount<{
        version: number;
        bankManager: anchor.web3.PublicKey;
        flags: number;
        whitelistedCreators: number;
        whitelistedMints: number;
        vaultCount: anchor.BN;
        reserved: number[] | number[] | number[];
        vault: anchor.web3.PublicKey;
        gemBoxAddress: anchor.web3.PublicKey;
        gemMint: anchor.web3.PublicKey;
        gemCount: anchor.BN;
        points: number;
        bank: anchor.web3.PublicKey;
        owner: anchor.web3.PublicKey;
        creator: anchor.web3.PublicKey;
        authority: anchor.web3.PublicKey;
        authoritySeed: anchor.web3.PublicKey;
        authorityBumpSeed: number[];
        locked: boolean;
        name: number[];
        gemBoxCount: anchor.BN;
        rarityPoints: anchor.BN;
        whitelistType: number;
        whitelistedAddress: anchor.web3.PublicKey;
    }>[]>;
    fetchAllVaultPDAs(bank?: PublicKey): Promise<anchor.ProgramAccount<{
        version: number;
        bankManager: anchor.web3.PublicKey;
        flags: number;
        whitelistedCreators: number;
        whitelistedMints: number;
        vaultCount: anchor.BN;
        reserved: number[] | number[] | number[];
        vault: anchor.web3.PublicKey;
        gemBoxAddress: anchor.web3.PublicKey;
        gemMint: anchor.web3.PublicKey;
        gemCount: anchor.BN;
        points: number;
        bank: anchor.web3.PublicKey;
        owner: anchor.web3.PublicKey;
        creator: anchor.web3.PublicKey;
        authority: anchor.web3.PublicKey;
        authoritySeed: anchor.web3.PublicKey;
        authorityBumpSeed: number[];
        locked: boolean;
        name: number[];
        gemBoxCount: anchor.BN;
        rarityPoints: anchor.BN;
        whitelistType: number;
        whitelistedAddress: anchor.web3.PublicKey;
    }>[]>;
    fetchAllGdrPDAs(vault?: PublicKey): Promise<anchor.ProgramAccount<{
        version: number;
        bankManager: anchor.web3.PublicKey;
        flags: number;
        whitelistedCreators: number;
        whitelistedMints: number;
        vaultCount: anchor.BN;
        reserved: number[] | number[] | number[];
        vault: anchor.web3.PublicKey;
        gemBoxAddress: anchor.web3.PublicKey;
        gemMint: anchor.web3.PublicKey;
        gemCount: anchor.BN;
        points: number;
        bank: anchor.web3.PublicKey;
        owner: anchor.web3.PublicKey;
        creator: anchor.web3.PublicKey;
        authority: anchor.web3.PublicKey;
        authoritySeed: anchor.web3.PublicKey;
        authorityBumpSeed: number[];
        locked: boolean;
        name: number[];
        gemBoxCount: anchor.BN;
        rarityPoints: anchor.BN;
        whitelistType: number;
        whitelistedAddress: anchor.web3.PublicKey;
    }>[]>;
    fetchAllWhitelistProofPDAs(bank?: PublicKey): Promise<anchor.ProgramAccount<{
        version: number;
        bankManager: anchor.web3.PublicKey;
        flags: number;
        whitelistedCreators: number;
        whitelistedMints: number;
        vaultCount: anchor.BN;
        reserved: number[] | number[] | number[];
        vault: anchor.web3.PublicKey;
        gemBoxAddress: anchor.web3.PublicKey;
        gemMint: anchor.web3.PublicKey;
        gemCount: anchor.BN;
        points: number;
        bank: anchor.web3.PublicKey;
        owner: anchor.web3.PublicKey;
        creator: anchor.web3.PublicKey;
        authority: anchor.web3.PublicKey;
        authoritySeed: anchor.web3.PublicKey;
        authorityBumpSeed: number[];
        locked: boolean;
        name: number[];
        gemBoxCount: anchor.BN;
        rarityPoints: anchor.BN;
        whitelistType: number;
        whitelistedAddress: anchor.web3.PublicKey;
    }>[]>;
    fetchAllRarityPDAs(): Promise<anchor.ProgramAccount<{
        version: number;
        bankManager: anchor.web3.PublicKey;
        flags: number;
        whitelistedCreators: number;
        whitelistedMints: number;
        vaultCount: anchor.BN;
        reserved: number[] | number[] | number[];
        vault: anchor.web3.PublicKey;
        gemBoxAddress: anchor.web3.PublicKey;
        gemMint: anchor.web3.PublicKey;
        gemCount: anchor.BN;
        points: number;
        bank: anchor.web3.PublicKey;
        owner: anchor.web3.PublicKey;
        creator: anchor.web3.PublicKey;
        authority: anchor.web3.PublicKey;
        authoritySeed: anchor.web3.PublicKey;
        authorityBumpSeed: number[];
        locked: boolean;
        name: number[];
        gemBoxCount: anchor.BN;
        rarityPoints: anchor.BN;
        whitelistType: number;
        whitelistedAddress: anchor.web3.PublicKey;
    }>[]>;
    initBank(bank: Keypair, bankManager: PublicKey | Keypair, payer: PublicKey | Keypair): Promise<{
        txSig: string;
    }>;
    updateBankManager(bank: PublicKey, bankManager: PublicKey | Keypair, newManager: PublicKey): Promise<{
        txSig: string;
    }>;
    initVault(bank: PublicKey, creator: PublicKey | Keypair, payer: PublicKey | Keypair, owner: PublicKey, name: string): Promise<{
        vault: anchor.web3.PublicKey;
        vaultBump: number;
        vaultAuth: anchor.web3.PublicKey;
        vaultAuthBump: number;
        txSig: string;
    }>;
    updateVaultOwner(bank: PublicKey, vault: PublicKey, existingOwner: Keypair | PublicKey, newOwner: PublicKey): Promise<{
        txSig: string;
    }>;
    setVaultLock(bank: PublicKey, vault: PublicKey, bankManager: PublicKey | Keypair, vaultLocked: boolean): Promise<{
        txSig: string;
    }>;
    setBankFlags(bank: PublicKey, bankManager: PublicKey | Keypair, flags: BankFlags): Promise<{
        txSig: string;
    }>;
    depositGem(bank: PublicKey, vault: PublicKey, vaultOwner: PublicKey | Keypair, gemAmount: BN, gemMint: PublicKey, gemSource: PublicKey, mintProof?: PublicKey, metadata?: PublicKey, creatorProof?: PublicKey, pnft?: boolean): Promise<{
        vaultAuth: anchor.web3.PublicKey;
        vaultAuthBump: number;
        gemBox: anchor.web3.PublicKey;
        gemBoxBump: number;
        GDR: anchor.web3.PublicKey;
        GDRBump: number;
        gemRarity: anchor.web3.PublicKey;
        gemRarityBump: number;
        txSig: string;
    }>;
    buildDepositGem(bank: PublicKey, vault: PublicKey, vaultOwner: PublicKey | Keypair, gemAmount: BN, gemMint: PublicKey, gemSource: PublicKey, mintProof?: PublicKey, metadata?: PublicKey, creatorProof?: PublicKey): Promise<{
        vaultAuth: anchor.web3.PublicKey;
        vaultAuthBump: number;
        gemBox: anchor.web3.PublicKey;
        gemBoxBump: number;
        GDR: anchor.web3.PublicKey;
        GDRBump: number;
        gemRarity: anchor.web3.PublicKey;
        gemRarityBump: number;
        builder: import("@project-serum/anchor/dist/cjs/program/namespace/methods").MethodsBuilder<GemBank, {
            name: "depositGem";
            accounts: [{
                name: "bank";
                isMut: false;
                isSigner: false;
            }, {
                name: "vault";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "authority";
                isMut: false;
                isSigner: false;
            }, {
                name: "gemBox";
                isMut: true;
                isSigner: false;
            }, {
                name: "gemDepositReceipt";
                isMut: true;
                isSigner: false;
            }, {
                name: "gemSource";
                isMut: true;
                isSigner: false;
            }, {
                name: "gemMint";
                isMut: false;
                isSigner: false;
            }, {
                name: "gemRarity";
                isMut: false;
                isSigner: false;
            }, {
                name: "tokenProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "rent";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "bumpAuth";
                type: "u8";
            }, {
                name: "bumpRarity";
                type: "u8";
            }, {
                name: "amount";
                type: "u64";
            }];
        } & {
            name: "depositGem";
        }>;
    }>;
    buildDepositGemPnft(bank: PublicKey, vault: PublicKey, vaultOwner: PublicKey | Keypair, gemAmount: BN, gemMint: PublicKey, gemSource: PublicKey, mintProof?: PublicKey, creatorProof?: PublicKey, compute?: number, priorityFee?: number): Promise<{
        vaultAuth: anchor.web3.PublicKey;
        vaultAuthBump: number;
        gemBox: anchor.web3.PublicKey;
        gemBoxBump: number;
        GDR: anchor.web3.PublicKey;
        GDRBump: number;
        gemRarity: anchor.web3.PublicKey;
        gemRarityBump: number;
        builder: import("@project-serum/anchor/dist/cjs/program/namespace/methods").MethodsBuilder<GemBank, {
            name: "depositGemPnft";
            accounts: [{
                name: "bank";
                isMut: false;
                isSigner: false;
            }, {
                name: "vault";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "authority";
                isMut: false;
                isSigner: false;
            }, {
                name: "gemBox";
                isMut: true;
                isSigner: false;
            }, {
                name: "gemDepositReceipt";
                isMut: true;
                isSigner: false;
            }, {
                name: "gemSource";
                isMut: true;
                isSigner: false;
            }, {
                name: "gemMint";
                isMut: false;
                isSigner: false;
            }, {
                name: "gemRarity";
                isMut: false;
                isSigner: false;
            }, {
                name: "tokenProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "rent";
                isMut: false;
                isSigner: false;
            }, {
                name: "associatedTokenProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "gemMetadata";
                isMut: true;
                isSigner: false;
            }, {
                name: "gemEdition";
                isMut: false;
                isSigner: false;
            }, {
                name: "ownerTokenRecord";
                isMut: true;
                isSigner: false;
            }, {
                name: "destTokenRecord";
                isMut: true;
                isSigner: false;
            }, {
                name: "pnftShared";
                accounts: [{
                    name: "tokenMetadataProgram";
                    isMut: false;
                    isSigner: false;
                }, {
                    name: "instructions";
                    isMut: false;
                    isSigner: false;
                }, {
                    name: "authorizationRulesProgram";
                    isMut: false;
                    isSigner: false;
                }];
            }];
            args: [{
                name: "bumpAuth";
                type: "u8";
            }, {
                name: "bumpRarity";
                type: "u8";
            }, {
                name: "amount";
                type: "u64";
            }, {
                name: "authorizationData";
                type: {
                    option: {
                        defined: "AuthorizationDataLocal";
                    };
                };
            }, {
                name: "rulesAccPresent";
                type: "bool";
            }];
        } & {
            name: "depositGemPnft";
        }>;
        ixs: anchor.web3.TransactionInstruction[];
        ownerTokenRecordBump: number;
        ownerTokenRecordPda: anchor.web3.PublicKey;
        destTokenRecordBump: number;
        destTokenRecordPda: anchor.web3.PublicKey;
        meta: any;
    }>;
    withdrawGem(bank: PublicKey, vault: PublicKey, vaultOwner: PublicKey | Keypair, gemAmount: BN, gemMint: PublicKey, receiver: PublicKey, pnft?: boolean): Promise<{
        gemBox: anchor.web3.PublicKey;
        gemBoxBump: number;
        GDR: anchor.web3.PublicKey;
        GDRBump: number;
        gemRarity: anchor.web3.PublicKey;
        gemRarityBump: number;
        vaultAuth: anchor.web3.PublicKey;
        vaultAuthBump: number;
        gemDestination: anchor.web3.PublicKey;
        txSig: string;
    }>;
    buildWithdrawGem(bank: PublicKey, vault: PublicKey, vaultOwner: PublicKey | Keypair, gemAmount: BN, gemMint: PublicKey, receiver: PublicKey): Promise<{
        gemBox: anchor.web3.PublicKey;
        gemBoxBump: number;
        GDR: anchor.web3.PublicKey;
        GDRBump: number;
        gemRarity: anchor.web3.PublicKey;
        gemRarityBump: number;
        vaultAuth: anchor.web3.PublicKey;
        vaultAuthBump: number;
        gemDestination: anchor.web3.PublicKey;
        builder: import("@project-serum/anchor/dist/cjs/program/namespace/methods").MethodsBuilder<GemBank, {
            name: "withdrawGem";
            accounts: [{
                name: "bank";
                isMut: false;
                isSigner: false;
            }, {
                name: "vault";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "authority";
                isMut: false;
                isSigner: false;
            }, {
                name: "gemBox";
                isMut: true;
                isSigner: false;
            }, {
                name: "gemDepositReceipt";
                isMut: true;
                isSigner: false;
            }, {
                name: "gemDestination";
                isMut: true;
                isSigner: false;
            }, {
                name: "gemMint";
                isMut: false;
                isSigner: false;
            }, {
                name: "gemRarity";
                isMut: false;
                isSigner: false;
            }, {
                name: "receiver";
                isMut: true;
                isSigner: false;
            }, {
                name: "tokenProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "associatedTokenProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "rent";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "bumpAuth";
                type: "u8";
            }, {
                name: "bumpGemBox";
                type: "u8";
            }, {
                name: "bumpGdr";
                type: "u8";
            }, {
                name: "bumpRarity";
                type: "u8";
            }, {
                name: "amount";
                type: "u64";
            }];
        } & {
            name: "withdrawGem";
        }>;
    }>;
    buildWithdrawGemPnft(bank: PublicKey, vault: PublicKey, vaultOwner: PublicKey | Keypair, gemAmount: BN, gemMint: PublicKey, receiver: PublicKey, compute?: number, priorityFee?: number): Promise<{
        gemBox: anchor.web3.PublicKey;
        gemBoxBump: number;
        GDR: anchor.web3.PublicKey;
        GDRBump: number;
        gemRarity: anchor.web3.PublicKey;
        gemRarityBump: number;
        vaultAuth: anchor.web3.PublicKey;
        vaultAuthBump: number;
        gemDestination: anchor.web3.PublicKey;
        builder: import("@project-serum/anchor/dist/cjs/program/namespace/methods").MethodsBuilder<GemBank, {
            name: "withdrawGemPnft";
            accounts: [{
                name: "bank";
                isMut: false;
                isSigner: false;
            }, {
                name: "vault";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "authority";
                isMut: false;
                isSigner: false;
            }, {
                name: "gemBox";
                isMut: true;
                isSigner: false;
            }, {
                name: "gemDepositReceipt";
                isMut: true;
                isSigner: false;
            }, {
                name: "gemDestination";
                isMut: true;
                isSigner: false;
            }, {
                name: "gemMint";
                isMut: false;
                isSigner: false;
            }, {
                name: "gemRarity";
                isMut: false;
                isSigner: false;
            }, {
                name: "receiver";
                isMut: true;
                isSigner: false;
            }, {
                name: "tokenProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "associatedTokenProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "rent";
                isMut: false;
                isSigner: false;
            }, {
                name: "gemMetadata";
                isMut: true;
                isSigner: false;
            }, {
                name: "gemEdition";
                isMut: false;
                isSigner: false;
            }, {
                name: "ownerTokenRecord";
                isMut: true;
                isSigner: false;
            }, {
                name: "destTokenRecord";
                isMut: true;
                isSigner: false;
            }, {
                name: "pnftShared";
                accounts: [{
                    name: "tokenMetadataProgram";
                    isMut: false;
                    isSigner: false;
                }, {
                    name: "instructions";
                    isMut: false;
                    isSigner: false;
                }, {
                    name: "authorizationRulesProgram";
                    isMut: false;
                    isSigner: false;
                }];
            }];
            args: [{
                name: "bumpAuth";
                type: "u8";
            }, {
                name: "bumpGemBox";
                type: "u8";
            }, {
                name: "bumpGdr";
                type: "u8";
            }, {
                name: "bumpRarity";
                type: "u8";
            }, {
                name: "amount";
                type: "u64";
            }, {
                name: "authorizationData";
                type: {
                    option: {
                        defined: "AuthorizationDataLocal";
                    };
                };
            }, {
                name: "rulesAccPresent";
                type: "bool";
            }];
        } & {
            name: "withdrawGemPnft";
        }>;
        ixs: anchor.web3.TransactionInstruction[];
        ownerTokenRecordBump: number;
        ownerTokenRecordPda: anchor.web3.PublicKey;
        destTokenRecordBump: number;
        destTokenRecordPda: anchor.web3.PublicKey;
        meta: any;
    }>;
    addToWhitelist(bank: PublicKey, bankManager: PublicKey | Keypair, addressToWhitelist: PublicKey, whitelistType: WhitelistType, payer?: PublicKey): Promise<{
        whitelistProof: anchor.web3.PublicKey;
        whitelistBump: number;
        txSig: string;
    }>;
    removeFromWhitelist(bank: PublicKey, bankManager: PublicKey | Keypair, addressToRemove: PublicKey, fundsReceiver?: PublicKey): Promise<{
        whitelistProof: anchor.web3.PublicKey;
        whitelistBump: number;
        txSig: string;
    }>;
    withdrawTokensAuth(bank: PublicKey, vault: PublicKey, vaultOwner: PublicKey | Keypair, tokenMint: PublicKey): Promise<{
        recipientAta: anchor.web3.PublicKey;
        vaultAta: anchor.web3.PublicKey;
        vaultAuth: anchor.web3.PublicKey;
        vaultAuthBump: number;
        gemDestination: anchor.web3.PublicKey;
        builder: import("@project-serum/anchor/dist/cjs/program/namespace/methods").MethodsBuilder<GemBank, {
            name: "withdrawTokensAuth";
            accounts: [{
                name: "bank";
                isMut: false;
                isSigner: false;
            }, {
                name: "vault";
                isMut: true;
                isSigner: false;
            }, {
                name: "owner";
                isMut: true;
                isSigner: true;
            }, {
                name: "authority";
                isMut: false;
                isSigner: false;
            }, {
                name: "vaultAta";
                isMut: true;
                isSigner: false;
            }, {
                name: "recipientAta";
                isMut: true;
                isSigner: false;
            }, {
                name: "mint";
                isMut: false;
                isSigner: false;
            }, {
                name: "tokenProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "associatedTokenProgram";
                isMut: false;
                isSigner: false;
            }, {
                name: "rent";
                isMut: false;
                isSigner: false;
            }];
            args: [];
        } & {
            name: "withdrawTokensAuth";
        }>;
    }>;
    prepPnftAccounts({ nftMetadata, nftMint, sourceAta, destAta, authData, }: {
        nftMetadata?: PublicKey;
        nftMint: PublicKey;
        sourceAta: PublicKey;
        destAta: PublicKey;
        authData?: AuthorizationData | null;
    }): Promise<{
        meta: any;
        creators: anchor.web3.PublicKey[];
        ownerTokenRecordBump: number;
        ownerTokenRecordPda: anchor.web3.PublicKey;
        destTokenRecordBump: number;
        destTokenRecordPda: anchor.web3.PublicKey;
        ruleSet: anchor.web3.PublicKey;
        nftEditionPda: import("@metaplex-foundation/js").Pda;
        authDataSerialized: {
            payload: {
                name: string;
                payload: any;
            }[];
        };
    }>;
}
