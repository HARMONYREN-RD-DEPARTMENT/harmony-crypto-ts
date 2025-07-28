import Dilithium from "dilithium-crystals-js";
import { sha3_256 } from '@noble/hashes/sha3';
import { hkdf } from '@noble/hashes/hkdf';
import { MlKem1024 } from "mlkem";
class HarmonyCrypto {
    constructor(dilithium, mlkem, seed) {
        this.dilithium = dilithium;
        this.mlkem = mlkem;
        this.seed = seed;
    }
    static async create(seed) {
        if (!seed) {
            seed = crypto.getRandomValues(new Uint8Array(64));
        }
        const dilithium = await Dilithium;
        const mlkem = new MlKem1024();
        return new HarmonyCrypto(dilithium, mlkem, seed);
    }
    derive_seed(info, length) {
        return hkdf(sha3_256, this.seed, new Uint8Array(0), new TextEncoder().encode(info), length);
    }
    get_dilithium5_keypair() {
        const { publicKey, privateKey } = this.dilithium.generateKeys(2, this.derive_seed("dilithium5 signing keypair", 32));
        if (!privateKey || !publicKey) {
            throw new Error("Dilthium5 private key or public key is undefined");
        }
        return { publicKey, privateKey };
    }
    async get_kyber1024_keypair() {
        const [publicKey, privateKey] = await this.mlkem.deriveKeyPair(this.derive_seed("kyber1024 encrypting keypair", 64));
        if (!privateKey || !publicKey) {
            throw new Error("Kyber1024 private key or public key is undefined");
        }
        return { publicKey, privateKey };
    }
    sign(message, privateKey) {
        return this.dilithium.sign(message, privateKey, 2).signature;
    }
    verify(signature, message, publicKey) {
        console.log(signature.length);
        return this.dilithium.verify(signature, message, publicKey, 2).result === 0;
    }
    kyber1024_encapsulate(publicKey) {
        return this.mlkem.encap(publicKey);
    }
    kyber1024_decapsulate(ciphertext, shared_secret) {
        return this.mlkem.decap(ciphertext, shared_secret);
    }
}
export default HarmonyCrypto;
