import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../../services/api';
import { APIRoute } from '../../const';
import { State } from '../../types/state';
import { makeFakeComment, makeFakeServerReview } from '../../utils/mocks';
import { adaptComments } from '../../services/adapter';
import { fetchComments, postComments } from './api-action';
import { commentsRequest, commentsSucceeded, postReviewReset, postReviewSucceeded } from './action';

describe('Async comments data actions', () => {
  const onFakeUnauthorized = jest.fn();
  const api = createAPI(onFakeUnauthorized());
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);

  it('should comments when server return 200', async () => {
    const store = mockStore();
    const fakeComments = new Array(2).fill(null).map(() => (makeFakeServerReview()));
    const comments = fakeComments.map((comment) => adaptComments(comment));
    const id = '3';
    mockAPI
      .onGet(`${APIRoute.Comments}/${id}`)
      .reply(200, fakeComments);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchComments(id));

    expect(store.getActions()).toEqual([
      commentsRequest(),
      commentsSucceeded(comments),
    ]);
  });

  it('should post comment on server and return new reviews', async () => {
    const store = mockStore();
    const fakePostComment = makeFakeComment();
    const newComment = makeFakeServerReview();
    newComment.comment = fakePostComment.comment;
    newComment.rating = Number(fakePostComment.rating);
    const fakeComments = [makeFakeServerReview(), makeFakeServerReview(), newComment];
    const comments = fakeComments.map((comment) => adaptComments(comment));
    const id = '3';
    mockAPI
      .onPost(`${APIRoute.Comments}/${id}`)
      .reply(200, fakeComments);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(postComments(id, fakePostComment));

    expect(store.getActions()).toEqual([
      postReviewSucceeded(comments),
      postReviewReset(),
    ]);
  });

});
