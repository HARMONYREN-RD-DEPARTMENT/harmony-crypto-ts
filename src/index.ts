import { hkdf } from '@noble/hashes/hkdf';
import { MlKem1024 } from "mlkem";

import { Hashing } from "./hashing";
import { Dilithium, dilithiumModulePromise } from './dilithium';

class HarmonyCrypto {
  seed: Uint8Array;
  dilithium: Dilithium;

  private constructor(seed: Uint8Array, dilithium: Dilithium) {
    this.seed = seed;
    this.dilithium = dilithium;
  }

  static async init(seed?: Uint8Array): Promise<HarmonyCrypto> {
    if (!seed) {
      seed = new Uint8Array(64);
      crypto.getRandomValues(seed);
    }

    const moduleInstance = await dilithiumModulePromise;
    const dilithium = new Dilithium(moduleInstance);

    return new HarmonyCrypto(seed, dilithium);
  }
};

export default HarmonyCrypto;


async function main() {
  let ctx = await HarmonyCrypto.init();

  console.log(ctx.seed);
}

