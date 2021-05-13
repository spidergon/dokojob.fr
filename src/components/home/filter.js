import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { locations, codeToLabel, contractCodes } from '@utils/constant';

export default function Filter({ allJobs, jobs, setJobs }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(false);
  const [selectedLoc, setSelectedLoc] = useState({});
  const [selectedCode, setSelectedCode] = useState({});
  const [filteredLoc, setFilteredLoc] = useState([]);
  const [filteredCode, setFilteredCode] = useState([]);

  useEffect(() => {
    const newJobs = allJobs.filter((job) => {
      return selectedLoc[job.location.label] === true;
    });

    setFilteredLoc(newJobs);
  }, [allJobs, selectedLoc]);

  useEffect(() => {
    const newJobs = allJobs.filter((job) => {
      return selectedCode[job.contract.code] === true;
    });

    setFilteredCode(newJobs);
  }, [allJobs, selectedCode]);

  useEffect(() => {
    if (filteredLoc.length && filteredCode.length) {
      setJobs(filteredLoc.filter((v) => filteredCode.includes(v)));
    } else if (filteredLoc.length && !filteredCode.length) {
      setJobs(filteredLoc);
    } else if (!filteredLoc.length && filteredCode.length) {
      setJobs(filteredCode);
    } else setJobs(allJobs);
  }, [allJobs, filteredLoc, filteredCode, setJobs]);

  const setLocation = (loc, checked) => {
    setSelectedLoc((s) => ({ ...s, [loc]: checked }));
  };

  const setCode = (code, checked) => {
    setSelectedCode((s) => ({ ...s, [code]: checked }));
  };

  return (
    <div className={`wrapper flex${open ? ' open' : ''}`}>
      {!open && (
        <p
          style={{
            margin: '0 0.2rem 0 0',
            alignSelf: 'center',
            color: active ? '#3f51b5' : 'initial',
            fontWeight: active ? 'bold' : '',
            cursor: 'pointer',
          }}
          title={open ? 'Fermer' : 'Filtrer'}
          onClick={() => setOpen(!open)}
        >
          {active ? 'Filtre activé' : 'Filtrer'}
        </p>
      )}
      {open && (
        <div style={{ flexGrow: 1 }}>
          <p style={active ? { color: '#3f51b5', fontWeight: 'bold' } : {}}>
            {(jobs.length > 0 && (
              <>
                {jobs.length} offre{jobs.length > 1 ? 's' : ''}
              </>
            )) ||
              'Aucune offre'}
          </p>
          <p className="title">Pays</p>
          <div>
            {locations.map((loc, index) => (
              <label key={index} htmlFor={loc}>
                <input
                  checked={selectedLoc[loc]}
                  id={loc}
                  type="checkbox"
                  value={loc}
                  onChange={({ target }) => setLocation(loc, target.checked)}
                />
                {loc}
              </label>
            ))}
          </div>
          <p className="title">Contrats</p>
          <div>
            {contractCodes.map((code, index) => (
              <label key={index} htmlFor={code} title={codeToLabel[code]}>
                <input
                  checked={selectedCode[code]}
                  id={code}
                  type="checkbox"
                  value={code}
                  onChange={({ target }) => setCode(code, target.checked)}
                />
                {code}
              </label>
            ))}
          </div>
        </div>
      )}

      <div
        className="filterBtn flex"
        style={{ alignSelf: 'flex-start', cursor: 'pointer' }}
        title={open ? 'Fermer' : 'Filtrer'}
        onClick={() => setOpen(!open)}
      >
        {(open && (
          <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        )) || (
          <svg
            aria-hidden="true"
            className={active ? 'active' : ''}
            focusable="false"
            viewBox="0 0 24 24"
          >
            <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z" />
          </svg>
        )}
      </div>

      <style jsx>{`
        .wrapper {
          justify-content: flex-end;
          margin: 0.5em 0;
          padding: 0.5em;
        }
        .wrapper.open {
          background-color: rgba(0, 0, 0, 0.05);
          margin-bottom: 2em;
        }
        .title {
          margin: 1rem 0 0.5rem;
          border-bottom: 1px solid #dadce0;
        }
        svg {
          width: 1.5em;
          fill: var(--black);
        }
        svg.active {
          fill: #3f51b5;
        }
      `}</style>
    </div>
  );
}

Filter.propTypes = {
  jobs: PropTypes.array.isRequired,
  setJobs: PropTypes.func.isRequired,
};
