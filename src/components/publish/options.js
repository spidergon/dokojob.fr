import { useState } from 'react';
import Checkbox from '@components/checkbox';
import { useMyState } from '@lib/publishState';
import { PRICE1, PRICE2 } from '@lib/constants';
import styles from '@styles/publish.module.css';

const YELLOW = '#fff9c9';
const RED = '#f5a4a4';

export default function Options() {
  const { state, setState } = useMyState();

  const [pickerColor, setPickerColor] = useState(state.color || RED);

  const handleOptionChange = ({ target }) => {
    setState(target.id, target.checked);
    if (target.id === 'option1') {
      if (target.checked) setState('color', YELLOW);
      else setState('color', '');
      setState('option2', false);
      setPickerColor(RED);
    }
    if (target.id === 'option2') {
      if (target.checked) setState('color', pickerColor);
      else {
        setState('color', '');
        setPickerColor(RED);
      }
      setState('option1', false);
    }
    if (target.id === 'option3') {
      setState('option4', false);
    }
    if (target.id === 'option4') {
      setState('option3', false);
    }
  };

  const handleColorPickerChange = ({ target }) => {
    setState('color', target.value);
    setPickerColor(target.value);
  };

  const handleColorPickerClick = () => {
    setState('option2', true);
    setState('option1', false);
    setState('color', pickerColor);
  };

  return (
    <div className={styles.group}>
      <h2>Choisissez vos options</h2>

      <div className={styles.optionGroup}>
        <Checkbox checked readOnly id="option0" title="Option sélectionnée par défaut">
          <p>
            Mon annonce est visible pendant{' '}
            <strong>30&nbsp;jours&nbsp;&nbsp;➔&nbsp;&nbsp;0&nbsp;€</strong>
          </p>
        </Checkbox>
      </div>

      <div className={styles.optionGroup}>
        <h3>Choisissez la couleur de votre annonce&nbsp;:</h3>
        <Checkbox checked={!!state.option1} id="option1" onChange={handleOptionChange}>
          <p>
            Mon annonce mise en avant en jaune{' '}
            <strong>
              ➔&nbsp;&nbsp;<span className="strike">{PRICE1}&nbsp;€</span>
              &nbsp;&nbsp;0&nbsp;€
            </strong>
          </p>
        </Checkbox>
        <Checkbox checked={!!state.option2} id="option2" onChange={handleOptionChange}>
          <p>
            Mon annonce à la couleur de mon entreprise{' '}
            <strong>
              ➔&nbsp;&nbsp;<span className="strike">{PRICE2}&nbsp;€</span>
              &nbsp;&nbsp;0&nbsp;€
            </strong>
          </p>
          <input
            name="colorPicker"
            style={{ marginLeft: '1em' }}
            type="color"
            value={pickerColor}
            onChange={handleColorPickerChange}
            onClick={handleColorPickerClick}
          />
        </Checkbox>
      </div>

      <div className={styles.optionGroup} style={{ color: 'gray' }}>
        <h3>
          <span className="strike">Placez votre annonce en pole position&nbsp;:</span> (bientôt
          disponible)
        </h3>
        <Checkbox disabled checked={!!state.option3} id="option3" onChange={handleOptionChange}>
          <p>
            Mon annonce parmi les 10 premières de la liste pendant <strong>7&nbsp;jours</strong>
          </p>
        </Checkbox>
        <Checkbox disabled checked={!!state.option4} id="option4" onChange={handleOptionChange}>
          <p>
            Mon annonce parmi les 10 premières de la liste pendant <strong>15&nbsp;jours</strong>
          </p>
        </Checkbox>
      </div>
    </div>
  );
}
