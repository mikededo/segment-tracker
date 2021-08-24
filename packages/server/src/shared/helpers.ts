/**
 * Helper to be used in toJson.transform prop of the different schemas
 */
export const baseSerializer = (doc: any, ret: any) => {
  if (ret._id) {
    delete ret._id;
  }

  return ret;
};
