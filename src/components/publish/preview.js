import PropTypes from 'prop-types';
import { useMyState } from '@utils/publishState';

export default function Preview() {
  const { state } = useMyState();

  return (
    <div className="container">
      Preview
      <style jsx>{`
        .container {
        }
      `}</style>
    </div>
  );
}
