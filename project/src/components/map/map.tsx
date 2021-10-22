import React, { useRef, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import { Icon, Marker} from 'leaflet';
import { Offers } from '../../types/offers';
import useMap from '../../hooks/useMap';
import { URL_MARKER_DEFAULT, URL_MARKER_CURRENT, ICON_SIZE } from '../../const';

type MapProps = {
  offers : Offers,
  activeId : string,
  className : string,
}

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: ICON_SIZE,
  iconAnchor: [20, 40],
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: ICON_SIZE,
  iconAnchor: [20, 40],
});

function Map( { offers, activeId, className }: MapProps) :JSX.Element {

  const mapRef = useRef(null);
  const map = useMap(mapRef, offers[0]);

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

  return (
    <section
      className={`${className}__map map`}
      ref={mapRef}
    >
    </section>
  );
}


export default Map;
