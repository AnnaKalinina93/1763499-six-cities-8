import { sortType } from '../../const';
import { Dispatch } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import { sortTypeChange } from '../../store/action';
import { State } from '../../types/state';
import { Actions } from '../../types/action';
import cn from 'classnames';
import { useState } from 'react';

const mapStateToProps = ({ activeCity, offers, activeSortType }: State) => ({
  activeCity,
  offers,
  activeSortType,
});

const mapDispatchToProps = (dispatch: Dispatch<Actions>) => ({
  onUserAnswer(currentSortType: string) {
    dispatch(sortTypeChange(currentSortType));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function Sorting(props: PropsFromRedux): JSX.Element {
  const { activeSortType, onUserAnswer } = props;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span className="places__sorting-type" tabIndex={0} onClick={() => setIsOpen(!isOpen)}>
        {activeSortType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isOpen? 'places__options--opened': ''}`}>
        {Object.entries(sortType).map(([key, currentType]) => {
          const activeClass = cn('places__option', {
            'places__option--active': activeSortType === currentType,
          });
          return (
            <li
              key={key}
              className={activeClass}
              tabIndex={0}
              onClick={(evt)=> {
                evt.preventDefault();
                onUserAnswer(currentType);
                setIsOpen(!isOpen);
              }}
            >
              {currentType}
            </li>
          );
        })}
      </ul>
    </form>
  );
}

export {Sorting};
export default connector(Sorting);
