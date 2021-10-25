import React from 'react';
import {Dispatch} from 'redux';
import {connect, ConnectedProps} from 'react-redux';
import {cityChange} from '../../store/action';
import {State} from '../../types/state';
import {Actions} from '../../types/action';
import { citiesList } from '../../const';

const mapStateToProps = ({activeCity, offers}: State) => ({
  activeCity,
  offers,
});

const mapDispatchToProps = (dispatch: Dispatch<Actions>) => ({
  onUserAnswer(city:string) {
    dispatch(cityChange(city));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function Tabs(props: PropsFromRedux): JSX.Element {
  const {activeCity , onUserAnswer} = props;
  return (
    <React.Fragment>
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">
            {
              Object.entries(citiesList).map(([key,city])=>
                (
                  <li key={key} className="locations__item">
                    <a className={`locations__item-link tabs__item ${city === activeCity? 'tabs__item--active' : ''}`} href="#" onClick={(evt)=>{
                      evt.preventDefault();
                      onUserAnswer(city);
                    }}
                    >
                      <span>{city}</span>
                    </a>
                  </li>))
            }
          </ul>
        </section>
      </div>
    </React.Fragment>
  );
}
export {Tabs};
export default connector(Tabs);

