import JobItem from '@components/jobItem';
import { useMyState } from '@utils/publishState';
import { logoText } from '@utils/tools';

export default function Preview() {
  const { state } = useMyState();

  const job = {
    ...state,
    companyName: state.companyName || 'Entreprise',
    title: state.title || "Intitulé de l'annonce",
    logo: state.logo?.preview ? state.logo.preview : null,
    logoText: logoText(state.companyName || 'Entreprise'),
    createdAt: '1 h',
  };

  return (
    <div className="container">
      <JobItem preview job={job} />

      <style jsx>{`
        .container {
          position: sticky;
          top: 0;
          background: var(--white);
          z-index: 1;
        }
      `}</style>
    </div>
  );
}
