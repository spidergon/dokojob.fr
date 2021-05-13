export function scrollToAnchor() {
  const anchor = document.getElementById('top-anchor');

  if (anchor) anchor.scrollIntoView({ behavior: 'smooth' });
}
