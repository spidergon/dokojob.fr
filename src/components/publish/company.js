import FieldInput from './fieldInput';
import { useMyState } from '@utils/publishState';

export default function Company() {
  const { state, setState } = useMyState();

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
        onChange={setState}
      />

      {/* companyLink */}
      <FieldInput
        id="companyLink"
        label="Site Internet"
        pattern="https://.*"
        placeholder="https://"
        value={state.companyLink}
        onChange={setState}
      />

      <style jsx>{`
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
