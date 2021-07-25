import Checkbox from '@components/checkbox';
import Link from '@components/link';
import { useMyState } from '@utils/publishState';

export default function Consent() {
  const { state, setState } = useMyState();

  return (
    <div className="group">
      <Checkbox
        required
        checked={state.consent}
        id="consent"
        onChange={() => setState('consent', !state.consent, false)}
      >
        <p>
          Vous acceptez nos{' '}
          <Link blank noprefetch href="/mentions-legales#publier">
            conditions générales d&rsquo;utilisation
          </Link>
        </p>
      </Checkbox>
    </div>
  );
}