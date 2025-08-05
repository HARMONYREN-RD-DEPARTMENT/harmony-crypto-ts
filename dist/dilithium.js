"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dilithiumModulePromise = exports.Dilithium = void 0;
const dilithium_crystals_js_1 = __importDefault(require("dilithium-crystals-js"));
exports.dilithiumModulePromise = dilithium_crystals_js_1.default;
const dilithium_algorithms = {
    dilithium_2: 0,
    dilithium_3: 1,
    dilithium_5: 2,
};
class Dilithium {
    ctx;
    seed;
    constructor(ctx, seed) {
        this.ctx = ctx;
        this.seed = seed;
    }
    get_keypair(algo) {
        let keypair = this.ctx.generateKeys(dilithium_algorithms[algo], this.seed);
        return { public_key: keypair.publicKey, secret_key: keypair.privateKey };
    }
    get_keypair_hex(algo) {
        let keypair = this.get_keypair(algo);
        if (keypair.public_key === undefined) {
            throw new Error(`Public key is undefined`);
        }
        if (keypair.secret_key === undefined) {
            throw new Error(`Secret key is undefined`);
        }
        return {
            public_key: Buffer.from(keypair.public_key).toString("hex"),
            secret_key: Buffer.from(keypair.secret_key).toString("hex"),
        };
    }
    sign(msg, secret_key, algo) {
        return this.ctx.sign(msg, secret_key, dilithium_algorithms[algo]).signature;
    }
    verify(signature, msg, public_key, algo) {
        return this.ctx.verify(signature, msg, public_key, dilithium_algorithms[algo]).result === 0;
    }
}
exports.Dilithium = Dilithium;
//# sourceMappingURL=dilithium.js.map