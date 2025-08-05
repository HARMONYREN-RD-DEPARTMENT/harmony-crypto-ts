"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hashing = exports.hashing_functions = void 0;
const sha3 = __importStar(require("@noble/hashes/sha3"));
const sha2 = __importStar(require("@noble/hashes/sha2"));
const buffer_1 = require("buffer");
exports.hashing_functions = {
    // SHA2
    sha2_256: sha2.sha256,
    sha2_512: sha2.sha512,
    // SHA3
    sha3_256: sha3.sha3_256,
    sha3_512: sha3.sha3_512,
    // SHA3 KECCAK
    sha3_keccak256: sha3.keccak_256,
    sha3_keccak512: sha3.keccak_512,
};
exports.Hashing = {
    hash(data, algo) {
        const encoder = new TextEncoder();
        return exports.hashing_functions[algo](encoder.encode(data));
    },
    hash_hex(data, algo) {
        return buffer_1.Buffer.from(this.hash(data, algo)).toString("hex");
    }
};
//# sourceMappingURL=hashing.js.map