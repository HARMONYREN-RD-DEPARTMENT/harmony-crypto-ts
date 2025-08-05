import { Kyber, KyberAlgorithm } from './kyber';
import { Dilithium, DilithiumAlgorithm } from './dilithium';
declare class HarmonyCrypto {
    seed: Uint8Array;
    dilithium: Dilithium;
    kyber: Kyber;
    private constructor();
    static init(dilithium_algo: DilithiumAlgorithm, kyber_algo: KyberAlgorithm, seed?: Uint8Array): Promise<HarmonyCrypto>;
    static get_hkdf_seed(seed: Uint8Array, info: string, length: number): Promise<Uint8Array>;
}
export default HarmonyCrypto;
//# sourceMappingURL=index.d.ts.map