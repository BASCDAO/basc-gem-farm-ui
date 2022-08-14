
import { initGemBank } from "../lib/gem-farm/common/gem-bank"
import { PublicKey } from "@solana/web3.js"
const solanaWeb3 =  require("@solana/web3.js");
const solana = new solanaWeb3.Connection('https://solana-api.projectserum.com');
const results: { wallet: string; mint: string }[] = [];


export async function getStaked(query: string) {
    const words = query;
      const bankClient = await initGemBank(solana);
      const allVaults = await bankClient.fetchAllVaultPDAs(
        new PublicKey('i7Z46YuSiej4LMYRHvhffH5MmuteuHUjFaVVqVfG5TP' as unknown as PublicKey)
      );
      for (var Vault of allVaults) {
        //if (Vault.account.owner.toBase58() === words) {
          if (Vault.account.gemBoxCount.toNumber() !== -1) {
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
  };