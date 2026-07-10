declare global {
  interface Window {
    fbq: (...args: any[]) => void;
  }
}

export const fbqEvent = (name: string, options = {}) => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("trackCustom", name, options);
  }
};
