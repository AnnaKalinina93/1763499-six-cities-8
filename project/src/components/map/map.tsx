import React, { useRef, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import { Icon, Marker} from 'leaflet';
import { Offers } from '../../types/offers';
import useMap from '../../hooks/use-map';
import { URL_MARKER_DEFAULT, URL_MARKER_CURRENT } from '../../const';

type MapProps = {
  offers: Offers;
  activeId: string;
  typeCard: string;
  className: string;
};

const ICON_WIDTH = 30;
const ICON_HEIGHT = 40;

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [ICON_WIDTH, ICON_HEIGHT],
  iconAnchor: [15, 40],
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [ICON_WIDTH, ICON_HEIGHT],
  iconAnchor: [15, 40],
});

function Map({ offers, activeId, typeCard, className }: MapProps): JSX.Element {
  const cityActive = offers[0];
  const mapRef = useRef(null);
  const map = useMap(mapRef, cityActive);

  useEffect(() => {
    if (map) {
      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude,
        });

        marker
          .setIcon(
            activeId !== undefined && offer.id === activeId
              ? currentCustomIcon
              : defaultCustomIcon)
          .addTo(map);
      });
    }
  }, [map, offers, activeId]);

  useEffect(() => {
    const { city } = cityActive;
    map?.setView(
      [city.location.latitude, city.location.longitude],
      city.location.zoom);
  });

  return <section className={`${className} map`} ref={mapRef} data-testid="map"></section>;
}

export default Map;
