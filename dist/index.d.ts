import { MlKem1024 } from "mlkem";
declare class HarmonyCrypto {
    dilithium: any;
    mlkem: MlKem1024;
    seed: Uint8Array;
    private constructor();
    static create(seed?: Uint8Array): Promise<HarmonyCrypto>;
    derive_seed(info: string, length: number): Uint8Array;
    get_dilithium5_keypair(): {
        publicKey: Uint8Array;
        privateKey: Uint8Array;
    };
    get_kyber1024_keypair(): Promise<{
        publicKey: Uint8Array;
        privateKey: Uint8Array;
    }>;
    sign(message: Uint8Array, privateKey: Uint8Array): Uint8Array;
    verify(signature: Uint8Array, message: Uint8Array, publicKey: Uint8Array): boolean;
    kyber1024_encapsulate(publicKey: Uint8Array): Promise<[Uint8Array, Uint8Array]>;
    kyber1024_decapsulate(ciphertext: Uint8Array, shared_secret: Uint8Array): Promise<Uint8Array>;
}
export default HarmonyCrypto;
//# sourceMappingURL=index.d.ts.map