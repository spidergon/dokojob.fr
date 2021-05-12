import DOMPurify from 'isomorphic-dompurify';

/**
 * Purify dirty HTML.
 * @param {string | Node} dirty The dirty HTML.
 * @return The output HTML purified.
 */
export default function purify(dirty) {
  return DOMPurify.sanitize(dirty);
}
