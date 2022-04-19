import FieldInput from './fieldInput';
import { contracts, locations } from '@lib/constants';
import { useMyState } from '@lib/publishState';
import styles from '@styles/publish.module.css';

export default function MainInfo() {
  const { state, setState } = useMyState();

  return (
    <div className={styles.group}>
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
      <div className={`flex ${styles.contractArea}`}>
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
          options={contracts}
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
    </div>
  );
}
