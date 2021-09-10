/**
 * Returns a message ensuring the first letter as a capital letter
 *
 * @param msg The error message to parse
 * @returns The parsed error message
 */
export const getErrorMessage = (msg: string): string =>
  `${msg[0].toUpperCase()}${msg.substring(1)}`;
