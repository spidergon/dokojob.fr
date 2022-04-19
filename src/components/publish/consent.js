import Checkbox from '@components/checkbox';
import Link from '@components/link';
import { useMyState } from '@lib/publishState';
import styles from '@styles/publish.module.css';

export default function Consent() {
  const { state, setState } = useMyState();

  return (
    <div className={styles.group}>
      <Checkbox
        required
        checked={state.consent}
        id="consent"
        onChange={() => setState('consent', !state.consent, false)}
      >
        <p>
          Vous acceptez notre{' '}
          <Link blank href="/mentions-legales/#privacy">
            politique des données personnelles
          </Link>
        </p>
      </Checkbox>
    </div>
  );
}
