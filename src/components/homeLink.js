import React from 'react';
import Link from './link';

export default function HomeLink() {
  return (
    <Link href="/" style={{ display: 'inline-block', marginTop: '1em' }}>
      ⬅ Retourner à la page d&rsquo;accueil
    </Link>
  );
}
