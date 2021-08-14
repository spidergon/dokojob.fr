export function scrollToAnchor() {
  const anchor = document.getElementById('top-anchor');

  if (anchor) anchor.scrollIntoView({ behavior: 'smooth' });
}

export function logoText(txt) {
  const [first, second, third] = txt.split(' ').slice(0, 3);
  let result = '';

  if (first && first.length > 0) result += first[0];
  if (second && second.length > 2) result += second[0];
  else if (third && third.length > 2) result += third[0];

  return result;
}

// export const wait = (ms = 0) =>
//   new Promise((resolve) => {
//     setTimeout(resolve, ms);
//   });
