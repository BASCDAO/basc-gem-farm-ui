
import { initGemBank } from "../lib/gem-farm/common/gem-bank"
import { PublicKey } from "@solana/web3.js"
const solanaWeb3 =  require("@solana/web3.js");
const solana = new solanaWeb3.Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_HOST_MAINNET_BETA);

export async function getStakedUser(query: string) {
    const results: { wallet: string; mint: string }[] = [];
    const total: { total: number }[] = [];
    const words = query;
    if (words === "total") {
      const bankClient = await initGemBank(solana);
      const allVaults = await bankClient.fetchAllVaultPDAs(
      new PublicKey('i7Z46YuSiej4LMYRHvhffH5MmuteuHUjFaVVqVfG5TP' as unknown as PublicKey)
      );
      let gemCount = 0;
      for(var vault of allVaults) {
        gemCount += +vault.account.gemCount;
      }
      total.push({ total: gemCount});
      return total
    }
    else if (words.startsWith("getAcc-")) {
      let tmp = words.slice(7)
      const bankClient = await initGemBank(solana);
      const allVaults = await bankClient.fetchAllVaultPDAs(
        new PublicKey('i7Z46YuSiej4LMYRHvhffH5MmuteuHUjFaVVqVfG5TP' as unknown as PublicKey)
      );
      for (var Vault of allVaults) {
        if (Vault.account.owner.toBase58() === tmp) {
          const vaultAccount = Vault.account.authority.toBase58();
          const owner = Vault.account.owner.toBase58();
          results.push({ wallet: vaultAccount, mint: owner });
        }
      }
      return results
    }
    else {
      const bankClient = await initGemBank(solana);
      const allVaults = await bankClient.fetchAllVaultPDAs(
        new PublicKey('i7Z46YuSiej4LMYRHvhffH5MmuteuHUjFaVVqVfG5TP' as unknown as PublicKey)
      );
      for (var Vault of allVaults) {
        if (Vault.account.owner.toBase58() === words) {
          //if (Vault.account.gemBoxCount.toNumber() !== -1) {
          const foundGDRs = await bankClient.fetchAllGdrPDAs(Vault.publicKey);
          const owner = Vault.account.owner.toBase58();
          const mints = foundGDRs.map((gdr: any) => {
            return { mint: gdr.account.gemMint };
          });
          for (var mi of mints) {
            results.push({ wallet: owner, mint: mi.mint.toBase58() });
          }
        }
      }
      return results
    }
  };