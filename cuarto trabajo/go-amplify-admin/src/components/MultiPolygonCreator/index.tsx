import React, { useEffect, useState } from 'react'
import { MapContainer, Polygon, TileLayer, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import Button from '../Button'
import { toast } from 'react-toastify'
import { geoJSON, GeoJSON, latLngBounds, LatLngBounds } from 'leaflet';

const purpleOptions = { color: 'purple' }
const limeOptions = { color: 'lime' }

function CreatePolygon({ addCoord }: any) {
    useMapEvents({
        click: (a) => {
            addCoord([a.latlng.lat, a.latlng.lng])
        }
    })
    return null
}

interface MultiPolygonCreatorProps {
    multiPolygon: number[][][];
    setMultiPolygon: (newMultiPolygon: number[][][]) => void;
    viewOnly?: boolean
}

const MultiPolygonCreator = ({ multiPolygon, setMultiPolygon, viewOnly = false }: MultiPolygonCreatorProps) => {
    const [polygonToAdd, setPolygonToAdd] = useState<any>(null);
    const [bounds, setBounds] = useState<LatLngBounds | null | "checking">("checking")

    const startAdding = () => {
        setPolygonToAdd([]);
    }

    const cancelAdding = () => {
        setPolygonToAdd(null);
    }

    const addNewPolygon = () => {
        if (polygonToAdd.length < 3) {
            toast.warning("Debe seleccionar al menos 3 puntos");
            return
        }
        setMultiPolygon([...multiPolygon, polygonToAdd]);
        setPolygonToAdd(null)
    }

    const deletePolygon = (index: number) => {
        if (!polygonToAdd) {
            const newMultiPolygon = [...multiPolygon];
            newMultiPolygon.splice(index, 1);
            setMultiPolygon(newMultiPolygon);
        }
    }

    useEffect(() => {
        if (multiPolygon?.length > 0) {
            let lats: number[] = [];
            let lngs: number[] = [];

            multiPolygon.forEach((polygon: number[][]) => {
                polygon.forEach((coord: number[]) => {
                    lats.push(coord[0]);
                    lngs.push(coord[1]);
                });
            });

            let minlat = Math.min.apply(null, lats),
                maxlat = Math.max.apply(null, lats);
            let minlng = Math.min.apply(null, lngs),
                maxlng = Math.max.apply(null, lngs);

            const newBounds: LatLngBounds = new LatLngBounds([minlat, minlng], [maxlat, maxlng]);
            setBounds(newBounds);
        } else {
            setBounds(null);
        }

    }, [multiPolygon])

    const getTag = () => {
        if (viewOnly) {
            return "Zonas agregadas"
        } else if (polygonToAdd) {
            return "Agregando zona"
        } else {
            return "Editando zonas actuales"
        }
    }

    return (
        <div className='h-full w-full relative'>
            <div className="rounded-[4px] overflow-hidden">
                {
                    bounds !== "checking" &&
                    <MapContainer boundsOptions={bounds ? { animate: true, padding: [50, 50] } : undefined} bounds={bounds as LatLngBounds || undefined} center={bounds ? undefined : [51.505, -0.09]} zoom={13} style={{ height: "500px", width: "100%", zIndex: 1 }}>
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {
                            multiPolygon.map((currentPolygon: number[][], index: number) => {
                                return <Polygon pathOptions={purpleOptions} positions={currentPolygon as any} key={index} eventHandlers={!viewOnly ? { click: () => deletePolygon(index) } : {}} />
                            })
                        }
                        {
                            polygonToAdd && <>
                                <Polygon pathOptions={limeOptions} positions={polygonToAdd} />
                                <CreatePolygon addCoord={(coord: any) => setPolygonToAdd([...polygonToAdd, coord])} />
                            </>
                        }

                    </MapContainer>
                }
            </div>
            <span className='absolute right-0 top-0 z-50 bg-white px-2 rounded-bl-lg'>{getTag()}</span>
            <div className="flex gap-x-2 justify-center mt-5">
                {
                    !viewOnly &&
                    <Button
                        text={polygonToAdd ? "Agregar" : "Agregar zona"}
                        onClick={polygonToAdd ? addNewPolygon : startAdding}
                    />
                }
                {
                    polygonToAdd && <Button text="Cancelar" theme='cancel' onClick={cancelAdding} />
                }
            </div>

        </div>
    )
}

export default MultiPolygonCreator