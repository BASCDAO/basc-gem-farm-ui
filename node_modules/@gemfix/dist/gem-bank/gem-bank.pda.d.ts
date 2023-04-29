import { PublicKey } from '@solana/web3.js';
export declare const findVaultPDA: (bank: PublicKey, creator: PublicKey) => Promise<[PublicKey, number]>;
export declare const findGemBoxPDA: (vault: PublicKey, mint: PublicKey) => Promise<[PublicKey, number]>;
export declare const findGdrPDA: (vault: PublicKey, mint: PublicKey) => Promise<[PublicKey, number]>;
export declare const findVaultAuthorityPDA: (vault: PublicKey) => Promise<[PublicKey, number]>;
export declare const findWhitelistProofPDA: (bank: PublicKey, whitelistedAddress: PublicKey) => Promise<[PublicKey, number]>;
export declare const findRarityPDA: (bank: PublicKey, mint: PublicKey) => Promise<[PublicKey, number]>;
