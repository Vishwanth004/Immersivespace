/**
 * Generates a MongoDB-compliant Object ID. We cannot use the [bson](https://github.com/mongodb/js-bson) package
 *  in the edge runtime, as it throws the following error:
 *
 * > ../../node_modules/bson/dist/bson.browser.umd.js
 * > Dynamic Code Evaluation (e. g. 'eval', 'new Function', 'WebAssembly.compile') not allowed in Edge Runtime
 * > Learn More: https://nextjs.org/docs/messages/edge-dynamic-code-evaluation
 *
 * This happens despite the bson library being marked as "browser-compatible" 😞
 *
 * As a workaround, we generate Mongo Object IDs ourselves.
 * This code is based on [this post](https://stackoverflow.com/questions/10593337/is-there-any-way-to-create-mongodb-like-id-strings-without-mongodb),
 * which complies with [Mongo's specifications](https://www.mongodb.com/docs/manual/reference/method/ObjectId/).
 *
 * This function relies on `crypto.getRandomValues`, which must be polyfilled in react-native,
 * i.e. using https://github.com/LinusU/react-native-get-random-values#readme
 *
 * @returns A random, MongoDB-compliant Object ID
 */
export function objectId() {
  return hex(Date.now() / 1000) + randomHexString(8)
}

function hex(value: number): string {
  return Math.floor(value).toString(16)
}

/**
 * Generates a random hex string using the
 * [Web Crypto API](https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues).
 *
 * Based on https://gist.github.com/carlmjohnson/3c40e4d2d5529e05f65676bb054758d8 and
 * https://stackoverflow.com/questions/60738424/javascript-generate-random-hexadecimal.
 *
 * @param numBytes The number of bytes to generate. The resulting string will be of length `numBytes * 2`.
 * @returns Randomly generated hex string
 */
function randomHexString(numBytes: number): string {
  const bytes = new Uint8Array(numBytes)
  crypto.getRandomValues(bytes)
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
}
