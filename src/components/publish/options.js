import React from 'react';
// import PropTypes from 'prop-types';

export default function Options() {
  return (
    <div className="group">
      <h2>Choisissez vos options</h2>
      <label htmlFor="default" title="Option par défaut">
        <input checked id="default" type="checkbox" />
        Mon annonce est visible pendant <strong>30 jours&nbsp;&nbsp;➔&nbsp;&nbsp;0€</strong>
      </label>

      <h3>Choisissez la couleur de votre annonce (option non disponible actuellement) :</h3>
      <label htmlFor="feature1">
        <input id="feature1" type="checkbox" />
        Mon annonce mise en avant en jaune
      </label>
      <br />
      <label htmlFor="feature2">
        <input id="feature2" type="checkbox" />
        Mon annonce à la couleur de mon entreprise
        <input name="colorPicker" style={{ marginLeft: '0.5rem' }} type="color" />
      </label>
    </div>
  );
}
