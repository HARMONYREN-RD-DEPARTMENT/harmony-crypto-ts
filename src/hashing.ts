import * as sha3 from '@noble/hashes/sha3';
import * as sha2 from '@noble/hashes/sha2';

import { Buffer } from 'buffer';

export const hashing_functions = {
  // SHA2
  sha2_256: sha2.sha256,
  sha2_512: sha2.sha512,
  
  // SHA3
  sha3_256: sha3.sha3_256,
  sha3_512: sha3.sha3_512,

  // SHA3 KECCAK
  sha3_keccak256: sha3.keccak_256,
  sha3_keccak512: sha3.keccak_512,
} as const;

type HashAlgorithm = keyof typeof hashing_functions;

export const Hashing = {
  hash(data: string, algo: HashAlgorithm): Uint8Array {
    const encoder = new TextEncoder();

    return hashing_functions[algo](encoder.encode(data));
  },

  hash_hex(data: string, algo: HashAlgorithm): String {
    return Buffer.from(this.hash(data, algo)).toString("hex");
  }
};

