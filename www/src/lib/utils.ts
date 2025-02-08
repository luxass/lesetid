type TextFn = (text: string) => void;

export function debounce(fn: TextFn, ms: number) {
  let timer: number | NodeJS.Timeout;
  return function (...args: string[]) {
    const later = () => {
      clearTimeout(timer);
      fn(args[0]);
    };
    clearTimeout(timer);
    timer = setTimeout(later, ms);
  };
}
