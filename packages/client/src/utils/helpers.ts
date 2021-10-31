/**
 * Returns a string ensuring the first letter as a capital letter
 *
 * @param msg The string to capitalize
 * @returns The capitalized string
 */
export const capitalize = (msg: string): string =>
  `${msg[0].toUpperCase()}${msg.substring(1)}`;
