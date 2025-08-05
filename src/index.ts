import { hkdf } from '@noble/hashes/hkdf';
import { Kyber, KyberAlgorithm } from './kyber';
import { hashing_functions } from "./hashing";
import { Dilithium, DilithiumAlgorithm, dilithiumModulePromise } from './dilithium';

class HarmonyCrypto {
  seed: Uint8Array;
  dilithium: Dilithium;
  kyber: Kyber;

  private constructor(seed: Uint8Array, dilithium: Dilithium, kyber: Kyber) {
    this.seed = seed;
    this.dilithium = dilithium;
    this.kyber = kyber;
  }

  static async init(dilithium_algo: DilithiumAlgorithm, kyber_algo: KyberAlgorithm, seed?: Uint8Array,): Promise<HarmonyCrypto> {
    if (!seed) {
      seed = new Uint8Array(64);
      crypto.getRandomValues(seed);
    }

    const moduleInstance = await dilithiumModulePromise;
    const dilithium = new Dilithium(moduleInstance, await this.get_hkdf_seed(seed, `${dilithium_algo} signing keypair`, 32));
    const kyber = new Kyber(kyber_algo, await this.get_hkdf_seed(seed, `${kyber_algo} encapsulating keypair`, 64));
    return new HarmonyCrypto(seed, dilithium, kyber);
  }

  static async get_hkdf_seed(seed: Uint8Array, info: string, length: number): Promise<Uint8Array> {
    const salt = new Uint8Array(0);
    const infoBytes = new TextEncoder().encode(info);

    const derived = hkdf(hashing_functions.sha3_256, seed, salt, infoBytes, length);

    return derived;
  }

};

export default HarmonyCrypto;


async function main() {
  let seed = new Uint8Array(64);
  seed.fill(0);
  //crypto.getRandomValues(seed);

  let ctx = await HarmonyCrypto.init("dilithium_2", "kyber512", seed);
  let signing_keypair = ctx.dilithium.get_keypair("dilithium_2");
  let encapsulating_keypair = await ctx.kyber.get_keypair();

  console.log(signing_keypair);
  console.log(encapsulating_keypair);


}

