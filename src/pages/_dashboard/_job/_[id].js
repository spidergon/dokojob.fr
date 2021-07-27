import useSWR from 'swr';
import { useRouter } from 'next/router';
import Layout from '@components/layout';
import Publish from '@components/publish';
import { StateProvider } from '@utils/publishState';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function DashboardJob() {
  const router = useRouter();

  const { data, error } = useSWR(`/api/jobs/${router.query.id}`, fetcher);

  if (error) {
    console.error('An error has occurred:', error);
    router.push('/');
  }

  if (!data) return 'Chargement...';

  return (
    <Layout title="Votre annonce">
      <StateProvider>
        <Publish edit data={data} />
      </StateProvider>
    </Layout>
  );
}
