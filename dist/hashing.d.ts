declare const hashing_functions: {
    readonly sha2_256: {
        (msg: import("@noble/hashes/utils").Input): Uint8Array;
        outputLen: number;
        blockLen: number;
        create(): import("@noble/hashes/utils").Hash<import("@noble/hashes/utils").Hash<any>>;
    };
    readonly sha2_512: {
        (msg: import("@noble/hashes/utils").Input): Uint8Array;
        outputLen: number;
        blockLen: number;
        create(): import("@noble/hashes/utils").Hash<import("@noble/hashes/utils").Hash<any>>;
    };
    readonly sha3_256: {
        (msg: import("@noble/hashes/utils").Input): Uint8Array;
        outputLen: number;
        blockLen: number;
        create(): import("@noble/hashes/utils").Hash<import("@noble/hashes/utils").Hash<any>>;
    };
    readonly sha3_512: {
        (msg: import("@noble/hashes/utils").Input): Uint8Array;
        outputLen: number;
        blockLen: number;
        create(): import("@noble/hashes/utils").Hash<import("@noble/hashes/utils").Hash<any>>;
    };
    readonly sha3_keccak256: {
        (msg: import("@noble/hashes/utils").Input): Uint8Array;
        outputLen: number;
        blockLen: number;
        create(): import("@noble/hashes/utils").Hash<import("@noble/hashes/utils").Hash<any>>;
    };
    readonly sha3_keccak512: {
        (msg: import("@noble/hashes/utils").Input): Uint8Array;
        outputLen: number;
        blockLen: number;
        create(): import("@noble/hashes/utils").Hash<import("@noble/hashes/utils").Hash<any>>;
    };
};
type HashAlgorithm = keyof typeof hashing_functions;
export declare const Hashing: {
    hash(data: string, algo: HashAlgorithm): Uint8Array;
    hash_hex(data: string, algo: HashAlgorithm): String;
};
export {};
//# sourceMappingURL=hashing.d.ts.map