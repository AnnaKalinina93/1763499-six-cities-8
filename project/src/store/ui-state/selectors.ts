import { State } from '../../types/state';
import { NameSpace } from '../root-reduser';

export const getActiveCity = (state: State): string => state[NameSpace.Ui].activeCity;
export const getActiveSortType = (state: State): string => state[NameSpace.Ui].activeSortType;
