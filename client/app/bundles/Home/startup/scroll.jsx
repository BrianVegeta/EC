const customUseScroll = ((prevRouterProps, { routes }) => {
  if (routes.some(route => route.ignoreScrollBehavior)) {
    return false;
  }

  if (routes.some(route => route.scrollToTop)) {
    return [0, 0];
  }
  if (routes.some(route => route.isCates)) {
    return [0, 330];
  }
  return true;
});
export default customUseScroll;
