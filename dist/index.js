"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dilithium_1 = require("./dilithium");
class HarmonyCrypto {
    seed;
    dilithium;
    constructor(seed, dilithium) {
        this.seed = seed;
        this.dilithium = dilithium;
    }
    static async init(seed) {
        if (!seed) {
            seed = new Uint8Array(64);
            crypto.getRandomValues(seed);
        }
        const moduleInstance = await dilithium_1.dilithiumModulePromise;
        const dilithium = new dilithium_1.Dilithium(moduleInstance);
        return new HarmonyCrypto(seed, dilithium);
    }
}
;
exports.default = HarmonyCrypto;
async function main() {
    let ctx = await HarmonyCrypto.init();
    console.log(ctx.seed);
}
//# sourceMappingURL=index.js.map