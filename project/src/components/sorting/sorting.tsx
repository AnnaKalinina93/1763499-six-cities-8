import { sortType } from '../../const';
import { useDispatch, useSelector } from 'react-redux';
import { sortTypeChange } from '../../store/action';
import cn from 'classnames';
import { useState } from 'react';
import { getActiveSortType } from '../../store/main-data/selectors';

function Sorting(): JSX.Element {

  const activeSortType = useSelector(getActiveSortType);

  const dispatch = useDispatch();

  const  onUserAnswer = (currentSortType: string) => {
    dispatch(sortTypeChange(currentSortType));
  };

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

export default Sorting;

