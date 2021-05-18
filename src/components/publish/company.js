import PropTypes from 'prop-types';
import FieldInput from './fieldInput';

export default function Company({ state, onChange }) {
  return (
    <div className="group">
      <h2>Vos informations</h2>

      {/* companyEmail */}
      <FieldInput
        required
        helperText="Assurez-vous de saisir une adresse accessible. Nous vous y enverrons votre facture et un lien permettant d'éditer votre annonce. Cette adresse est privée."
        id="companyEmail"
        label="Adresse e-mail (privée)"
        placeholder="nom@entreprise.com"
        type="email"
        value={state.companyEmail}
        onChange={onChange}
      />

      {/* companyLink */}
      <FieldInput
        id="companyLink"
        label="Site Internet"
        pattern="https://.*"
        placeholder="https://"
        value={state.companyLink}
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

Company.propTypes = {
  state: PropTypes.shape({
    companyEmail: PropTypes.string,
    companyLink: PropTypes.string,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
};
