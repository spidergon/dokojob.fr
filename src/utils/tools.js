export function scrollToAnchor() {
  const anchor = document.getElementById('top-anchor');

  if (anchor) anchor.scrollIntoView({ behavior: 'smooth' });
}

// export const wait = (ms = 0) =>
//   new Promise((resolve) => {
//     setTimeout(resolve, ms);
//   });
