export default function (func, wait, immediate) {
  let timeout;
  return function inner() {
    const context = this;
    const later = function later() {
      timeout = null;
      if (!immediate) func.apply(context, [func, wait, immediate]);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, [func, wait, immediate]);
  };
}
