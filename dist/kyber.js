"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Kyber = void 0;
const mlkem_1 = require("mlkem");
const kyber_algorithms = {
    kyber512: mlkem_1.MlKem512,
    kyber768: mlkem_1.MlKem768,
    kyber1024: mlkem_1.MlKem1024,
};
class Kyber {
    ctx;
    seed;
    constructor(algo, seed) {
        this.ctx = new kyber_algorithms[algo]();
        this.seed = seed;
    }
    async get_keypair() {
        let keypair = await this.ctx.deriveKeyPair(this.seed);
        if (keypair[0] === undefined) {
            throw new Error(`Public key is undefined`);
        }
        if (keypair[1] === undefined) {
            throw new Error(`Secret key is undefined`);
        }
        return { public_key: keypair[0], secret_key: keypair[1] };
    }
    async get_keypair_hex() {
        let keypair = await this.get_keypair();
        return {
            public_key: Buffer.from(keypair.public_key).toString("hex"),
            secret_key: Buffer.from(keypair.secret_key).toString("hex"),
        };
    }
    async encapsulate(public_key, msg) {
        return await this.ctx.encap(public_key, msg);
    }
    async decapsulate(msg, secret_key) {
        return await this.ctx.decap(msg, secret_key);
    }
}
exports.Kyber = Kyber;
//# sourceMappingURL=kyber.js.map