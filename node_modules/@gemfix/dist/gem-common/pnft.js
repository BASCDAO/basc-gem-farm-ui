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
exports.createCoreGemLUT = exports.createTokenAuthorizationRules = exports.createAndFundATA = exports.getTotalComputeIxs = exports.buildAndSendTx = exports.findRuleSetPDA = exports.findTokenRecordPDA = exports.fetchNft = void 0;
const web3_js_1 = require("@solana/web3.js");
const js_1 = require("@metaplex-foundation/js");
const mpl_token_metadata_1 = require("@metaplex-foundation/mpl-token-metadata/");
const mpl_token_auth_rules_1 = require("@metaplex-foundation/mpl-token-auth-rules");
const spl_token_1 = require("@solana/spl-token");
const msgpack_1 = require("@msgpack/msgpack");
const exponential_backoff_1 = require("exponential-backoff");
const index_1 = require("../index");
const fetchNft = (conn, mint) => __awaiter(void 0, void 0, void 0, function* () {
    const mplex = new js_1.Metaplex(conn);
    return yield mplex
        .nfts()
        .findByMint({ mintAddress: mint, loadJsonMetadata: true });
});
exports.fetchNft = fetchNft;
const findTokenRecordPDA = (mint, token) => __awaiter(void 0, void 0, void 0, function* () {
    return web3_js_1.PublicKey.findProgramAddress([
        Buffer.from('metadata'),
        mpl_token_metadata_1.PROGRAM_ID.toBuffer(),
        mint.toBuffer(),
        Buffer.from('token_record'),
        token.toBuffer(),
    ], mpl_token_metadata_1.PROGRAM_ID);
});
exports.findTokenRecordPDA = findTokenRecordPDA;
const findRuleSetPDA = (payer, name) => __awaiter(void 0, void 0, void 0, function* () {
    return yield web3_js_1.PublicKey.findProgramAddress([Buffer.from(mpl_token_auth_rules_1.PREFIX), payer.toBuffer(), Buffer.from(name)], mpl_token_auth_rules_1.PROGRAM_ID);
});
exports.findRuleSetPDA = findRuleSetPDA;
//simplified version from tensor-common
const _buildTx = ({ connections, feePayer, instructions, additionalSigners, commitment = 'confirmed', }) => __awaiter(void 0, void 0, void 0, function* () {
    if (!instructions.length) {
        throw new Error('must pass at least one instruction');
    }
    const tx = new web3_js_1.Transaction();
    tx.add(...instructions);
    tx.feePayer = feePayer;
    const latestBlockhash = yield connections[0].getLatestBlockhash({
        commitment,
    });
    tx.recentBlockhash = latestBlockhash.blockhash;
    const lastValidBlockHeight = latestBlockhash.lastValidBlockHeight;
    if (additionalSigners) {
        additionalSigners
            .filter((s) => s !== undefined)
            .forEach((kp) => {
            tx.partialSign(kp);
        });
    }
    return { tx, lastValidBlockHeight };
});
//simplified version from tensor-common
const _buildTxV0 = ({ connections, feePayer, instructions, additionalSigners, commitment = 'confirmed', addressLookupTableAccs, }) => __awaiter(void 0, void 0, void 0, function* () {
    if (!instructions.length) {
        throw new Error('must pass at least one instruction');
    }
    const latestBlockhash = yield connections[0].getLatestBlockhash({
        commitment,
    });
    const lastValidBlockHeight = latestBlockhash.lastValidBlockHeight;
    const msg = new web3_js_1.TransactionMessage({
        payerKey: feePayer,
        recentBlockhash: latestBlockhash.blockhash,
        instructions,
    }).compileToV0Message(addressLookupTableAccs);
    const tx = new web3_js_1.VersionedTransaction(msg);
    if (additionalSigners) {
        tx.sign(additionalSigners.filter((s) => s !== undefined));
    }
    return { tx, lastValidBlockHeight };
});
const buildAndSendTx = ({ provider, ixs, extraSigners, opts, debug, lookupTableAccounts, v0SignKeypair, v0SignCallback, }) => __awaiter(void 0, void 0, void 0, function* () {
    let tx;
    if (!(lookupTableAccounts === null || lookupTableAccounts === void 0 ? void 0 : lookupTableAccounts.length)) {
        //build legacy
        ({ tx } = yield (0, exponential_backoff_1.backOff)(() => _buildTx({
            connections: [provider.connection],
            feePayer: provider.publicKey,
            instructions: ixs,
            additionalSigners: extraSigners,
            
        }), {
            // Retry blockhash errors (happens during tests sometimes).
            retry: (e) => {
                return e.message.includes('blockhash');
            },
        }));
        try {
        const thang = yield provider.wallet.signTransaction(tx);
        const sig = yield provider.connection.sendRawTransaction(thang.serialize()) 
        yield provider.connection.confirmTransaction(sig, 'confirmed');
        return sig
        }
        catch (e) {
            console.error('❌ FAILED TO SEND TX, FULL ERROR: ❌');
            console.error(e);
            throw e; 
        }
        //console.log('test signing',provider.wallet.signTransaction(tx))
    }
    else {
        //build v0
        ({ tx } = yield (0, exponential_backoff_1.backOff)(() => _buildTxV0({
            connections: [provider.connection],
            instructions: ixs,
            //have to add TEST_KEYPAIR here instead of wallet.signTx() since partialSign not impl on v0 txs
            additionalSigners: [
                ...(v0SignKeypair ? [v0SignKeypair] : []),
                ...(extraSigners !== null && extraSigners !== void 0 ? extraSigners : []),
            ],
            feePayer: provider.publicKey,
            addressLookupTableAccs: lookupTableAccounts,
        }), {
            // Retry blockhash errors (happens during tests sometimes).
            retry: (e) => {
                return e.message.includes('blockhash');
            },
        }));
        if (v0SignCallback) {
            yield v0SignCallback(tx);
        }
    }
    try {
        console.log('transaction',tx)
        if (debug)
            opts = Object.assign(Object.assign({}, opts), { commitment: 'confirmed' });
        const sig = yield provider.connection.sendRawTransaction(tx.serialize(), opts);
        yield provider.connection.confirmTransaction(sig, 'confirmed');
        if (debug) {
            console.log(yield provider.connection.getTransaction(sig, {
                commitment: 'confirmed',
            }));
        }
        //return sig;
    }
    catch (e) {
        //this is needed to see program error logs
        console.error('❌ FAILED TO SEND TX, FULL ERROR: ❌');
        console.error(e);
        throw e;
    }
});
exports.buildAndSendTx = buildAndSendTx;
const getTotalComputeIxs = (compute, priorityMicroLamports = 1) => {
    const modifyComputeUnits = web3_js_1.ComputeBudgetProgram.setComputeUnitLimit({
        units: compute,
    });
    const addPriorityFee = web3_js_1.ComputeBudgetProgram.setComputeUnitPrice({
        microLamports: priorityMicroLamports,
    });
    return [modifyComputeUnits, addPriorityFee];
};
exports.getTotalComputeIxs = getTotalComputeIxs;
const _createFundedWallet = (provider, sol = 1000) => __awaiter(void 0, void 0, void 0, function* () {
    const keypair = web3_js_1.Keypair.generate();
    //airdrops are funky, best to move from provider wallet
    const tx = new web3_js_1.Transaction().add(web3_js_1.SystemProgram.transfer({
        fromPubkey: provider.publicKey,
        toPubkey: keypair.publicKey,
        lamports: sol * web3_js_1.LAMPORTS_PER_SOL,
    }));
    yield (0, exports.buildAndSendTx)({ provider, ixs: tx.instructions });
    return keypair;
});
const _createAndMintPNft = ({ provider, owner, mint, royaltyBps, creators, collection, collectionVerified = true, ruleSet = null, }) => __awaiter(void 0, void 0, void 0, function* () {
    // --------------------------------------- create
    var _a;
    // metadata account
    const [metadata] = yield web3_js_1.PublicKey.findProgramAddress([
        Buffer.from('metadata'),
        mpl_token_metadata_1.PROGRAM_ID.toBuffer(),
        mint.publicKey.toBuffer(),
    ], mpl_token_metadata_1.PROGRAM_ID);
    // master edition account
    const [masterEdition] = yield web3_js_1.PublicKey.findProgramAddress([
        Buffer.from('metadata'),
        mpl_token_metadata_1.PROGRAM_ID.toBuffer(),
        mint.publicKey.toBuffer(),
        Buffer.from('edition'),
    ], mpl_token_metadata_1.PROGRAM_ID);
    const accounts = {
        metadata,
        masterEdition,
        mint: mint.publicKey,
        authority: owner.publicKey,
        payer: owner.publicKey,
        splTokenProgram: spl_token_1.TOKEN_PROGRAM_ID,
        sysvarInstructions: web3_js_1.SYSVAR_INSTRUCTIONS_PUBKEY,
        updateAuthority: owner.publicKey,
    };
    const args = {
        createArgs: {
            __kind: 'V1',
            assetData: {
                name: 'Whatever',
                symbol: 'TSR',
                uri: 'https://www.tensor.trade',
                sellerFeeBasisPoints: royaltyBps !== null && royaltyBps !== void 0 ? royaltyBps : 0,
                creators: (_a = creators === null || creators === void 0 ? void 0 : creators.map((c) => {
                    return {
                        address: c.address,
                        share: c.share,
                        verified: false, //done manually below
                    };
                })) !== null && _a !== void 0 ? _a : null,
                primarySaleHappened: true,
                isMutable: true,
                tokenStandard: mpl_token_metadata_1.TokenStandard.ProgrammableNonFungible,
                collection: collection
                    ? { verified: collectionVerified, key: collection.publicKey }
                    : null,
                uses: null,
                collectionDetails: null,
                ruleSet,
            },
            decimals: 0,
            printSupply: { __kind: 'Zero' },
        },
    };
    const createIx = (0, mpl_token_metadata_1.createCreateInstruction)(accounts, args);
    // this test always initializes the mint, we we need to set the
    // account to be writable and a signer
    for (let i = 0; i < createIx.keys.length; i++) {
        if (createIx.keys[i].pubkey.toBase58() === mint.publicKey.toBase58()) {
            createIx.keys[i].isSigner = true;
            createIx.keys[i].isWritable = true;
        }
    }
    // --------------------------------------- mint
    // mint instrution will initialize a ATA account
    const [tokenPda] = yield web3_js_1.PublicKey.findProgramAddress([
        owner.publicKey.toBuffer(),
        spl_token_1.TOKEN_PROGRAM_ID.toBuffer(),
        mint.publicKey.toBuffer(),
    ], spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID);
    const [tokenRecord] = yield (0, exports.findTokenRecordPDA)(mint.publicKey, tokenPda);
    const mintAcccounts = {
        token: tokenPda,
        tokenOwner: owner.publicKey,
        metadata,
        masterEdition,
        tokenRecord,
        mint: mint.publicKey,
        payer: owner.publicKey,
        authority: owner.publicKey,
        sysvarInstructions: web3_js_1.SYSVAR_INSTRUCTIONS_PUBKEY,
        splAtaProgram: spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID,
        splTokenProgram: spl_token_1.TOKEN_PROGRAM_ID,
        authorizationRules: ruleSet !== null && ruleSet !== void 0 ? ruleSet : undefined,
        authorizationRulesProgram: mpl_token_auth_rules_1.PROGRAM_ID,
    };
    const payload = {
        map: new Map(),
    };
    const mintArgs = {
        mintArgs: {
            __kind: 'V1',
            amount: 1,
            authorizationData: {
                payload: payload,
            },
        },
    };
    const mintIx = (0, mpl_token_metadata_1.createMintInstruction)(mintAcccounts, mintArgs);
    // --------------------------------------- send
    yield (0, exports.buildAndSendTx)({
        provider,
        ixs: [createIx, mintIx],
        extraSigners: [owner, mint],
    });
    //manually verify creators (auto doesn't work)
    const creatorSigners = creators
        .map((c) => c.authority)
        .filter((s) => !!s);
    const metaplex = new js_1.Metaplex(provider.connection);
    yield Promise.all(creatorSigners.map((s) => __awaiter(void 0, void 0, void 0, function* () {
        yield metaplex
            .use((0, js_1.keypairIdentity)(s))
            .nfts()
            .verifyCreator({ mintAddress: mint.publicKey, creator: s });
    })));
    return {
        tokenAddress: tokenPda,
        metadataAddress: metadata,
        masterEditionAddress: masterEdition,
    };
});
const createAndFundATA = ({ provider, owner, mint, royaltyBps, creators, collection, collectionVerified, programmable = false, ruleSetAddr, }) => __awaiter(void 0, void 0, void 0, function* () {
    const usedOwner = owner !== null && owner !== void 0 ? owner : (yield _createFundedWallet(provider));
    const usedMint = mint !== null && mint !== void 0 ? mint : web3_js_1.Keypair.generate();
    const mplex = new js_1.Metaplex(provider.connection).use((0, js_1.keypairIdentity)(usedOwner));
    //create a verified collection
    if (collection) {
        yield mplex.nfts().create({
            useNewMint: collection,
            tokenOwner: usedOwner.publicKey,
            uri: 'https://www.tensor.trade',
            name: 'Whatever',
            sellerFeeBasisPoints: royaltyBps !== null && royaltyBps !== void 0 ? royaltyBps : 0,
            isCollection: true,
            collectionIsSized: true,
        });
        // console.log(
        //   "coll",
        //   await mplex.nfts().findByMint({ mintAddress: collection.publicKey })
        // );
    }
    let metadataAddress, tokenAddress, masterEditionAddress;
    if (programmable) {
        //create programmable nft
        ({ metadataAddress, tokenAddress, masterEditionAddress } =
            yield _createAndMintPNft({
                provider,
                mint: usedMint,
                owner: usedOwner,
                royaltyBps,
                creators,
                collection,
                collectionVerified,
                ruleSet: ruleSetAddr,
            }));
    }
    else {
        //create normal nft
        ({ metadataAddress, tokenAddress, masterEditionAddress } = yield mplex
            .nfts()
            .create({
            useNewMint: usedMint,
            tokenOwner: usedOwner.publicKey,
            uri: 'https://www.tensor.trade',
            name: 'Whatever',
            sellerFeeBasisPoints: royaltyBps !== null && royaltyBps !== void 0 ? royaltyBps : 0,
            creators,
            maxSupply: (0, js_1.toBigNumber)(1),
            collection: collection === null || collection === void 0 ? void 0 : collection.publicKey,
        }));
        if (collection && collectionVerified) {
            yield mplex.nfts().verifyCollection({
                mintAddress: usedMint.publicKey,
                collectionMintAddress: collection.publicKey,
            });
        }
    }
    // console.log(
    //   "nft",
    //   await mplex.nfts().findByMint({ mintAddress: usedMint.publicKey })
    // );
    return {
        mint: usedMint.publicKey,
        ata: tokenAddress,
        owner: usedOwner,
        metadata: metadataAddress,
        masterEdition: masterEditionAddress,
    };
});
exports.createAndFundATA = createAndFundATA;
const createTokenAuthorizationRules = (provider, payer, name = 'a', //keep it short or we wont have space for tx to pass
data) => __awaiter(void 0, void 0, void 0, function* () {
    const [ruleSetAddress] = yield (0, exports.findRuleSetPDA)(payer.publicKey, name);
    //ruleset relevant for transfers
    const ruleSet = {
        libVersion: 1,
        ruleSetName: name,
        owner: Array.from(payer.publicKey.toBytes()),
        operations: {
            'Delegate:Transfer': {
                ProgramOwnedList: {
                    programs: [Array.from(index_1.GEM_BANK_PROG_ID.toBytes())],
                    field: 'Delegate',
                },
            },
            'Transfer:Owner': {
                All: {
                    rules: [
                        //no space
                        // {
                        //   Amount: {
                        //     amount: 1,
                        //     operator: "Eq",
                        //     field: "Amount",
                        //   },
                        // },
                        {
                            Any: {
                                rules: [
                                    {
                                        ProgramOwnedList: {
                                            programs: [Array.from(index_1.GEM_BANK_PROG_ID.toBytes())],
                                            field: 'Source',
                                        },
                                    },
                                    {
                                        ProgramOwnedList: {
                                            programs: [Array.from(index_1.GEM_BANK_PROG_ID.toBytes())],
                                            field: 'Destination',
                                        },
                                    },
                                    {
                                        ProgramOwnedList: {
                                            programs: [Array.from(index_1.GEM_BANK_PROG_ID.toBytes())],
                                            field: 'Authority',
                                        },
                                    },
                                ],
                            },
                        },
                    ],
                },
            },
            'Transfer:TransferDelegate': {
                All: {
                    rules: [
                        //no space
                        // {
                        //   Amount: {
                        //     amount: 1,
                        //     operator: "Eq",
                        //     field: "Amount",
                        //   },
                        // },
                        {
                            Any: {
                                rules: [
                                    {
                                        ProgramOwnedList: {
                                            programs: [Array.from(index_1.GEM_BANK_PROG_ID.toBytes())],
                                            field: 'Source',
                                        },
                                    },
                                    {
                                        ProgramOwnedList: {
                                            programs: [Array.from(index_1.GEM_BANK_PROG_ID.toBytes())],
                                            field: 'Destination',
                                        },
                                    },
                                    {
                                        ProgramOwnedList: {
                                            programs: [Array.from(index_1.GEM_BANK_PROG_ID.toBytes())],
                                            field: 'Authority',
                                        },
                                    },
                                ],
                            },
                        },
                    ],
                },
            },
        },
    };
    // Encode the file using msgpack so the pre-encoded data can be written directly to a Solana program account
    let finalData = data !== null && data !== void 0 ? data : (0, msgpack_1.encode)(ruleSet);
    let createIX = (0, mpl_token_auth_rules_1.createCreateOrUpdateInstruction)({
        payer: payer.publicKey,
        ruleSetPda: ruleSetAddress,
        systemProgram: web3_js_1.SystemProgram.programId,
    }, {
        createOrUpdateArgs: { __kind: 'V1', serializedRuleSet: finalData },
    }, mpl_token_auth_rules_1.PROGRAM_ID);
    yield (0, exports.buildAndSendTx)({ provider, ixs: [createIX], extraSigners: [payer] });
    return ruleSetAddress;
});
exports.createTokenAuthorizationRules = createTokenAuthorizationRules;
const createCoreGemLUT = (provider) => __awaiter(void 0, void 0, void 0, function* () {
    //intentionally going for > confirmed, otherwise get "is not a recent slot err"
    const slot = yield provider.connection.getSlot('finalized');
    //create
    const [lookupTableInst, lookupTableAddress] = web3_js_1.AddressLookupTableProgram.createLookupTable({
        authority: provider.publicKey,
        payer: provider.publicKey,
        recentSlot: slot,
    });
    //see if already created
    let lookupTableAccount = (yield provider.connection.getAddressLookupTable(lookupTableAddress)).value;
    if (!!lookupTableAccount) {
        console.log('table already exists', lookupTableAddress.toBase58());
        return lookupTableAccount;
    }
    console.log('creating fresh lut');
    //add addresses
    const extendInstruction = web3_js_1.AddressLookupTableProgram.extendLookupTable({
        payer: provider.publicKey,
        authority: provider.publicKey,
        lookupTable: lookupTableAddress,
        addresses: [
            spl_token_1.TOKEN_PROGRAM_ID,
            web3_js_1.SystemProgram.programId,
            web3_js_1.SYSVAR_RENT_PUBKEY,
            spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID,
            mpl_token_auth_rules_1.PROGRAM_ID,
            mpl_token_metadata_1.PROGRAM_ID,
            web3_js_1.SYSVAR_INSTRUCTIONS_PUBKEY,
        ],
    });
    yield (0, exports.buildAndSendTx)({ provider, ixs: [lookupTableInst, extendInstruction] });
    //fetch
    lookupTableAccount = (yield provider.connection.getAddressLookupTable(lookupTableAddress)).value;
    return lookupTableAccount;
});
exports.createCoreGemLUT = createCoreGemLUT;
