"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dilithium_crystals_js_1 = __importDefault(require("dilithium-crystals-js"));
const sha3_1 = require("@noble/hashes/sha3");
const hkdf_1 = require("@noble/hashes/hkdf");
const mlkem_1 = require("mlkem");
class HarmonyCrypto {
    dilithium;
    mlkem;
    seed;
    constructor(dilithium, mlkem, seed) {
        this.dilithium = dilithium;
        this.mlkem = mlkem;
        this.seed = seed;
    }
    static async create(seed) {
        if (!seed) {
            seed = crypto.getRandomValues(new Uint8Array(64));
        }
        const dilithium = await dilithium_crystals_js_1.default;
        const mlkem = new mlkem_1.MlKem1024();
        return new HarmonyCrypto(dilithium, mlkem, seed);
    }
    derive_seed(info, length) {
        return (0, hkdf_1.hkdf)(sha3_1.sha3_256, this.seed, new Uint8Array(0), new TextEncoder().encode(info), length);
    }
    get_dilithium5_keypair() {
        const { publicKey, privateKey } = this.dilithium.generateKeys(2, this.derive_seed("dilithium5 signing keypair", 32));
        if (!privateKey || !publicKey) {
            throw new Error("Dilthium5 private key or public key is undefined");
        }
        return { publicKey, privateKey };
    }
    async get_kyber1024_keypair() {
        const [publicKey, privateKey] = await this.mlkem.deriveKeyPair(this.derive_seed("kyber1024 decapsulating keypair", 64));
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
exports.default = HarmonyCrypto;
//# sourceMappingURL=index.js.map