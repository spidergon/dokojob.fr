import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Job() {
  const { push } = useRouter();

  useEffect(() => {
    push('/');
  }, [push]);

  return <p>Redirection...</p>;
}
