"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hkdf_1 = require("@noble/hashes/hkdf");
const kyber_1 = require("./kyber");
const hashing_1 = require("./hashing");
const dilithium_1 = require("./dilithium");
class HarmonyCrypto {
    seed;
    dilithium;
    kyber;
    constructor(seed, dilithium, kyber) {
        this.seed = seed;
        this.dilithium = dilithium;
        this.kyber = kyber;
    }
    static async init(dilithium_algo, kyber_algo, seed) {
        if (!seed) {
            seed = new Uint8Array(64);
            crypto.getRandomValues(seed);
        }
        const moduleInstance = await dilithium_1.dilithiumModulePromise;
        const dilithium = new dilithium_1.Dilithium(moduleInstance, await this.get_hkdf_seed(seed, `${dilithium_algo} signing keypair`, 32));
        const kyber = new kyber_1.Kyber(kyber_algo, await this.get_hkdf_seed(seed, `${kyber_algo} encapsulating keypair`, 64));
        return new HarmonyCrypto(seed, dilithium, kyber);
    }
    static async get_hkdf_seed(seed, info, length) {
        const salt = new Uint8Array(0);
        const infoBytes = new TextEncoder().encode(info);
        const derived = (0, hkdf_1.hkdf)(hashing_1.hashing_functions.sha3_256, seed, salt, infoBytes, length);
        return derived;
    }
}
;
exports.default = HarmonyCrypto;
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
//# sourceMappingURL=index.js.map