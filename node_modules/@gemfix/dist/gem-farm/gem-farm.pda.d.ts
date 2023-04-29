import { PublicKey } from '@solana/web3.js';
export declare const findFarmerPDA: (farm: PublicKey, identity: PublicKey) => Promise<[PublicKey, number]>;
export declare const findFarmAuthorityPDA: (farm: PublicKey) => Promise<[PublicKey, number]>;
export declare const findFarmTreasuryPDA: (farm: PublicKey) => Promise<[PublicKey, number]>;
export declare const findAuthorizationProofPDA: (farm: PublicKey, funder: PublicKey) => Promise<[PublicKey, number]>;
export declare const findRewardsPotPDA: (farm: PublicKey, rewardMint: PublicKey) => Promise<[PublicKey, number]>;
