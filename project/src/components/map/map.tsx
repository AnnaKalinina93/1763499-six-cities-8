import React, { useRef, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import { Icon, Marker} from 'leaflet';
import { Offers } from '../../types/offers';
import useMap from '../../hooks/useMap';
import { URL_MARKER_DEFAULT, URL_MARKER_CURRENT, TypeCard } from '../../const';
import cn from 'classnames';

type MapProps = {
  offers : Offers,
  activeId : string,
  typeCard : string,
}

const ICON_WIDTH = 40;
const ICON_HEIGHT = 40;

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [ICON_WIDTH, ICON_HEIGHT],
  iconAnchor: [20, 40],
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize:  [ICON_WIDTH, ICON_HEIGHT],
  iconAnchor: [20, 40],
});


function Map( { offers, activeId, typeCard }: MapProps) :JSX.Element {

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
              : defaultCustomIcon )
          .addTo(map);
      });
    }

  }, [map, offers, activeId]);

  const mapClass = cn(typeCard === TypeCard.Property ? 'property__map': 'cities__map' ,'map');

  useEffect(() => {
    const {city} = cityActive;
    map?.setView([city.location.latitude, city.location.longitude], city.location.zoom);
  });

  return (
    <section
      className={mapClass}
      ref={mapRef}
    >
    </section>
  );
}


export default Map;
