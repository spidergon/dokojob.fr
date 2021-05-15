import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import CheckBox from '@components/checkbox';
import { locations, codeToLabel, contractCodes } from '@utils/constant';

function isChecked(selected) {
  return Object.values(selected).find((v) => v === true);
}

function toObj(arr) {
  const obj = {};

  arr.forEach((item) => {
    obj[item] = false;
  });

  return obj;
}

export default function Filter({ allJobs, jobs, setJobs }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(false);
  const [selectedLoc, setSelectedLoc] = useState(toObj(locations));
  const [selectedCode, setSelectedCode] = useState(toObj(contractCodes));
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
    const isLocChecked = isChecked(selectedLoc);
    const isCodeChecked = isChecked(selectedCode);

    if (isLocChecked && isCodeChecked) {
      setJobs(filteredLoc.filter((v) => filteredCode.includes(v)));
    } else if (isLocChecked && !isCodeChecked) {
      setJobs(filteredLoc);
    } else if (!isLocChecked && isCodeChecked) {
      setJobs(filteredCode);
    } else {
      setJobs(allJobs);
    }
    setActive(isLocChecked || isCodeChecked);
  }, [allJobs, filteredCode, filteredLoc, selectedCode, selectedLoc, setJobs]);

  const setLocation = (loc, checked) => {
    setSelectedLoc((s) => ({ ...s, [loc]: checked }));
  };

  const setCode = (code, checked) => {
    setSelectedCode((s) => ({ ...s, [code]: checked }));
  };

  return (
    <div className={`wrapper flex ${open ? 'open' : ''}`}>
      {open && (
        <div style={{ width: '100%' }}>
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
              <CheckBox key={index} action={setLocation} checked={selectedLoc[loc]} id={loc} />
            ))}
          </div>
          <p className="title">Contrats</p>
          <div>
            {contractCodes.map((code, index) => (
              <CheckBox
                key={index}
                action={setCode}
                checked={selectedCode[code]}
                id={code}
                title={codeToLabel[code]}
              />
            ))}
          </div>
        </div>
      )}
      <button
        className={`filterBtn flex ${active ? 'active' : ''}`}
        title={open ? 'Fermer' : 'Filtrer'}
        onClick={() => setOpen(!open)}
      >
        {(open && (
          <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        )) || (
          <>
            {active ? 'Filtre activé' : 'Filtrer'}
            <svg
              aria-hidden="true"
              className={active ? 'active' : ''}
              focusable="false"
              viewBox="0 0 24 24"
            >
              <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z" />
            </svg>
          </>
        )}
      </button>

      <style jsx>{`
        .wrapper {
          min-height: 1.5em;
          padding: 0.5em;
          margin-bottom: 1em;
        }
        .wrapper.open {
          background-color: rgba(0, 0, 0, 0.05);
          margin-bottom: 2em;
        }
        .title {
          margin: 1rem 0 0.5rem;
          border-bottom: 1px solid #dadce0;
        }
        .filterBtn {
          position: absolute;
          right: 0;
          top: 0;
          gap: 0.5em;
          padding: 0.5em;
          border: none;
          background: transparent;
        }
        .filterBtn.active {
          color: #3f51b5;
          font-weight: bold;
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
  allJobs: PropTypes.array.isRequired,
  jobs: PropTypes.array.isRequired,
  setJobs: PropTypes.func.isRequired,
};
