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
      {/* Salary */}
      <FieldInput
        helperText="Les moteurs de recherche référencient mieux les annonces qui indiquent le salaire (annuel brut de préférence)"
        id="salary"
        label="Salaire"
        value={state.salary}
        onChange={onChange}
      />
      {/* Source */}
      <FieldInput
        required
        helperText="Lien permettant aux candidats de répondre à votre annonce (https://)"
        id="source"
        label="Lien de votre annonce"
        pattern="https://.*"
        placeholder="https://"
        value={state.source}
        onChange={onChange}
      />

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
    title: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    contract: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
    salary: PropTypes.string.isRequired,
    source: PropTypes.string.isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
};
