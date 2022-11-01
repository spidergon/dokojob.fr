import { default as NextLink } from 'next/link';
import PropTypes from 'prop-types';

export default function Link({ blank, children, href, noprefetch, ...other }) {
  const A = blank ? (
    <a
      aria-label={`${href} (s’ouvre dans un nouvel onglet)`}
      href={href}
      rel="noreferrer noopener nofollow"
      target="_blank"
      {...other}
    >
      {children}
    </a>
  ) : (
    <a href={href} {...other}>
      {children}
    </a>
  );

  // Tailor the following test to your environment.
  // This example assumes that any internal link (intended for NextJs)
  // will start with exactly one slash, and that anything else is external.
  const internal = /^\/(?!\/)/.test(href);

  // Use NextJs Link for internal links, and <a> for others
  if (internal && !blank) {
    const file = /\.[0-9a-z]+$/i.test(href);

    // if (file || noprefetch) return A;
    if (file) return A;

    if (noprefetch) {
      return (
        <NextLink href={href} prefetch={false} {...other}>
          {children}
        </NextLink>
      );
    }

    return (
      <NextLink href={href} {...other}>
        {children}
      </NextLink>
    );
  }

  return A;
}

Link.propTypes = {
  blank: PropTypes.bool,
  children: PropTypes.node.isRequired,
  href: PropTypes.string.isRequired,
  noprefetch: PropTypes.bool,
};
