import FieldInput from './fieldInput';
import { useMyState } from '@lib/publishState';

export default function Company() {
  const { state, setState } = useMyState();

  return (
    <div className="group">
      <h2>Vos informations</h2>

      {/* companyTwitter */}
      <FieldInput
        helperText="Identifiant Twitter sans '@'. Utilisé pour tagger votre entreprise quand nous posterons votre annonce sur Twitter"
        id="companyTwitter"
        label="Compte Twitter"
        placeholder="Identifiant"
        value={state.companyTwitter}
        onChange={setState}
      />

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

      {/* companyUrl */}
      <FieldInput
        helperText="Site Internet de votre entreprise"
        id="companyUrl"
        label="Site Internet"
        pattern="https://.*"
        placeholder="https://"
        type="url"
        value={state.companyUrl}
        onChange={setState}
      />
    </div>
  );
}
