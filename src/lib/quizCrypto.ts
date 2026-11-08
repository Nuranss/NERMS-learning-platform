export const QUIZ_SALT = "nerms:ics:salt:ot_defense_2026";

/**
 * Computes a salted SHA-256 hash using the native Web Crypto API.
 */
export async function hashQuizAnswer(answer: string): Promise<string> {
  const normalized = answer.trim().toLowerCase();
  const data = new TextEncoder().encode(`${QUIZ_SALT}:${normalized}`);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

/**
 * Verifies if user input matches any of the pre-computed salted hashes.
 */
export async function verifyQuizAnswer(
  input: string,
  acceptedHashes: string[]
): Promise<boolean> {
  if (!input.trim() || !acceptedHashes || acceptedHashes.length === 0) {
    return false;
  }
  const inputHash = await hashQuizAnswer(input);
  return acceptedHashes.includes(inputHash);
}
