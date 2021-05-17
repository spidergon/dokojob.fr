import MainInfo from './mainInfo';
import Options from './options';
import { useMyState } from '@utils/publishState';
import { setStorage } from '@utils/storage';

export default function Publish() {
  const { state, setState } = useMyState();

  const onChange = ({ target }) => {
    setState(target.id, target.value);
    setStorage(target.id, target.value);
  };

  return (
    <>
      <form className="container">
        <MainInfo state={state} onChange={onChange} />
        <Options state={state} onChange={onChange} />
        <div style={{ marginTop: '2em', textAlign: 'center' }}>
          <input className="btn" type="submit" value={`Créer mon annonce  ➔  ${state.price} €`} />
        </div>
      </form>

      <style global jsx>{`
        .group {
          background: #fff;
          margin-top: 1em;
          padding: 1em;
          border-radius: 6px;
          border: 1px solid #ddd;
        }
        .field:not(:first-of-type),
        .contractArea .field {
          margin-top: 2em;
        }
      `}</style>
    </>
  );
}
