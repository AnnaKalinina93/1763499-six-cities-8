import React from 'react';
import { cityChange, sortTypeChange } from '../../store/ui-state/action';
import { citiesList, sortType } from '../../const';
import cn from 'classnames';
import { getActiveCity } from '../../store/ui-state/selectors';
import { useSelector, useDispatch } from 'react-redux';

function Tabs(): JSX.Element {
  const activeCity = useSelector(getActiveCity);
  const dispatch = useDispatch();
  const onUserAnswer = (city: string) => {
    dispatch(cityChange(city));
    dispatch(sortTypeChange(sortType.popular));
  };

  return (
    <React.Fragment>
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">
            {Object.entries(citiesList).map(([key, city]) => {
              const classList = cn('locations__item-link tabs__item', {
                'tabs__item--active': city === activeCity,
              });
              return (
                <li key={key} className="locations__item">
                  <a
                    className={classList}
                    href="/#"
                    onClick={(evt) => {
                      evt.preventDefault();
                      onUserAnswer(city);
                    }}
                  >
                    <span>{city}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </React.Fragment>
  );
}
export default Tabs;
