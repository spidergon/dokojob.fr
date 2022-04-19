import { useEffect } from 'react';
import useSWR from 'swr';
import Link from '@components/link';
import { fetcher } from '@lib/tools';
import styles from '@styles/carbonBadge.module.css';

export default function CarbonBadge() {
  const { data, error } = useSWR('https://api.websitecarbon.com/b?url=https://dokojob.fr', fetcher);

  useEffect(() => {
    if (error) console.log(error);
    if (data?.error) console.log(data);
  }, [data, error]);

  return (
    <>
      {!error && (
        <section>
          <div className={`flex ${styles.wcb}`}>
            <div className="flex">
              <div className={styles.wcb_c}>
                {(data?.c && `${data.c}g de CO2/vue`) || `Chargement...`}
              </div>
              <Link blank className={styles.wcb_link} href="https://websitecarbon.com">
                Website Carbon
              </Link>
            </div>
            {data?.p && <p>Plus propre que {data.p}% des pages testées</p>}
          </div>
        </section>
      )}
    </>
  );
}
