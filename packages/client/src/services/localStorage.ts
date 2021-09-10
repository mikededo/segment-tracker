type LS = {
  get: (k: string) => string | null;
  set: (k: string, v: any) => void;
};

export default {
  get: (k: string) => localStorage.getItem(k),
  set: (k: string, v: any) => localStorage.setItem(k, v),
} as LS;
