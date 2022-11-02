import sanitizeHtml from 'sanitize-html';

/**
 * Purify dirty HTML.
 * @param {string | Node} dirty The dirty HTML.
 * @return The output HTML purified.
 */
export default function purify(dirty) {
  return sanitizeHtml(dirty);
}
