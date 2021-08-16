import { useMemo } from 'react';
import JobItem from '@components/jobItem';
import { useMyState } from '@lib/publishState';
import { logoText } from '@lib/tools';

export default function Preview() {
  const { state } = useMyState();

  const memoizedLogoText = useMemo(
    () => logoText(state.companyName || 'Entreprise'),
    [state.companyName]
  );

  const job = {
    ...state,
    companyName: state.companyName || 'Entreprise',
    title: state.title || "Intitulé de l'annonce",
    logo: state.logo?.preview ? state.logo.preview : null,
    logoText: memoizedLogoText,
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
          z-index: 10;
        }
      `}</style>
    </div>
  );
}
