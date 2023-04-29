import * as anchor from '@project-serum/anchor';
import { BN, Idl } from '@project-serum/anchor';
import { Connection, Keypair, PublicKey, TransactionInstruction } from '@solana/web3.js';
import { GemFarm } from '../types/gem_farm';
import { GemBankClient, WhitelistType } from '../gem-bank';
export declare const feeAccount: anchor.web3.PublicKey;
export declare const RewardType: {
    Variable: {
        variable: {};
    };
    Fixed: {
        fixed: {};
    };
};
export interface FarmConfig {
    minStakingPeriodSec: BN;
    cooldownPeriodSec: BN;
    unstakingFeeLamp: BN;
}
export interface MaxCounts {
    maxFarmers: number;
    maxGems: number;
    maxRarityPoints: number;
}
export interface TierConfig {
    rewardRate: BN;
    requiredTenure: BN;
}
export interface FixedRateSchedule {
    baseRate: BN;
    tier1: TierConfig | null;
    tier2: TierConfig | null;
    tier3: TierConfig | null;
    denominator: BN;
}
export interface FixedRateConfig {
    schedule: FixedRateSchedule;
    amount: BN;
    durationSec: BN;
}
export interface VariableRateConfig {
    amount: BN;
    durationSec: BN;
}
export interface RarityConfig {
    mint: PublicKey;
    rarityPoints: number;
}
export declare class GemFarmClient extends GemBankClient {
    farmProgram: anchor.Program<GemFarm>;
    constructor(conn: Connection, wallet: anchor.Wallet, farmIdl?: Idl, farmProgramId?: PublicKey, bankIdl?: Idl, bankProgramId?: PublicKey);
    setFarmProgram(idl?: Idl, programId?: PublicKey): void;
    fetchFarmAcc(farm: PublicKey): Promise<{
        authorizedFunder: anchor.web3.PublicKey;
        farm: anchor.web3.PublicKey;
        reserved: number[] | number[] | number[];
        identity: anchor.web3.PublicKey;
        vault: anchor.web3.PublicKey;
        state: {
            unstaked?: Record<string, never>;
            staked?: Record<string, never>;
            pendingCooldown?: Record<string, never>;
        };
        gemsStaked: anchor.BN;
        rarityPointsStaked: anchor.BN;
        minStakingEndsTs: anchor.BN;
        cooldownEndsTs: anchor.BN;
        rewardA: {
            paidOutReward: anchor.BN;
            accruedReward: anchor.BN;
            variableRate: {
                lastRecordedAccruedRewardPerRarityPoint: {
                    n: anchor.BN;
                };
                reserved: number[];
            };
            fixedRate: {
                beginStakingTs: anchor.BN;
                beginScheduleTs: anchor.BN;
                lastUpdatedTs: anchor.BN;
                promisedSchedule: {
                    baseRate: anchor.BN;
                    tier1: {
                        rewardRate: anchor.BN;
                        requiredTenure: anchor.BN;
                    };
                    tier2: {
                        rewardRate: anchor.BN;
                        requiredTenure: anchor.BN;
                    };
                    tier3: {
                        rewardRate: anchor.BN;
                        requiredTenure: anchor.BN;
                    };
                    denominator: anchor.BN;
                };
                promisedDuration: anchor.BN;
                reserved: number[];
            };
            reserved: number[];
        } | {
            rewardMint: anchor.web3.PublicKey;
            rewardPot: anchor.web3.PublicKey;
            rewardType: {
                variable?: Record<string, never>;
                fixed?: Record<string, never>;
            };
            fixedRate: {
                schedule: {
                    baseRate: anchor.BN;
                    tier1: {
                        rewardRate: anchor.BN;
                        requiredTenure: anchor.BN;
                    };
                    tier2: {
                        rewardRate: anchor.BN;
                        requiredTenure: anchor.BN;
                    };
                    tier3: {
                        rewardRate: anchor.BN;
                        requiredTenure: anchor.BN;
                    };
                    denominator: anchor.BN;
                };
                reservedAmount: anchor.BN;
                reserved: number[];
            };
            variableRate: {
                rewardRate: {
                    n: anchor.BN;
                };
                rewardLastUpdatedTs: anchor.BN;
                accruedRewardPerRarityPoint: {
                    n: anchor.BN;
                };
                reserved: number[];
            };
            funds: {
                totalFunded: anchor.BN;
                totalRefunded: anchor.BN;
                totalAccruedToStakers: anchor.BN;
            };
            times: {
                durationSec: anchor.BN;
                rewardEndTs: anchor.BN;
                lockEndTs: anchor.BN;
            };
            reserved: number[];
        };
        rewardB: {
            paidOutReward: anchor.BN;
            accruedReward: anchor.BN;
            variableRate: {
                lastRecordedAccruedRewardPerRarityPoint: {
                    n: anchor.BN;
                };
                reserved: number[];
            };
            fixedRate: {
                beginStakingTs: anchor.BN;
                beginScheduleTs: anchor.BN;
                lastUpdatedTs: anchor.BN;
                promisedSchedule: {
                    baseRate: anchor.BN;
                    tier1: {
                        rewardRate: anchor.BN;
                        requiredTenure: anchor.BN;
                    };
                    tier2: {
                        rewardRate: anchor.BN;
                        requiredTenure: anchor.BN;
                    };
                    tier3: {
                        rewardRate: anchor.BN;
                        requiredTenure: anchor.BN;
                    };
                    denominator: anchor.BN;
                };
                promisedDuration: anchor.BN;
                reserved: number[];
            };
            reserved: number[];
        } | {
            rewardMint: anchor.web3.PublicKey;
            rewardPot: anchor.web3.PublicKey;
            rewardType: {
                variable?: Record<string, never>;
                fixed?: Record<string, never>;
            };
            fixedRate: {
                schedule: {
                    baseRate: anchor.BN;
                    tier1: {
                        rewardRate: anchor.BN;
                        requiredTenure: anchor.BN;
                    };
                    tier2: {
                        rewardRate: anchor.BN;
                        requiredTenure: anchor.BN;
                    };
                    tier3: {
                        rewardRate: anchor.BN;
                        requiredTenure: anchor.BN;
                    };
                    denominator: anchor.BN;
                };
                reservedAmount: anchor.BN;
                reserved: number[];
            };
            variableRate: {
                rewardRate: {
                    n: anchor.BN;
                };
                rewardLastUpdatedTs: anchor.BN;
                accruedRewardPerRarityPoint: {
                    n: anchor.BN;
                };
                reserved: number[];
            };
            funds: {
                totalFunded: anchor.BN;
                totalRefunded: anchor.BN;
                totalAccruedToStakers: anchor.BN;
            };
            times: {
                durationSec: anchor.BN;
                rewardEndTs: anchor.BN;
                lockEndTs: anchor.BN;
            };
            reserved: number[];
        };
        version: number;
        farmManager: anchor.web3.PublicKey;
        farmTreasury: anchor.web3.PublicKey;
        farmAuthority: anchor.web3.PublicKey;
        farmAuthoritySeed: anchor.web3.PublicKey;
        farmAuthorityBumpSeed: number[];
        bank: anchor.web3.PublicKey;
        config: {
            minStakingPeriodSec: anchor.BN;
            cooldownPeriodSec: anchor.BN;
            unstakingFeeLamp: anchor.BN;
        };
        farmerCount: anchor.BN;
        stakedFarmerCount: anchor.BN;
        authorizedFunderCount: anchor.BN;
        maxCounts: {
            maxFarmers: number;
            maxGems: number;
            maxRarityPoints: number;
        };
        reserved2: number[];
        reserved3: number[];
    }>;
    fetchFarmerAcc(farmer: PublicKey): Promise<{
        authorizedFunder: anchor.web3.PublicKey;
        farm: anchor.web3.PublicKey;
        reserved: number[] | number[] | number[];
        identity: anchor.web3.PublicKey;
        vault: anchor.web3.PublicKey;
        state: {
            unstaked?: Record<string, never>;
            staked?: Record<string, never>;
            pendingCooldown?: Record<string, never>;
        };
        gemsStaked: anchor.BN;
        rarityPointsStaked: anchor.BN;
        minStakingEndsTs: anchor.BN;
        cooldownEndsTs: anchor.BN;
        rewardA: {
            paidOutReward: anchor.BN;
            accruedReward: anchor.BN;
            variableRate: {
                lastRecordedAccruedRewardPerRarityPoint: {
                    n: anchor.BN;
                };
                reserved: number[];
            };
            fixedRate: {
                beginStakingTs: anchor.BN;
                beginScheduleTs: anchor.BN;
                lastUpdatedTs: anchor.BN;
                promisedSchedule: {
                    baseRate: anchor.BN;
                    tier1: {
                        rewardRate: anchor.BN;
                        requiredTenure: anchor.BN;
                    };
                    tier2: {
                        rewardRate: anchor.BN;
                        requiredTenure: anchor.BN;
                    };
                    tier3: {
                        rewardRate: anchor.BN;
                        requiredTenure: anchor.BN;
                    };
                    denominator: anchor.BN;
                };
                promisedDuration: anchor.BN;
                reserved: number[];
            };
            reserved: number[];
        } | {
            rewardMint: anchor.web3.PublicKey;
            rewardPot: anchor.web3.PublicKey;
            rewardType: {
                variable?: Record<string, never>;
                fixed?: Record<string, never>;
            };
            fixedRate: {
                schedule: {
                    baseRate: anchor.BN;
                    tier1: {
                        rewardRate: anchor.BN;
                        requiredTenure: anchor.BN;
                    };
                    tier2: {
                        rewardRate: anchor.BN;
                        requiredTenure: anchor.BN;
                    };
                    tier3: {
                        rewardRate: anchor.BN;
                        requiredTenure: anchor.BN;
                    };
                    denominator: anchor.BN;
                };
                reservedAmount: anchor.BN;
                reserved: number[];
            };
            variableRate: {
                rewardRate: {
                    n: anchor.BN;
                };
                rewardLastUpdatedTs: anchor.BN;
                accruedRewardPerRarityPoint: {
                    n: anchor.BN;
                };
                reserved: number[];
            };
            funds: {
                totalFunded: anchor.BN;
                totalRefunded: anchor.BN;
                totalAccruedToStakers: anchor.BN;
            };
            times: {
                durationSec: anchor.BN;
                rewardEndTs: anchor.BN;
                lockEndTs: anchor.BN;
            };
            reserved: number[];
        };
        rewardB: {
            paidOutReward: anchor.BN;
            accruedReward: anchor.BN;
            variableRate: {
                lastRecordedAccruedRewardPerRarityPoint: {
                    n: anchor.BN;
                };
                reserved: number[];
            };
            fixedRate: {
                beginStakingTs: anchor.BN;
                beginScheduleTs: anchor.BN;
                lastUpdatedTs: anchor.BN;
                promisedSchedule: {
                    baseRate: anchor.BN;
                    tier1: {
                        rewardRate: anchor.BN;
                        requiredTenure: anchor.BN;
                    };
                    tier2: {
                        rewardRate: anchor.BN;
                        requiredTenure: anchor.BN;
                    };
                    tier3: {
                        rewardRate: anchor.BN;
                        requiredTenure: anchor.BN;
                    };
                    denominator: anchor.BN;
                };
                promisedDuration: anchor.BN;
                reserved: number[];
            };
            reserved: number[];
        } | {
            rewardMint: anchor.web3.PublicKey;
            rewardPot: anchor.web3.PublicKey;
            rewardType: {
                variable?: Record<string, never>;
                fixed?: Record<string, never>;
            };
            fixedRate: {
                schedule: {
                    baseRate: anchor.BN;
                    tier1: {
                        rewardRate: anchor.BN;
                        requiredTenure: anchor.BN;
                    };
                    tier2: {
                        rewardRate: anchor.BN;
                        requiredTenure: anchor.BN;
                    };
                    tier3: {
                        rewardRate: anchor.BN;
                        requiredTenure: anchor.BN;
                    };
                    denominator: anchor.BN;
                };
                reservedAmount: anchor.BN;
                reserved: number[];
            };
            variableRate: {
                rewardRate: {
                    n: anchor.BN;
                };
                rewardLastUpdatedTs: anchor.BN;
                accruedRewardPerRarityPoint: {
                    n: anchor.BN;
                };
                reserved: number[];
            };
            funds: {
                totalFunded: anchor.BN;
                totalRefunded: anchor.BN;
                totalAccruedToStakers: anchor.BN;
            };
            times: {
                durationSec: anchor.BN;
                rewardEndTs: anchor.BN;
                lockEndTs: anchor.BN;
            };
            reserved: number[];
        };
        version: number;
        farmManager: anchor.web3.PublicKey;
        farmTreasury: anchor.web3.PublicKey;
        farmAuthority: anchor.web3.PublicKey;
        farmAuthoritySeed: anchor.web3.PublicKey;
        farmAuthorityBumpSeed: number[];
        bank: anchor.web3.PublicKey;
        config: {
            minStakingPeriodSec: anchor.BN;
            cooldownPeriodSec: anchor.BN;
            unstakingFeeLamp: anchor.BN;
        };
        farmerCount: anchor.BN;
        stakedFarmerCount: anchor.BN;
        authorizedFunderCount: anchor.BN;
        maxCounts: {
            maxFarmers: number;
            maxGems: number;
            maxRarityPoints: number;
        };
        reserved2: number[];
        reserved3: number[];
    }>;
    fetchAuthorizationProofAcc(authorizationProof: PublicKey): Promise<{
        authorizedFunder: anchor.web3.PublicKey;
        farm: anchor.web3.PublicKey;
        reserved: number[] | number[] | number[];
        identity: anchor.web3.PublicKey;
        vault: anchor.web3.PublicKey;
        state: {
            unstaked?: Record<string, never>;
            staked?: Record<string, never>;
            pendingCooldown?: Record<string, never>;
        };
        gemsStaked: anchor.BN;
        rarityPointsStaked: anchor.BN;
        minStakingEndsTs: anchor.BN;
        cooldownEndsTs: anchor.BN;
        rewardA: {
            paidOutReward: anchor.BN;
            accruedReward: anchor.BN;
            variableRate: {
                lastRecordedAccruedRewardPerRarityPoint: {
                    n: anchor.BN;
                };
                reserved: number[];
            };
            fixedRate: {
                beginStakingTs: anchor.BN;
                beginScheduleTs: anchor.BN;
                lastUpdatedTs: anchor.BN;
                promisedSchedule: {
                    baseRate: anchor.BN;
                    tier1: {
                        rewardRate: anchor.BN;
                        requiredTenure: anchor.BN;
                    };
                    tier2: {
                        rewardRate: anchor.BN;
                        requiredTenure: anchor.BN;
                    };
                    tier3: {
                        rewardRate: anchor.BN;
                        requiredTenure: anchor.BN;
                    };
                    denominator: anchor.BN;
                };
                promisedDuration: anchor.BN;
                reserved: number[];
            };
            reserved: number[];
        } | {
            rewardMint: anchor.web3.PublicKey;
            rewardPot: anchor.web3.PublicKey;
            rewardType: {
                variable?: Record<string, never>;
                fixed?: Record<string, never>;
            };
            fixedRate: {
                schedule: {
                    baseRate: anchor.BN;
                    tier1: {
                        rewardRate: anchor.BN;
                        requiredTenure: anchor.BN;
                    };
                    tier2: {
                        rewardRate: anchor.BN;
                        requiredTenure: anchor.BN;
                    };
                    tier3: {
                        rewardRate: anchor.BN;
                        requiredTenure: anchor.BN;
                    };
                    denominator: anchor.BN;
                };
                reservedAmount: anchor.BN;
                reserved: number[];
            };
            variableRate: {
                rewardRate: {
                    n: anchor.BN;
                };
                rewardLastUpdatedTs: anchor.BN;
                accruedRewardPerRarityPoint: {
                    n: anchor.BN;
                };
                reserved: number[];
            };
            funds: {
                totalFunded: anchor.BN;
                totalRefunded: anchor.BN;
                totalAccruedToStakers: anchor.BN;
            };
            times: {
                durationSec: anchor.BN;
                rewardEndTs: anchor.BN;
                lockEndTs: anchor.BN;
            };
            reserved: number[];
        };
        rewardB: {
            paidOutReward: anchor.BN;
            accruedReward: anchor.BN;
            variableRate: {
                lastRecordedAccruedRewardPerRarityPoint: {
                    n: anchor.BN;
                };
                reserved: number[];
            };
            fixedRate: {
                beginStakingTs: anchor.BN;
                beginScheduleTs: anchor.BN;
                lastUpdatedTs: anchor.BN;
                promisedSchedule: {
                    baseRate: anchor.BN;
                    tier1: {
                        rewardRate: anchor.BN;
                        requiredTenure: anchor.BN;
                    };
                    tier2: {
                        rewardRate: anchor.BN;
                        requiredTenure: anchor.BN;
                    };
                    tier3: {
                        rewardRate: anchor.BN;
                        requiredTenure: anchor.BN;
                    };
                    denominator: anchor.BN;
                };
                promisedDuration: anchor.BN;
                reserved: number[];
            };
            reserved: number[];
        } | {
            rewardMint: anchor.web3.PublicKey;
            rewardPot: anchor.web3.PublicKey;
            rewardType: {
                variable?: Record<string, never>;
                fixed?: Record<string, never>;
            };
            fixedRate: {
                schedule: {
                    baseRate: anchor.BN;
                    tier1: {
                        rewardRate: anchor.BN;
                        requiredTenure: anchor.BN;
                    };
                    tier2: {
                        rewardRate: anchor.BN;
                        requiredTenure: anchor.BN;
                    };
                    tier3: {
                        rewardRate: anchor.BN;
                        requiredTenure: anchor.BN;
                    };
                    denominator: anchor.BN;
                };
                reservedAmount: anchor.BN;
                reserved: number[];
            };
            variableRate: {
                rewardRate: {
                    n: anchor.BN;
                };
                rewardLastUpdatedTs: anchor.BN;
                accruedRewardPerRarityPoint: {
                    n: anchor.BN;
                };
                reserved: number[];
            };
            funds: {
                totalFunded: anchor.BN;
                totalRefunded: anchor.BN;
                totalAccruedToStakers: anchor.BN;
            };
            times: {
                durationSec: anchor.BN;
                rewardEndTs: anchor.BN;
                lockEndTs: anchor.BN;
            };
            reserved: number[];
        };
        version: number;
        farmManager: anchor.web3.PublicKey;
        farmTreasury: anchor.web3.PublicKey;
        farmAuthority: anchor.web3.PublicKey;
        farmAuthoritySeed: anchor.web3.PublicKey;
        farmAuthorityBumpSeed: number[];
        bank: anchor.web3.PublicKey;
        config: {
            minStakingPeriodSec: anchor.BN;
            cooldownPeriodSec: anchor.BN;
            unstakingFeeLamp: anchor.BN;
        };
        farmerCount: anchor.BN;
        stakedFarmerCount: anchor.BN;
        authorizedFunderCount: anchor.BN;
        maxCounts: {
            maxFarmers: number;
            maxGems: number;
            maxRarityPoints: number;
        };
        reserved2: number[];
        reserved3: number[];
    }>;
    fetchTokenAcc(rewardMint: PublicKey, rewardAcc: PublicKey): Promise<AccountInfo>;
    fetchTreasuryBalance(farm: PublicKey): Promise<number>;
    fetchAllFarmPDAs(manager?: PublicKey): Promise<anchor.ProgramAccount<{
        authorizedFunder: anchor.web3.PublicKey;
        farm: anchor.web3.PublicKey;
        reserved: number[] | number[] | number[];
        identity: anchor.web3.PublicKey;
        vault: anchor.web3.PublicKey;
        state: {
            unstaked?: Record<string, never>;
            staked?: Record<string, never>;
            pendingCooldown?: Record<string, never>;
        };
        gemsStaked: anchor.BN;
        rarityPointsStaked: anchor.BN;
        minStakingEndsTs: anchor.BN;
        cooldownEndsTs: anchor.BN;
        rewardA: {
            paidOutReward: anchor.BN;
            accruedReward: anchor.BN;
            variableRate: {
                lastRecordedAccruedRewardPerRarityPoint: {
                    n: anchor.BN;
                };
                reserved: number[];
            };
            fixedRate: {
                beginStakingTs: anchor.BN;
                beginScheduleTs: anchor.BN;
                lastUpdatedTs: anchor.BN;
                promisedSchedule: {
                    baseRate: anchor.BN;
                    tier1: {
                        rewardRate: anchor.BN;
                        requiredTenure: anchor.BN;
                    };
                    tier2: {
                        rewardRate: anchor.BN;
                        requiredTenure: anchor.BN;
                    };
                    tier3: {
                        rewardRate: anchor.BN;
                        requiredTenure: anchor.BN;
                    };
                    denominator: anchor.BN;
                };
                promisedDuration: anchor.BN;
                reserved: number[];
            };
            reserved: number[];
        } | {
            rewardMint: anchor.web3.PublicKey;
            rewardPot: anchor.web3.PublicKey;
            rewardType: {
                variable?: Record<string, never>;
                fixed?: Record<string, never>;
            };
            fixedRate: {
                schedule: {
                    baseRate: anchor.BN;
                    tier1: {
                        rewardRate: anchor.BN;
                        requiredTenure: anchor.BN;
                    };
                    tier2: {
                        rewardRate: anchor.BN;
                        requiredTenure: anchor.BN;
                    };
                    tier3: {
                        rewardRate: anchor.BN;
                        requiredTenure: anchor.BN;
                    };
                    denominator: anchor.BN;
                };
                reservedAmount: anchor.BN;
                reserved: number[];
            };
            variableRate: {
                rewardRate: {
                    n: anchor.BN;
                };
                rewardLastUpdatedTs: anchor.BN;
                accruedRewardPerRarityPoint: {
                    n: anchor.BN;
                };
                reserved: number[];
            };
            funds: {
                totalFunded: anchor.BN;
                totalRefunded: anchor.BN;
                totalAccruedToStakers: anchor.BN;
            };
            times: {
                durationSec: anchor.BN;
                rewardEndTs: anchor.BN;
                lockEndTs: anchor.BN;
            };
            reserved: number[];
        };
        rewardB: {
            paidOutReward: anchor.BN;
            accruedReward: anchor.BN;
            variableRate: {
                lastRecordedAccruedRewardPerRarityPoint: {
                    n: anchor.BN;
                };
                reserved: number[];
            };
            fixedRate: {
                beginStakingTs: anchor.BN;
                beginScheduleTs: anchor.BN;
                lastUpdatedTs: anchor.BN;
                promisedSchedule: {
                    baseRate: anchor.BN;
                    tier1: {
                        rewardRate: anchor.BN;
                        requiredTenure: anchor.BN;
                    };
                    tier2: {
                        rewardRate: anchor.BN;
                        requiredTenure: anchor.BN;
                    };
                    tier3: {
                        rewardRate: anchor.BN;
                        requiredTenure: anchor.BN;
                    };
                    denominator: anchor.BN;
                };
                promisedDuration: anchor.BN;
                reserved: number[];
            };
            reserved: number[];
        } | {
            rewardMint: anchor.web3.PublicKey;
            rewardPot: anchor.web3.PublicKey;
            rewardType: {
                variable?: Record<string, never>;
                fixed?: Record<string, never>;
            };
            fixedRate: {
                schedule: {
                    baseRate: anchor.BN;
                    tier1: {
                        rewardRate: anchor.BN;
                        requiredTenure: anchor.BN;
                    };
                    tier2: {
                        rewardRate: anchor.BN;
                        requiredTenure: anchor.BN;
                    };
                    tier3: {
                        rewardRate: anchor.BN;
                        requiredTenure: anchor.BN;
                    };
                    denominator: anchor.BN;
                };
                reservedAmount: anchor.BN;
                reserved: number[];
            };
            variableRate: {
                rewardRate: {
                    n: anchor.BN;
                };
                rewardLastUpdatedTs: anchor.BN;
                accruedRewardPerRarityPoint: {
                    n: anchor.BN;
                };
                reserved: number[];
            };
            funds: {
                totalFunded: anchor.BN;
                totalRefunded: anchor.BN;
                totalAccruedToStakers: anchor.BN;
            };
            times: {
                durationSec: anchor.BN;
                rewardEndTs: anchor.BN;
                lockEndTs: anchor.BN;
            };
            reserved: number[];
        };
        version: number;
        farmManager: anchor.web3.PublicKey;
        farmTreasury: anchor.web3.PublicKey;
        farmAuthority: anchor.web3.PublicKey;
        farmAuthoritySeed: anchor.web3.PublicKey;
        farmAuthorityBumpSeed: number[];
        bank: anchor.web3.PublicKey;
        config: {
            minStakingPeriodSec: anchor.BN;
            cooldownPeriodSec: anchor.BN;
            unstakingFeeLamp: anchor.BN;
        };
        farmerCount: anchor.BN;
        stakedFarmerCount: anchor.BN;
        authorizedFunderCount: anchor.BN;
        maxCounts: {
            maxFarmers: number;
            maxGems: number;
            maxRarityPoints: number;
        };
        reserved2: number[];
        reserved3: number[];
    }>[]>;
    fetchAllFarmerPDAs(farm?: PublicKey, identity?: PublicKey): Promise<anchor.ProgramAccount<{
        authorizedFunder: anchor.web3.PublicKey;
        farm: anchor.web3.PublicKey;
        reserved: number[] | number[] | number[];
        identity: anchor.web3.PublicKey;
        vault: anchor.web3.PublicKey;
        state: {
            unstaked?: Record<string, never>;
            staked?: Record<string, never>;
            pendingCooldown?: Record<string, never>;
        };
        gemsStaked: anchor.BN;
        rarityPointsStaked: anchor.BN;
        minStakingEndsTs: anchor.BN;
        cooldownEndsTs: anchor.BN;
        rewardA: {
            paidOutReward: anchor.BN;
            accruedReward: anchor.BN;
            variableRate: {
                lastRecordedAccruedRewardPerRarityPoint: {
                    n: anchor.BN;
                };
                reserved: number[];
            };
            fixedRate: {
                beginStakingTs: anchor.BN;
                beginScheduleTs: anchor.BN;
                lastUpdatedTs: anchor.BN;
                promisedSchedule: {
                    baseRate: anchor.BN;
                    tier1: {
                        rewardRate: anchor.BN;
                        requiredTenure: anchor.BN;
                    };
                    tier2: {
                        rewardRate: anchor.BN;
                        requiredTenure: anchor.BN;
                    };
                    tier3: {
                        rewardRate: anchor.BN;
                        requiredTenure: anchor.BN;
                    };
                    denominator: anchor.BN;
                };
                promisedDuration: anchor.BN;
                reserved: number[];
            };
            reserved: number[];
        } | {
            rewardMint: anchor.web3.PublicKey;
            rewardPot: anchor.web3.PublicKey;
            rewardType: {
                variable?: Record<string, never>;
                fixed?: Record<string, never>;
            };
            fixedRate: {
                schedule: {
                    baseRate: anchor.BN;
                    tier1: {
                        rewardRate: anchor.BN;
                        requiredTenure: anchor.BN;
                    };
                    tier2: {
                        rewardRate: anchor.BN;
                        requiredTenure: anchor.BN;
                    };
                    tier3: {
                        rewardRate: anchor.BN;
                        requiredTenure: anchor.BN;
                    };
                    denominator: anchor.BN;
                };
                reservedAmount: anchor.BN;
                reserved: number[];
            };
            variableRate: {
                rewardRate: {
                    n: anchor.BN;
                };
                rewardLastUpdatedTs: anchor.BN;
                accruedRewardPerRarityPoint: {
                    n: anchor.BN;
                };
                reserved: number[];
            };
            funds: {
                totalFunded: anchor.BN;
                totalRefunded: anchor.BN;
                totalAccruedToStakers: anchor.BN;
            };
            times: {
                durationSec: anchor.BN;
                rewardEndTs: anchor.BN;
                lockEndTs: anchor.BN;
            };
            reserved: number[];
        };
        rewardB: {
            paidOutReward: anchor.BN;
            accruedReward: anchor.BN;
            variableRate: {
                lastRecordedAccruedRewardPerRarityPoint: {
                    n: anchor.BN;
                };
                reserved: number[];
            };
            fixedRate: {
                beginStakingTs: anchor.BN;
                beginScheduleTs: anchor.BN;
                lastUpdatedTs: anchor.BN;
                promisedSchedule: {
                    baseRate: anchor.BN;
                    tier1: {
                        rewardRate: anchor.BN;
                        requiredTenure: anchor.BN;
                    };
                    tier2: {
                        rewardRate: anchor.BN;
                        requiredTenure: anchor.BN;
                    };
                    tier3: {
                        rewardRate: anchor.BN;
                        requiredTenure: anchor.BN;
                    };
                    denominator: anchor.BN;
                };
                promisedDuration: anchor.BN;
                reserved: number[];
            };
            reserved: number[];
        } | {
            rewardMint: anchor.web3.PublicKey;
            rewardPot: anchor.web3.PublicKey;
            rewardType: {
                variable?: Record<string, never>;
                fixed?: Record<string, never>;
            };
            fixedRate: {
                schedule: {
                    baseRate: anchor.BN;
                    tier1: {
                        rewardRate: anchor.BN;
                        requiredTenure: anchor.BN;
                    };
                    tier2: {
                        rewardRate: anchor.BN;
                        requiredTenure: anchor.BN;
                    };
                    tier3: {
                        rewardRate: anchor.BN;
                        requiredTenure: anchor.BN;
                    };
                    denominator: anchor.BN;
                };
                reservedAmount: anchor.BN;
                reserved: number[];
            };
            variableRate: {
                rewardRate: {
                    n: anchor.BN;
                };
                rewardLastUpdatedTs: anchor.BN;
                accruedRewardPerRarityPoint: {
                    n: anchor.BN;
                };
                reserved: number[];
            };
            funds: {
                totalFunded: anchor.BN;
                totalRefunded: anchor.BN;
                totalAccruedToStakers: anchor.BN;
            };
            times: {
                durationSec: anchor.BN;
                rewardEndTs: anchor.BN;
                lockEndTs: anchor.BN;
            };
            reserved: number[];
        };
        version: number;
        farmManager: anchor.web3.PublicKey;
        farmTreasury: anchor.web3.PublicKey;
        farmAuthority: anchor.web3.PublicKey;
        farmAuthoritySeed: anchor.web3.PublicKey;
        farmAuthorityBumpSeed: number[];
        bank: anchor.web3.PublicKey;
        config: {
            minStakingPeriodSec: anchor.BN;
            cooldownPeriodSec: anchor.BN;
            unstakingFeeLamp: anchor.BN;
        };
        farmerCount: anchor.BN;
        stakedFarmerCount: anchor.BN;
        authorizedFunderCount: anchor.BN;
        maxCounts: {
            maxFarmers: number;
            maxGems: number;
            maxRarityPoints: number;
        };
        reserved2: number[];
        reserved3: number[];
    }>[]>;
    fetchAllAuthProofPDAs(farm?: PublicKey, funder?: PublicKey): Promise<anchor.ProgramAccount<{
        authorizedFunder: anchor.web3.PublicKey;
        farm: anchor.web3.PublicKey;
        reserved: number[] | number[] | number[];
        identity: anchor.web3.PublicKey;
        vault: anchor.web3.PublicKey;
        state: {
            unstaked?: Record<string, never>;
            staked?: Record<string, never>;
            pendingCooldown?: Record<string, never>;
        };
        gemsStaked: anchor.BN;
        rarityPointsStaked: anchor.BN;
        minStakingEndsTs: anchor.BN;
        cooldownEndsTs: anchor.BN;
        rewardA: {
            paidOutReward: anchor.BN;
            accruedReward: anchor.BN;
            variableRate: {
                lastRecordedAccruedRewardPerRarityPoint: {
                    n: anchor.BN;
                };
                reserved: number[];
            };
            fixedRate: {
                beginStakingTs: anchor.BN;
                beginScheduleTs: anchor.BN;
                lastUpdatedTs: anchor.BN;
                promisedSchedule: {
                    baseRate: anchor.BN;
                    tier1: {
                        rewardRate: anchor.BN;
                        requiredTenure: anchor.BN;
                    };
                    tier2: {
                        rewardRate: anchor.BN;
                        requiredTenure: anchor.BN;
                    };
                    tier3: {
                        rewardRate: anchor.BN;
                        requiredTenure: anchor.BN;
                    };
                    denominator: anchor.BN;
                };
                promisedDuration: anchor.BN;
                reserved: number[];
            };
            reserved: number[];
        } | {
            rewardMint: anchor.web3.PublicKey;
            rewardPot: anchor.web3.PublicKey;
            rewardType: {
                variable?: Record<string, never>;
                fixed?: Record<string, never>;
            };
            fixedRate: {
                schedule: {
                    baseRate: anchor.BN;
                    tier1: {
                        rewardRate: anchor.BN;
                        requiredTenure: anchor.BN;
                    };
                    tier2: {
                        rewardRate: anchor.BN;
                        requiredTenure: anchor.BN;
                    };
                    tier3: {
                        rewardRate: anchor.BN;
                        requiredTenure: anchor.BN;
                    };
                    denominator: anchor.BN;
                };
                reservedAmount: anchor.BN;
                reserved: number[];
            };
            variableRate: {
                rewardRate: {
                    n: anchor.BN;
                };
                rewardLastUpdatedTs: anchor.BN;
                accruedRewardPerRarityPoint: {
                    n: anchor.BN;
                };
                reserved: number[];
            };
            funds: {
                totalFunded: anchor.BN;
                totalRefunded: anchor.BN;
                totalAccruedToStakers: anchor.BN;
            };
            times: {
                durationSec: anchor.BN;
                rewardEndTs: anchor.BN;
                lockEndTs: anchor.BN;
            };
            reserved: number[];
        };
        rewardB: {
            paidOutReward: anchor.BN;
            accruedReward: anchor.BN;
            variableRate: {
                lastRecordedAccruedRewardPerRarityPoint: {
                    n: anchor.BN;
                };
                reserved: number[];
            };
            fixedRate: {
                beginStakingTs: anchor.BN;
                beginScheduleTs: anchor.BN;
                lastUpdatedTs: anchor.BN;
                promisedSchedule: {
                    baseRate: anchor.BN;
                    tier1: {
                        rewardRate: anchor.BN;
                        requiredTenure: anchor.BN;
                    };
                    tier2: {
                        rewardRate: anchor.BN;
                        requiredTenure: anchor.BN;
                    };
                    tier3: {
                        rewardRate: anchor.BN;
                        requiredTenure: anchor.BN;
                    };
                    denominator: anchor.BN;
                };
                promisedDuration: anchor.BN;
                reserved: number[];
            };
            reserved: number[];
        } | {
            rewardMint: anchor.web3.PublicKey;
            rewardPot: anchor.web3.PublicKey;
            rewardType: {
                variable?: Record<string, never>;
                fixed?: Record<string, never>;
            };
            fixedRate: {
                schedule: {
                    baseRate: anchor.BN;
                    tier1: {
                        rewardRate: anchor.BN;
                        requiredTenure: anchor.BN;
                    };
                    tier2: {
                        rewardRate: anchor.BN;
                        requiredTenure: anchor.BN;
                    };
                    tier3: {
                        rewardRate: anchor.BN;
                        requiredTenure: anchor.BN;
                    };
                    denominator: anchor.BN;
                };
                reservedAmount: anchor.BN;
                reserved: number[];
            };
            variableRate: {
                rewardRate: {
                    n: anchor.BN;
                };
                rewardLastUpdatedTs: anchor.BN;
                accruedRewardPerRarityPoint: {
                    n: anchor.BN;
                };
                reserved: number[];
            };
            funds: {
                totalFunded: anchor.BN;
                totalRefunded: anchor.BN;
                totalAccruedToStakers: anchor.BN;
            };
            times: {
                durationSec: anchor.BN;
                rewardEndTs: anchor.BN;
                lockEndTs: anchor.BN;
            };
            reserved: number[];
        };
        version: number;
        farmManager: anchor.web3.PublicKey;
        farmTreasury: anchor.web3.PublicKey;
        farmAuthority: anchor.web3.PublicKey;
        farmAuthoritySeed: anchor.web3.PublicKey;
        farmAuthorityBumpSeed: number[];
        bank: anchor.web3.PublicKey;
        config: {
            minStakingPeriodSec: anchor.BN;
            cooldownPeriodSec: anchor.BN;
            unstakingFeeLamp: anchor.BN;
        };
        farmerCount: anchor.BN;
        stakedFarmerCount: anchor.BN;
        authorizedFunderCount: anchor.BN;
        maxCounts: {
            maxFarmers: number;
            maxGems: number;
            maxRarityPoints: number;
        };
        reserved2: number[];
        reserved3: number[];
    }>[]>;
    initFarm(farm: Keypair, farmManager: PublicKey | Keypair, payer: PublicKey | Keypair, bank: Keypair, rewardAMint: PublicKey, rewardAType: any, //RewardType instance
    rewardBMint: PublicKey, rewardBType: any, //RewardType instance
    farmConfig: FarmConfig, maxCounts?: MaxCounts): Promise<{
        farmAuth: anchor.web3.PublicKey;
        farmAuthBump: number;
        farmTreasury: anchor.web3.PublicKey;
        farmTreasuryBump: number;
        rewardAPot: anchor.web3.PublicKey;
        rewardAPotBump: number;
        rewardBPot: anchor.web3.PublicKey;
        rewardBPotBump: number;
        txSig: string;
    }>;
    updateFarm(farm: PublicKey, farmManager: PublicKey | Keypair, config?: FarmConfig | null, newManager?: PublicKey | null, maxCounts?: MaxCounts): Promise<{
        txSig: string;
    }>;
    payoutFromTreasury(farm: PublicKey, farmManager: PublicKey | Keypair, destination: PublicKey, lamports: BN): Promise<{
        farmAuth: anchor.web3.PublicKey;
        farmAuthBump: number;
        farmTreasury: anchor.web3.PublicKey;
        farmTreasuryBump: number;
        txSig: string;
    }>;
    addToBankWhitelist(farm: PublicKey, farmManager: PublicKey | Keypair, addressToWhitelist: PublicKey, whitelistType: WhitelistType): Promise<{
        farmAuth: anchor.web3.PublicKey;
        farmAuthBump: number;
        whitelistProof: anchor.web3.PublicKey;
        whitelistProofBump: number;
        txSig: string;
    }>;
    removeFromBankWhitelist(farm: PublicKey, farmManager: PublicKey | Keypair, addressToRemove: PublicKey): Promise<{
        farmAuth: anchor.web3.PublicKey;
        farmAuthBump: number;
        whitelistProof: anchor.web3.PublicKey;
        whitelistProofBump: number;
        txSig: string;
    }>;
    initFarmer(farm: PublicKey, farmerIdentity: PublicKey | Keypair, payer: PublicKey | Keypair): Promise<{
        farmer: anchor.web3.PublicKey;
        farmerBump: number;
        vault: anchor.web3.PublicKey;
        vaultBump: number;
        vaultAuth: anchor.web3.PublicKey;
        vaultAuthBump: number;
        txSig: string;
    }>;
    buildInitFarmer(farm: PublicKey, farmerIdentity: PublicKey | Keypair, payer: PublicKey | Keypair): Promise<{
        farmer: anchor.web3.PublicKey;
        farmerBump: number;
        vault: anchor.web3.PublicKey;
        vaultBump: number;
        vaultAuth: anchor.web3.PublicKey;
        vaultAuthBump: number;
        builder: import("@project-serum/anchor/dist/cjs/program/namespace/methods").MethodsBuilder<GemFarm, {
            name: "initFarmer";
            accounts: [{
                name: "farm";
                isMut: true;
                isSigner: false;
            }, {
                name: "farmer";
                isMut: true;
                isSigner: false;
            }, {
                name: "identity";
                isMut: false;
                isSigner: true;
            }, {
                name: "bank";
                isMut: true;
                isSigner: false;
            }, {
                name: "vault";
                isMut: true;
                isSigner: false;
            }, {
                name: "gemBank";
                isMut: false;
                isSigner: false;
            }, {
                name: "payer";
                isMut: true;
                isSigner: true;
            }, {
                name: "feeAcc";
                isMut: true;
                isSigner: false;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [];
        } & {
            name: "initFarmer";
        }>;
    }>;
    stakeCommon(farm: PublicKey, farmerIdentity: PublicKey | Keypair, unstake?: boolean, skipRewards?: boolean): Promise<{
        farmer: anchor.web3.PublicKey;
        farmerBump: number;
        vault: anchor.web3.PublicKey;
        vaultBump: number;
        farmAuth: anchor.web3.PublicKey;
        farmAuthBump: number;
        farmTreasury: anchor.web3.PublicKey;
        farmTreasuryBump: number;
        txSig: string;
    }>;
    buildStakeCommon(farm: PublicKey, farmerIdentity: PublicKey | Keypair, unstake?: boolean, skipRewards?: boolean): Promise<{
        farmer: anchor.web3.PublicKey;
        farmerBump: number;
        vault: anchor.web3.PublicKey;
        vaultBump: number;
        farmAuth: anchor.web3.PublicKey;
        farmAuthBump: number;
        farmTreasury: anchor.web3.PublicKey;
        farmTreasuryBump: number;
        builder: import("@project-serum/anchor/dist/cjs/program/namespace/methods").MethodsBuilder<GemFarm, {
            name: "stake";
            accounts: [{
                name: "farm";
                isMut: true;
                isSigner: false;
            }, {
                name: "farmAuthority";
                isMut: false;
                isSigner: false;
            }, {
                name: "farmer";
                isMut: true;
                isSigner: false;
            }, {
                name: "identity";
                isMut: true;
                isSigner: true;
            }, {
                name: "bank";
                isMut: false;
                isSigner: false;
            }, {
                name: "vault";
                isMut: true;
                isSigner: false;
            }, {
                name: "gemBank";
                isMut: false;
                isSigner: false;
            }, {
                name: "feeAcc";
                isMut: true;
                isSigner: false;
            }, {
                name: "systemProgram";
                isMut: false;
                isSigner: false;
            }];
            args: [{
                name: "bumpAuth";
                type: "u8";
            }, {
                name: "bumpFarmer";
                type: "u8";
            }];
        } & {
            name: "stake";
        }>;
    }>;
    stake(farm: PublicKey, farmerIdentity: PublicKey | Keypair): Promise<{
        farmer: anchor.web3.PublicKey;
        farmerBump: number;
        vault: anchor.web3.PublicKey;
        vaultBump: number;
        farmAuth: anchor.web3.PublicKey;
        farmAuthBump: number;
        farmTreasury: anchor.web3.PublicKey;
        farmTreasuryBump: number;
        txSig: string;
    }>;
    unstake(farm: PublicKey, farmerIdentity: PublicKey | Keypair, skipRewards?: boolean): Promise<{
        farmer: anchor.web3.PublicKey;
        farmerBump: number;
        vault: anchor.web3.PublicKey;
        vaultBump: number;
        farmAuth: anchor.web3.PublicKey;
        farmAuthBump: number;
        farmTreasury: anchor.web3.PublicKey;
        farmTreasuryBump: number;
        txSig: string;
    }>;
    claim(farm: PublicKey, farmerIdentity: PublicKey | Keypair, rewardAMint: PublicKey, rewardBMint: PublicKey): Promise<{
        farmAuth: anchor.web3.PublicKey;
        farmAuthBump: number;
        farmer: anchor.web3.PublicKey;
        farmerBump: number;
        potA: anchor.web3.PublicKey;
        potABump: number;
        potB: anchor.web3.PublicKey;
        potBBump: number;
        rewardADestination: anchor.web3.PublicKey;
        rewardBDestination: anchor.web3.PublicKey;
        txSig: string;
    }>;
    flashDeposit(farm: PublicKey, farmerIdentity: PublicKey | Keypair, gemAmount: BN, gemMint: PublicKey, gemSource: PublicKey, mintProof?: PublicKey, metadata?: PublicKey, creatorProof?: PublicKey): Promise<{
        farmer: anchor.web3.PublicKey;
        farmerBump: number;
        vault: anchor.web3.PublicKey;
        vaultBump: number;
        farmAuth: anchor.web3.PublicKey;
        farmAuthBump: number;
        gemBox: anchor.web3.PublicKey;
        gemBoxBump: number;
        GDR: anchor.web3.PublicKey;
        GDRBump: number;
        vaultAuth: anchor.web3.PublicKey;
        vaultAuthBump: number;
        txSig: string;
    }>;
    flashDepositPnft(farm: PublicKey, farmerIdentity: PublicKey | Keypair, gemAmount: BN, gemMint: PublicKey, gemSource: PublicKey, mintProof?: PublicKey, creatorProof?: PublicKey): Promise<{
        farmer: anchor.web3.PublicKey;
        farmerBump: number;
        vault: anchor.web3.PublicKey;
        vaultBump: number;
        farmAuth: anchor.web3.PublicKey;
        farmAuthBump: number;
        gemBox: anchor.web3.PublicKey;
        gemBoxBump: number;
        GDR: anchor.web3.PublicKey;
        GDRBump: number;
        vaultAuth: anchor.web3.PublicKey;
        vaultAuthBump: number;
        txSig: string;
        meta: any;
        ownerTokenRecordBump: number;
        ownerTokenRecordPda: anchor.web3.PublicKey;
        destTokenRecordBump: number;
        destTokenRecordPda: anchor.web3.PublicKey;
    }>;
    refreshFarmer(farm: PublicKey, farmerIdentity: PublicKey | Keypair, reenroll?: boolean): Promise<{
        farmer: anchor.web3.PublicKey;
        farmerBump: number;
        txSig: any;
    }>;
    authorizeCommon(farm: PublicKey, farmManager: PublicKey | Keypair, funder: PublicKey, deauthorize?: boolean): Promise<{
        authorizationProof: anchor.web3.PublicKey;
        authorizationProofBump: number;
        txSig: any;
    }>;
    authorizeFunder(farm: PublicKey, farmManager: PublicKey | Keypair, funderToAuthorize: PublicKey): Promise<{
        authorizationProof: anchor.web3.PublicKey;
        authorizationProofBump: number;
        txSig: any;
    }>;
    deauthorizeFunder(farm: PublicKey, farmManager: PublicKey | Keypair, funderToDeauthorize: PublicKey): Promise<{
        authorizationProof: anchor.web3.PublicKey;
        authorizationProofBump: number;
        txSig: any;
    }>;
    fundReward(farm: PublicKey, rewardMint: PublicKey, funder: PublicKey | Keypair, rewardSource: PublicKey, variableRateConfig?: VariableRateConfig | null, fixedRateConfig?: FixedRateConfig | null): Promise<{
        farmAuth: anchor.web3.PublicKey;
        farmAuthBump: number;
        authorizationProof: anchor.web3.PublicKey;
        authorizationProofBump: number;
        pot: anchor.web3.PublicKey;
        potBump: number;
        txSig: string;
    }>;
    cancelReward(farm: PublicKey, farmManager: PublicKey | Keypair, rewardMint: PublicKey, receiver: PublicKey): Promise<{
        farmAuth: anchor.web3.PublicKey;
        farmAuthBump: number;
        pot: anchor.web3.PublicKey;
        potBump: number;
        rewardDestination: anchor.web3.PublicKey;
        txSig: string;
    }>;
    lockReward(farm: PublicKey, farmManager: PublicKey | Keypair, rewardMint: PublicKey): Promise<{
        txSig: string;
    }>;
    addRaritiesToBank(farm: PublicKey, farmManager: PublicKey | Keypair, rarityConfigs: RarityConfig[]): Promise<{
        bank: anchor.web3.PublicKey;
        farmAuth: anchor.web3.PublicKey;
        farmAuthBump: number;
        completeRarityConfigs: RarityConfig[];
        txSig: string;
    }>;
    parseRewardType(reward: any): string;
    parseFarmerState(farmer: any): string;
    createExtraComputeIx(newComputeBudget: number): TransactionInstruction;
}
