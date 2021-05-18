import MainInfo from './mainInfo';
import Options from './options';
import Details from './details';
import Company from './company';
import { useMyState } from '@utils/publishState';
import { setStorage } from '@utils/storage';

export default function Publish() {
  const { state, setState } = useMyState();

  const onChange = (id, value) => {
    setState(id, value);
    setStorage(id, value);
  };

  return (
    <>
      <form className="container">
        <MainInfo state={state} onChange={onChange} />
        <Options setState={onChange} state={state} />
        <Details state={state} onChange={onChange} />
        <Company state={state} onChange={onChange} />
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
        .optionGroup {
          margin-top: 1em;
        }
      `}</style>
    </>
  );
}
