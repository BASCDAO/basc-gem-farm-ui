import { AddressLookupTableAccount, ConfirmOptions, Connection, Keypair, PublicKey, Signer, TransactionInstruction } from '@solana/web3.js';
import { AnchorProvider } from '@project-serum/anchor';
export declare const fetchNft: (conn: Connection, mint: PublicKey) => Promise<import("@metaplex-foundation/js").Sft | import("@metaplex-foundation/js").SftWithToken | import("@metaplex-foundation/js").Nft | import("@metaplex-foundation/js").NftWithToken>;
export declare const findTokenRecordPDA: (mint: PublicKey, token: PublicKey) => Promise<[PublicKey, number]>;
export declare const findRuleSetPDA: (payer: PublicKey, name: string) => Promise<[PublicKey, number]>;
declare type BuildAndSendTxArgs = {
    provider: AnchorProvider;
    ixs: TransactionInstruction[];
    extraSigners?: Signer[];
    opts?: ConfirmOptions;
    debug?: boolean;
    lookupTableAccounts?: [AddressLookupTableAccount] | undefined;
    v0SignKeypair?: Keypair;
    v0SignCallback?: (tx: any) => any;
};
export declare const buildAndSendTx: ({ provider, ixs, extraSigners, opts, debug, lookupTableAccounts, v0SignKeypair, v0SignCallback, }: BuildAndSendTxArgs) => Promise<string>;
export declare const getTotalComputeIxs: (compute: number, priorityMicroLamports?: number) => TransactionInstruction[];
export declare type CreatorInput = {
    address: PublicKey;
    share: number;
    authority?: Signer;
};
export declare const createAndFundATA: ({ provider, owner, mint, royaltyBps, creators, collection, collectionVerified, programmable, ruleSetAddr, }: {
    provider: AnchorProvider;
    owner?: Keypair;
    mint?: Keypair;
    royaltyBps?: number;
    creators?: CreatorInput[];
    collection?: Keypair;
    collectionVerified?: boolean;
    programmable?: boolean;
    ruleSetAddr?: PublicKey;
}) => Promise<{
    mint: PublicKey;
    ata: PublicKey;
    owner: Keypair;
    metadata: PublicKey;
    masterEdition: PublicKey;
}>;
export declare const createTokenAuthorizationRules: (provider: AnchorProvider, payer: Keypair, name?: string, data?: Uint8Array) => Promise<PublicKey>;
export declare const createCoreGemLUT: (provider: AnchorProvider) => Promise<AddressLookupTableAccount>;
export {};
