import { useEffect } from 'react';
import useSWR from 'swr';
import Link from '@components/link';
import { fetcher } from '@lib/tools';

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
          <div className="flex wcb">
            <div className="flex">
              <div className="wcb-c">{(data?.c && `${data.c}g de CO2/vue`) || `Chargement...`}</div>
              <Link blank className="wcb-link" href="https://websitecarbon.com">
                Website Carbon
              </Link>
            </div>
            {data?.p && <p>Plus propre que {data.p}% des pages testées</p>}
          </div>

          <style jsx>{`
            .wcb {
              flex-direction: column;
              align-items: center;
              gap: 0.5em;
              color: #0e11a8;
              font-size: 15px;
              line-height: 1.15;
            }
            .wcb-c {
              border: 0.13em solid #00ffbc;
              border-radius: 0.3em 0 0 0.3em;
              border-right: 0;
              min-width: 8.2em;
              padding: 0.3em 0.8em;
            }
          `}</style>
          <style global jsx>{`
            .wcb-link {
              font-weight: bold;
              border-color: #0e11a8;
              background-color: #0e11a8;
              color: #fff;
              border-radius: 0 0.3em 0.3em 0;
              padding: 0.3em 0.5em;
            }
            .wcb-link:hover,
            .wcb-link:focus {
              text-decoration: none;
              color: #fff;
            }
          `}</style>
        </section>
      )}
    </>
  );
}
