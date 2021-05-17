import Layout from '@components/layout';
import Publish from '@components/publish';
import { StateProvider } from '@utils/publishState';

export default function PublishPage() {
  return (
    <Layout title="Publiez votre nouvelle offre d'emploi">
      <StateProvider>
        <Publish />
      </StateProvider>
    </Layout>
  );
}
