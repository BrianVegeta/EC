const customUseScroll = ((prevRouterProps, { routes }) => {
  return [0, 0];
  if (routes.some(route => route.ignoreScrollBehavior)) {
    return false;
  }
  if (routes.some(route => route.scrollToTop)) {
    return [0, 0];
  }
  return true;
});
export default customUseScroll;
