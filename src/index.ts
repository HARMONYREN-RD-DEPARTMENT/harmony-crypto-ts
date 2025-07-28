import Dilithium from "dilithium-crystals-js";
import { sha3_256 } from '@noble/hashes/sha3';
import { hkdf } from '@noble/hashes/hkdf';
import { MlKem1024 } from "mlkem";

class HarmonyCrypto {
  dilithium: any;
  mlkem: MlKem1024;
  seed: Uint8Array;

  private constructor(dilithium: any, mlkem: MlKem1024, seed: Uint8Array) {
    this.dilithium = dilithium;
    this.mlkem = mlkem;
    this.seed = seed;
  }

  static async create(seed?: Uint8Array): Promise<HarmonyCrypto> {
    if (!seed) {
      seed = crypto.getRandomValues(new Uint8Array(64));
    }

    const dilithium = await Dilithium;
    const mlkem = new MlKem1024();
    return new HarmonyCrypto(dilithium, mlkem, seed);
  }

  derive_seed(info: string, length: number): Uint8Array {
    return hkdf(sha3_256, this.seed, new Uint8Array(0), new TextEncoder().encode(info), length);
  }

  get_dilithium5_keypair(): { publicKey: Uint8Array; privateKey: Uint8Array } {
    const { publicKey, privateKey } = this.dilithium.generateKeys(2, this.derive_seed("dilithium5 signing keypair", 32));

    if (!privateKey || !publicKey) {
      throw new Error("Dilthium5 private key or public key is undefined");
    }

    return { publicKey, privateKey };
  }


  async get_kyber1024_keypair(): Promise<{ publicKey: Uint8Array; privateKey: Uint8Array }> {
    const [publicKey, privateKey] = await this.mlkem.deriveKeyPair(this.derive_seed("kyber1024 decapsulating keypair", 64));

    if (!privateKey || !publicKey) {
      throw new Error("Kyber1024 private key or public key is undefined");
    }

    return { publicKey, privateKey };
  }

  sign(message: Uint8Array, privateKey: Uint8Array): Uint8Array {
    return this.dilithium.sign(message, privateKey, 2).signature;
  }

  verify(signature: Uint8Array, message: Uint8Array, publicKey: Uint8Array): boolean {
    console.log(signature.length);
    return this.dilithium.verify(signature, message, publicKey, 2).result === 0;
  }

  kyber1024_encapsulate(publicKey: Uint8Array): Promise<[Uint8Array, Uint8Array]> {
    return this.mlkem.encap(publicKey)
  }

  kyber1024_decapsulate(ciphertext: Uint8Array, shared_secret: Uint8Array): Promise<Uint8Array> {
    return this.mlkem.decap(ciphertext, shared_secret);
  }

}

export default HarmonyCrypto;
