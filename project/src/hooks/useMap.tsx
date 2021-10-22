import { useEffect, useState, MutableRefObject } from 'react';
import leaflet from 'leaflet';
import { Map, TileLayer } from 'leaflet';
import { Offer } from '../types/offers';

const ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';
const LAYER = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';

function useMap(
  mapRef: MutableRefObject<HTMLElement | null>,
  offer: Offer) : Map | null {

  const [map, setMap] = useState<Map | null>(null);

  useEffect(() => {
    if (mapRef.current !== null && map === null) {
      const instance = leaflet.map(mapRef.current, {
        center: {
          lat: offer.city.location.latitude,
          lng: offer.city.location.longitude,
        },
        zoom: offer.city.location.zoom,
      });

      const layer = new TileLayer(
        LAYER,
        {
          attribution:
            ATTRIBUTION });

      instance.addLayer(layer);

      setMap(instance);
    }
  }, [mapRef, map, offer]);

  return map;
}

export default useMap;
