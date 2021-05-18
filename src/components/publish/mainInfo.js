import FieldInput from './fieldInput';
import { contractCodes, locations } from '@utils/constant';
import { useMyState } from '@utils/publishState';

export default function MainInfo() {
  const { state, setState } = useMyState();

  return (
    <div className="group info">
      {/* Intitulé */}
      <FieldInput
        autoFocus
        required
        id="companyName"
        label="Votre entreprise"
        placeholder="Nom de votre entreprise"
        style={{ marginTop: 0 }}
        value={state.companyName}
        onChange={setState}
      />
      {/* Intitulé */}
      <FieldInput
        required
        id="title"
        label="Intitulé de votre annonce"
        minLength={5}
        value={state.title}
        onChange={setState}
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
          onChange={setState}
        />
        {/* Type de contrat */}
        <FieldInput
          required
          id="contract"
          label="Type de contrat"
          options={contractCodes}
          type="select"
          value={state.contract}
          onChange={setState}
        />
      </div>
      {/* Duration */}
      {state.contract !== 'CDI' && (
        <FieldInput
          required
          id="duration"
          label="Durée du contrat"
          value={state.duration}
          onChange={setState}
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
