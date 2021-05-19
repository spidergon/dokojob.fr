import Company from './company';
import Details from './details';
import MainInfo from './mainInfo';
import Options from './options';
import Preview from './preview';
import { useMyState } from '@utils/publishState';

export default function Publish() {
  const { state } = useMyState();

  return (
    <>
      <Preview />
      <form className="container">
        <MainInfo />
        <Options />
        <Details />
        <Company />
        <div style={{ marginTop: '2em', textAlign: 'center' }}>
          <input className="btn" type="submit" value={`Créer mon annonce  ➔  ${state.price} €`} />
        </div>
      </form>

      <style global jsx>{`
        .group {
          background: #fff;
          margin-top: 1.5em;
          padding: 1em;
          border-radius: 6px;
          border: 1px solid #ddd;
        }
        .optionGroup {
          margin-top: 1.5em;
        }
        h2 {
          font-weight: 700;
          font-size: 14px;
          letter-spacing: 0.7px;
          text-transform: uppercase;
          text-decoration: underline;
        }
        h3 {
          font-weight: 700;
          margin-bottom: 0.5em;
        }
        .helperText {
          font-size: 14px;
          line-height: 1.66;
          letter-spacing: 0.03em;
          color: rgba(0, 0, 0, 0.54);
        }
      `}</style>
    </>
  );
}
