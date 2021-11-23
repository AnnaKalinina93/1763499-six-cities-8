import { uiState } from './ui-state';
import { cityChange, sortTypeChange } from './action' ;
import { sortType, citiesList } from '../../const';

describe('Reduser: UiState', () => {
  it('should add correct cite in state', () => {
    const state = {
      activeCity: citiesList.Paris,
      activeSortType: sortType.popular,
    };
    expect(uiState(state, cityChange(citiesList.Amsterdam)))
      .toEqual({
        activeCity: citiesList.Amsterdam,
        activeSortType: sortType.popular,
      });
  });

  it('should add correct sorting type in state', () => {
    const state = {
      activeCity: citiesList.Paris,
      activeSortType: sortType.popular,
    };
    expect(uiState(state, sortTypeChange(sortType.topRated)))
      .toEqual({
        activeCity: citiesList.Paris,
        activeSortType: sortType.topRated,
      });
  });
});
