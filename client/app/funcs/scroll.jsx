const scrollTo = (scroller, to, duration) => {
  const start = scroller.getScrollTop();
  const change = to - start;
  let currentTime = 0;
  const increment = 20;
  const animateScroll = () => {
    currentTime += increment;
    const val = Math.easeOutQuad(currentTime, start, change, duration);
    scroller.scrollTop(val);
    if (currentTime < duration) {
      setTimeout(animateScroll, increment);
    }
  };
  animateScroll();
};

Math.easeOutQuad = (t, b, c, d) => (
  (-c * (t /= d) * (t - 2)) + b
);

export default scrollTo;
