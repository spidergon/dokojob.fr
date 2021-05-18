import PropTypes from 'prop-types';
import FieldInput from './fieldInput';

export default function Details({ state, onChange }) {
  return (
    <div className="group">
      <h2>Détails de votre annonce</h2>

      <div className="optionGroup">
        <h3>Logo de votre entreprise</h3>
        Logo
      </div>

      {/* Salary */}
      <FieldInput
        helperText="Les moteurs de recherche référencient mieux les annonces qui indiquent le salaire (annuel brut de préférence)"
        id="salary"
        label="Salaire"
        value={state.salary}
        onChange={onChange}
      />

      <label htmlFor="description">Description*</label>
      <br />
      <textarea required cols="30" id="description" rows="10" />

      {/* Source */}
      <FieldInput
        helperText="Lien permettant aux candidats de répondre à votre annonce (https://)"
        id="source"
        label="Lien de votre annonce*"
        pattern="https://.*"
        placeholder="https://"
        value={state.source}
        onChange={onChange}
      />

      {/* Source email */}
      <FieldInput
        helperText="Adresse e-mail (PUBLIQUE) permettant aux candidats de répondre à votre annonce si vous ne renseignez pas le lien ci-dessus"
        id="sourceEmail"
        label="E-mail de votre annonce*"
        placeholder="postulez@entreprise.com"
        type="email"
        value={state.sourceEmail}
        onChange={onChange}
      />

      <style jsx>{`
        h2 {
          font-weight: 700;
          font-size: 14px;
          letter-spacing: 0.7px;
          text-transform: uppercase;
          text-decoration: underline;
        }
        h3 {
          font-weight: 700;
          margin-bottom: 0.5em;
        }
        label {
          text-transform: uppercase;
          font-weight: 700;
          font-size: 14px;
          letter-spacing: 0.7px;
        }
      `}</style>
    </div>
  );
}

Details.propTypes = {
  state: PropTypes.shape({
    salary: PropTypes.string,
    description: PropTypes.string,
    source: PropTypes.string,
    sourceEmail: PropTypes.string,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
};
