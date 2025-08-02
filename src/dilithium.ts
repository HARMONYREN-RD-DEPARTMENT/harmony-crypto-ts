import dilithiumModulePromise from "dilithium-crystals-js";

const dilithium_algorithms = {
  dilithium_2: 0,
  dilithium_3: 1,
  dilithium_5: 2,
} as const;

type DilithiumAlgorithm = keyof typeof dilithium_algorithms;

class Dilithium {
  ctx: Awaited<typeof dilithiumModulePromise>;

  constructor(ctx: Awaited<typeof dilithiumModulePromise>) {
    this.ctx = ctx;
  }

  get_keypair(algo: DilithiumAlgorithm, seed: Uint8Array) {
    let keypair = this.ctx.generateKeys(dilithium_algorithms[algo], seed);
    return { public_key: keypair.publicKey, secret_key: keypair.privateKey };
  }

  get_keypair_hex(algo: DilithiumAlgorithm, seed: Uint8Array): { public_key: string; secret_key: string; } {
    let keypair = this.get_keypair(algo, seed);

    if (keypair.public_key === undefined) {
      throw new Error(`Public key is null`);
    }

    if (keypair.secret_key === undefined) {
      throw new Error(`Secret key is null`);
    }

    return {
      public_key: Buffer.from(keypair.public_key).toString("hex"),
      secret_key: Buffer.from(keypair.secret_key).toString("hex"),
    };
  }

  sign(msg: Uint8Array, secret_key: Uint8Array, algo: DilithiumAlgorithm): Uint8Array {
    return this.ctx.sign(msg, secret_key, dilithium_algorithms[algo]).signature;
  }

  verify(signature: Uint8Array, msg: Uint8Array, public_key: Uint8Array, algo: DilithiumAlgorithm): boolean {
    return this.ctx.verify(signature, msg, public_key, dilithium_algorithms[algo]).result === 0;
  }

}

export {
  Dilithium,
  dilithiumModulePromise
};

export type { DilithiumAlgorithm };
