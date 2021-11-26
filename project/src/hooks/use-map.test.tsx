import { renderHook } from '@testing-library/react-hooks';
import { Map } from 'leaflet';
import { makeFakeOffer } from '../utils/mocks';
import useMap from './use-map';

const fakeOffer = makeFakeOffer();
describe('Hook: useMap', () => {

  it('should return Map', () => {
    const mockElement = document.createElement('div');
    const fakeMapRef = { current: mockElement };

    const {result} = renderHook(() =>
      useMap(fakeMapRef, fakeOffer),
    );

    const map = result.current;

    expect(map).toBeInstanceOf(Map);
  });
});
