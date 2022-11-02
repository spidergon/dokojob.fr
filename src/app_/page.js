'use client';

import Footer from './footer';
import Header from './header';
import Hero from '@components/home/hero';
import Jobs from '@components/home/jobs';

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Jobs />
      </main>
      <Footer />
    </>
  );
}
