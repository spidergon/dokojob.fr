import { useState } from 'react';
import dynamic from 'next/dynamic';
import Description from './description';
import FieldInput from './fieldInput';
import { useMyState } from '@lib/publishState';

const Logo = dynamic(() => import('./logo'), {
  loading() {
    return <p>Chargement...</p>;
  },
  ssr: false,
});

export default function Details() {
  const { state, setState } = useMyState();

  const [isSourceLink, setIsSourceLink] = useState(true);

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
        <Description />
      </FieldInput>

      {/* Source */}
      <FieldInput
        helperText="Lien permettant aux candidats de répondre à votre annonce (https://)"
        id="source"
        label="Lien de votre annonce"
        pattern="https://.*"
        placeholder="https://"
        required={
          !!(
            (state.source && state.sourceEmail) ||
            ((isSourceLink || state.source) && !state.sourceEmail)
          )
        }
        style={{ color: !isSourceLink ? 'gray' : 'var(--black)' }}
        type="url"
        value={state.source}
        onChange={setState}
        onFocus={() => setIsSourceLink(true)}
      />

      <p style={{ marginTop: '1em', textAlign: 'center' }}>ou</p>

      {/* Source email */}
      <FieldInput
        helperText="Adresse e-mail (PUBLIQUE) permettant aux candidats de répondre à votre annonce si vous ne renseignez pas le lien ci-dessus"
        id="sourceEmail"
        label="E-mail de votre annonce"
        placeholder="postulez@entreprise.com"
        required={!!((!isSourceLink || state.sourceEmail) && !state.source)}
        style={{ marginTop: '1em', color: isSourceLink ? 'gray' : 'var(--black)' }}
        type="email"
        value={state.sourceEmail}
        onChange={setState}
        onFocus={() => setIsSourceLink(false)}
      />
    </div>
  );
}
