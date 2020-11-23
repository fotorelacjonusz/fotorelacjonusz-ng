const crypto = require("crypto")

/**
 * A very proper UUIDv4 implementation which uses Node's crypto module.
 *
 * Note: RFC 4122 (https://tools.ietf.org/html/rfc4122#section-4.4) is quite
 * confusing.  Here: https://www.cryptosys.net/pki/uuid-rfc4122.html is
 * a better explanation.
 */
export function uuid4() {
  let array = Buffer.alloc(16)
  crypto.randomFillSync(array)

  // manipulate 9th byte
  array[8] &= 0b00111111 // clear first two bits
  array[8] |= 0b10000000 // set first two bits to 10

  // manipulate 7th byte
  array[6] &= 0b00001111 // clear first four bits
  array[6] |= 0b01000000 // set first four bits to 0100

  const pattern = "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX"
  let idx = 0

  return pattern.replace(
    /XX/g,
    () => array[idx++].toString(16).padStart(2, "0"),
  )
}
