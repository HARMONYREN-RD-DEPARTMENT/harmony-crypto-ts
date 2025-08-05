import { Dilithium } from './dilithium';
declare class HarmonyCrypto {
    seed: Uint8Array;
    dilithium: Dilithium;
    private constructor();
    static init(seed?: Uint8Array): Promise<HarmonyCrypto>;
}
export default HarmonyCrypto;
//# sourceMappingURL=index.d.ts.map