import { createAction } from '@reduxjs/toolkit';
import { ActionType } from '../../types/action';

export const cityChange = createAction(
  ActionType.СityСhange,
  (city: string) => ({
    payload: city,
  }),
);

export const sortTypeChange = createAction(
  ActionType.SortTypeChange,
  (sortType: string) => ({
    payload: sortType,
  }),
);
