import { blake2AsU8a } from '@polkadot/util-crypto';

export function roleToSelectorId(role: string) {
  if (role === 'DEFAULT_ADMIN' || role === 'ROLE_ADMIN') return '0';
  return parseInt(stringToSelectorId(role));
}

export function stringToSelectorId(str: string): string {
  const strBlake2AsU8a = blake2AsU8a(str);
  const selectorU8Array = strBlake2AsU8a.slice(0, 4);
  const buffer = Buffer.from(selectorU8Array);
  const res = buffer.readUInt32BE(0);
  return res.toString();
}
