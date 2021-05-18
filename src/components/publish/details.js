import FieldInput from './fieldInput';
import Logo from './logo';
import { useMyState } from '@utils/publishState';

export default function Details() {
  const { state, setState } = useMyState();

  return (
    <div className="group">
      <h2>Détails de votre annonce</h2>

      {/* Logo */}
      <FieldInput id="logo" label="Logo de votre entreprise">
        <Logo />
      </FieldInput>

      {/* Salary */}
      <FieldInput
        helperText="Les moteurs de recherche référencient mieux les annonces qui indiquent le salaire (annuel brut de préférence)"
        id="salary"
        label="Salaire"
        value={state.salary}
        onChange={setState}
      />

      {/* Description */}
      <FieldInput id="description" label="Description*">
        <textarea required cols="30" id="description" rows="10" />
      </FieldInput>

      {/* Source */}
      <FieldInput
        helperText="Lien permettant aux candidats de répondre à votre annonce (https://)"
        id="source"
        label="Lien de votre annonce*"
        pattern="https://.*"
        placeholder="https://"
        value={state.source}
        onChange={setState}
      />

      {/* Source email */}
      <FieldInput
        helperText="Adresse e-mail (PUBLIQUE) permettant aux candidats de répondre à votre annonce si vous ne renseignez pas le lien ci-dessus"
        id="sourceEmail"
        label="E-mail de votre annonce*"
        placeholder="postulez@entreprise.com"
        type="email"
        value={state.sourceEmail}
        onChange={setState}
      />

      <style jsx>{`
         {
          /* label {
          text-transform: uppercase;
          font-weight: 700;
          font-size: 14px;
          letter-spacing: 0.7px;
        } */
        }
      `}</style>
    </div>
  );
}
