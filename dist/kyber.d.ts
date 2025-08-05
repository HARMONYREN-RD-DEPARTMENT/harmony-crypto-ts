import { MlKem512, MlKem768, MlKem1024 } from "mlkem";
import { MlKemBase } from "mlkem/script/src/mlKemBase.js";
declare const kyber_algorithms: {
    readonly kyber512: typeof MlKem512;
    readonly kyber768: typeof MlKem768;
    readonly kyber1024: typeof MlKem1024;
};
export type KyberAlgorithm = keyof typeof kyber_algorithms;
export declare class Kyber {
    ctx: MlKemBase;
    seed: Uint8Array;
    constructor(algo: KyberAlgorithm, seed: Uint8Array);
    get_keypair(): Promise<{
        public_key: Uint8Array;
        secret_key: Uint8Array;
    }>;
    get_keypair_hex(): Promise<{
        public_key: string;
        secret_key: string;
    }>;
    encapsulate(public_key: Uint8Array, msg: Uint8Array): Promise<[Uint8Array, Uint8Array]>;
    decapsulate(msg: Uint8Array, secret_key: Uint8Array): Promise<Uint8Array>;
}
export {};
//# sourceMappingURL=kyber.d.ts.map