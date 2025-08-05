import { MlKem512, MlKem768, MlKem1024 } from "mlkem";

import { MlKemBase } from "mlkem/script/src/mlKemBase.js";

const kyber_algorithms = {
  kyber512: MlKem512,
  kyber768: MlKem768,
  kyber1024: MlKem1024,
} as const;


export type KyberAlgorithm = keyof typeof kyber_algorithms;

export class Kyber {
  ctx: MlKemBase;
  seed: Uint8Array;

  constructor(algo: KyberAlgorithm, seed: Uint8Array) {
    this.ctx = new kyber_algorithms[algo]();
    this.seed = seed;

    console.log(seed);
  }

  async get_keypair(): Promise<{ public_key: Uint8Array, secret_key: Uint8Array }> {
    let keypair = await this.ctx.deriveKeyPair(this.seed);

    if (keypair[0] === undefined) {
      throw new Error(`Public key is undefined`);
    }

    if (keypair[1] === undefined) {
      throw new Error(`Secret key is undefined`);
    }

    return { public_key: keypair[0], secret_key: keypair[1] };
  }

  async get_keypair_hex(): Promise<{ public_key: string, secret_key: string }> {
    let keypair = await this.get_keypair();

    return {
      public_key: Buffer.from(keypair.public_key).toString("hex"),
      secret_key: Buffer.from(keypair.secret_key).toString("hex"),
    };
  }

  async encapsulate(public_key: Uint8Array, msg: Uint8Array): Promise<[Uint8Array, Uint8Array]> {
    return await this.ctx.encap(public_key, msg);
  }

  async decapsulate(msg: Uint8Array, secret_key: Uint8Array): Promise<Uint8Array> {
    return await this.ctx.decap(msg, secret_key);
  }
}