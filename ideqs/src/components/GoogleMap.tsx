import GoogleMapReact from 'google-map-react'
import MarkerIc from '../assets/marker.svg'
import Image from 'next/image'
import { Points } from '../models/pointsModel'
import { useRef, useState, useEffect } from 'react'

const MapMarker = ({
  name = 'Hola',
  lat,
  lng
}: {
  lat: number
  lng: number
  name: string
}) => {
  const [mostrar, setMostrar] = useState(false)
  const tocado = mostrar ? 20 : 5
  return (
    <div
      style={{ zIndex: tocado }}
      onMouseEnter={() => {
        setMostrar(true)
      }}
      onMouseLeave={() => setMostrar(false)}
      className="contenedor-icono"
    >
      <Image
        src={MarkerIc}
        layout="fixed"
        className="icono"
        alt="marker"
        id={`${lat}-${lng}`}
      />
      <h2
        style={{ transition: '1s all ease' }}
        className={mostrar ? 'titulo sin-titulo' : 'titulo'}
      >
        {name || 'Punto'}
      </h2>
    </div>
  )
}

const GoogleMap = ({ data }: { data?: Points[] }) => {
  const mapRef = useRef<any | null>(null)
  const [mapReady, setMapReady] = useState(false)

  useEffect(() => {
    if (data && data.length > 0 && mapReady) {
      const newWindow: any = window
      const google: any = newWindow.google
      const bounds = new google.maps.LatLngBounds()
      data.forEach(({ latitud, longitud }) =>
        bounds.extend(new google.maps.LatLng(latitud, longitud))
      )
      mapRef.current.fitBounds(bounds)
    }
  }, [data, mapReady])
  return (
    <div style={{ height: '288px', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
          language: 'es',
          region: 'CO'
        }}
        yesIWantToUseGoogleMapApiInternals
        center={{ lat: 4.6649154, lng: -74.0667746 }}
        defaultZoom={15}
        onGoogleApiLoaded={({ map }) => {
          mapRef.current = map
          setMapReady(true)
        }}
      >
        {data?.map((point: Points) => (
          <MapMarker
            key={point.id}
            lat={point.latitud}
            lng={point.longitud}
            name={point.nombre}
          />
        ))}
      </GoogleMapReact>
    </div>
  )
}

export default GoogleMap
