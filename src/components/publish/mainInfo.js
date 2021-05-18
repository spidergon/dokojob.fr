import PropTypes from 'prop-types';
import { contractCodes, locations } from '@utils/constant';
import FieldInput from './fieldInput';

export default function MainInfo({ state, onChange }) {
  return (
    <div className="group">
      {/* Intitulé */}
      <FieldInput
        autoFocus
        required
        id="companyName"
        label="Votre entreprise"
        placeholder="Nom de votre entreprise"
        value={state.companyName}
        onChange={onChange}
      />
      {/* Intitulé */}
      <FieldInput
        required
        id="title"
        label="Intitulé de votre annonce"
        minLength={5}
        value={state.title}
        onChange={onChange}
      />
      <div className="contractArea flex">
        {/* Région ou territoire */}
        <FieldInput
          required
          id="location"
          label="Région ou territoire"
          options={locations}
          type="select"
          value={state.location}
          onChange={onChange}
        />
        {/* Type de contrat */}
        <FieldInput
          required
          id="contract"
          label="Type de contrat"
          options={contractCodes}
          type="select"
          value={state.contract}
          onChange={onChange}
        />
      </div>
      {/* Duration */}
      {state.contract !== 'CDI' && (
        <FieldInput
          required
          id="duration"
          label="Durée du contrat"
          value={state.duration}
          onChange={onChange}
        />
      )}

      <style jsx>{`
        .contractArea {
          flex-direction: column;
        }
        @media (min-width: 601px) {
          .contractArea {
            flex-direction: row;
            gap: 1em;
          }
        }
      `}</style>
    </div>
  );
}

MainInfo.propTypes = {
  state: PropTypes.shape({
    companyName: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    contract: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
};
