import React from 'react';
import { Dispatch } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import { cityChange, sortTypeChange } from '../../store/action';
import { State } from '../../types/state';
import { Actions } from '../../types/action';
import { citiesList, sortType } from '../../const';
import cn from 'classnames';

const mapStateToProps = ({ activeCity, offers, activeSortType }: State) => ({
  activeCity,
  offers,
});

const mapDispatchToProps = (dispatch: Dispatch<Actions>) => ({
  onUserAnswer(city: string) {
    dispatch(cityChange(city));
    dispatch(sortTypeChange(sortType.popular));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function Tabs(props: PropsFromRedux): JSX.Element {
  const { activeCity, onUserAnswer } = props;

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
                    href="#"
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
export { Tabs };
export default connector(Tabs);
