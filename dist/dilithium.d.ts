import dilithiumModulePromise from "dilithium-crystals-js";
declare const dilithium_algorithms: {
    readonly dilithium_2: 0;
    readonly dilithium_3: 1;
    readonly dilithium_5: 2;
};
type DilithiumAlgorithm = keyof typeof dilithium_algorithms;
declare class Dilithium {
    ctx: Awaited<typeof dilithiumModulePromise>;
    constructor(ctx: Awaited<typeof dilithiumModulePromise>);
    get_keypair(algo: DilithiumAlgorithm, seed: Uint8Array): {
        public_key: Uint8Array<ArrayBufferLike> | undefined;
        secret_key: Uint8Array<ArrayBufferLike> | undefined;
    };
    get_keypair_hex(algo: DilithiumAlgorithm, seed: Uint8Array): {
        public_key: string;
        secret_key: string;
    };
    sign(msg: Uint8Array, secret_key: Uint8Array, algo: DilithiumAlgorithm): Uint8Array;
    verify(signature: Uint8Array, msg: Uint8Array, public_key: Uint8Array, algo: DilithiumAlgorithm): boolean;
}
export { Dilithium, dilithiumModulePromise };
export type { DilithiumAlgorithm };
//# sourceMappingURL=dilithium.d.ts.map