import { Location } from "aws-sdk";
import { Map, Marker } from "maplibre-gl";
import React, { useEffect, useState } from "react";
import { main, searchPlaceSuggestions } from "../../proxy/AWSLocation";
import "maplibre-gl/dist/maplibre-gl.css";
import { useDebounce } from "use-debounce";
import Loader from "react-spinners/BeatLoader";
import Select, { createFilter } from 'react-select'
import COUNTRIES from "../../utils/countries.json";
import COUNTRIES_NAMES from "../../utils/countriesNames.json";
import colors from "../../utils/colors";
import MenuList from "../../components/ReactSelect/MenuList"
import Option from "./../../components/ReactSelect/Option"

export interface LocationInfoInterface {
    address: string;
    longitude: number;
    latitude: number;
    country: string;
    city: string;
}

const ChooseMapLocation = ({
    loading = false,
    setLocationInfo,
    locationInfo,
    onChange,
    createUsuarioInfo
}: {
    className?: string;
    loading?: boolean;
    setLocationInfo: (info: any) => void;
    locationInfo: LocationInfoInterface | null;
    onChange: any,
    createUsuarioInfo: any
}) => {
    const [countrySelected, setCountrySelected] = useState<any>();
    const [citySelected, setCitySelected] = useState<any>();
    const [initialCoordinates, setInitialCoordinates] = useState<any>(null);

    const [map, setMap] = useState<Map | null>(null);
    const [marker, setMarker] = useState<Marker | null>(null);
    const [textToSearch, setTextToSearch] = useState<string>("");
    const [debouncedTextToSearch] = useDebounce(textToSearch, 1000);
    const [suggestions, setSuggestions] = useState<any[] | null>(null);
    const [loadingSuggestions, setLoadingSuggestions] = useState(false);

    const handleLocation = (
        res: Location.SearchPlaceIndexForPositionResponse
    ) => {
        const place = res.Results && res.Results[0]?.Place;
        setLocationInfo({
            address: place?.Label,
            longitude: place?.Geometry?.Point && place?.Geometry?.Point[0],
            latitude: place?.Geometry?.Point && place?.Geometry?.Point[1],
            country: place?.Country,
            city: place?.Municipality
        });
        setCountrySelected({
            label: place?.Country && (COUNTRIES_NAMES as any)[place.Country],
            value: place?.Country
        });
        setInitialCoordinates(null);
        setCitySelected(null);
    };

    useEffect(() => {
        if (map && initialCoordinates) {
            map.setCenter([initialCoordinates.longitude, initialCoordinates.latitude]);
            map.setZoom(10);
        }
    }, [initialCoordinates])


    useEffect(() => {
        const initMap = async () => {
            const res = await main(handleLocation);
            setMap(res);
        };
        if (!map && !loading) {
            initMap();
        }
    }, [map, loading]);

    useEffect(() => {
        if (map && locationInfo?.longitude && locationInfo?.latitude) {
            // Remove any existing marker
            if (marker) {
                marker.remove();
            }

            map.setCenter([locationInfo.longitude, locationInfo.latitude]);
            map.setZoom(12);

            // Render a marker on clicked point
            setMarker(
                new Marker({
                    anchor: "center",
                    offset: [0, 0],
                })
                    .setLngLat([locationInfo.longitude, locationInfo.latitude])
                    .addTo(map)
            );
        }
    }, [locationInfo, map]);


    useEffect(() => {
        if (debouncedTextToSearch) {
            const startSearch = async () => {
                setLoadingSuggestions(true)
                searchPlaceSuggestions(debouncedTextToSearch, (results: any) => {
                    setSuggestions(results)
                    setLoadingSuggestions(false)
                }, locationInfo?.longitude, locationInfo?.latitude);
            };
            startSearch();
        }
    }, [debouncedTextToSearch]);

    const selectPlace = (place: any) => {
        setTextToSearch("")
        setSuggestions(null)
        setLocationInfo({
            address: place?.Label,
            longitude: place?.Geometry?.Point && place?.Geometry?.Point[0],
            latitude: place?.Geometry?.Point && place?.Geometry?.Point[1],
            country: place?.Country,
            city: place?.Municipality
        });
        setCountrySelected({
            label: place && (COUNTRIES_NAMES as any)[place?.Country],
            value: place?.Country
        });
        setInitialCoordinates(null);
        setCitySelected(null);
    }

    return (
        <div className="h-full flex flex-col lg:flex-row w-full gap-x-10 mt-5">
            <div className="flex flex-col mb-6 lg:w-1/2">
                <label className="text-primary text-[10px] lg:text-[14px] mb-2">País</label>
                <Select value={countrySelected} className="w-full" options={Object.keys(COUNTRIES).map((country: string) => ({
                    label: (COUNTRIES_NAMES as any)[country],
                    value: country
                }))}
                    onChange={(e: any) => {
                        setCountrySelected({
                            label: (COUNTRIES_NAMES as any)[e.value],
                            value: e.value
                        })
                        setCitySelected(null)
                    }
                    }
                    styles={{
                        option: (provided, state) => ({
                            ...provided,
                            background: state.isFocused ? colors.rifa : 'white',
                            color: state.isFocused ? "white" : 'black',
                        }),
                    }}
                />
                <div className="flex flex-col pt-2.5">
                    <label className="text-primary text-[10px] lg:text-[14px] mb-2">Ciudad</label>
                    <Select
                        placeholder={locationInfo?.city || "Seleccionar ciudad"}
                        className="w-full"
                        components={{
                            MenuList,
                            Option
                        }}
                        filterOption={createFilter({ ignoreAccents: false })}
                        value={citySelected} options={(countrySelected?.value ? (COUNTRIES as any)[countrySelected.value] : []).map((city: any, index: number) => ({
                            label: city.city,
                            value: index
                        }))} onChange={(e: any) => {
                            const newCity = countrySelected ? (COUNTRIES as any)[countrySelected.value][e.value] : null;
                            const newCoordinates = newCity ? { longitude: newCity.lng, latitude: newCity.lat } : null;
                            setCitySelected({
                                label: newCity?.city,
                                value: e.value
                            });
                            setInitialCoordinates(newCoordinates);
                        }
                        } />
                </div>
                <div className="flex flex-col pt-2.5">
                    <label className="text-primary text-[10px] lg:text-[14px]">Buscar dirección</label>
                    <div className="w-full relative">
                        <div className="w-full relative flex mt-2 items-center">
                            <input type="text" placeholder={locationInfo?.address || "Seleccionar ubicación en el mapa o escriba aqui"} className="border-b-2 border-neutral-300 w-full h-full text-[12px] lg:text-[14px] outline-0 pb-1" value={textToSearch} onChange={(e) => setTextToSearch(e.target.value)} />
                            {
                                loadingSuggestions &&
                                <div className="absolute right-0 my-auto flex items-center pr-2">
                                    <Loader color={"#3089B0"} size={5} />
                                </div>
                            }
                        </div>
                        {
                            suggestions && suggestions.length > 0 &&
                            <div className="absolute top-[115%] bg-white w-full border-indigo-600  border-2  z-10 max-h-[200px] overflow-y-scroll rounded-[5px]">
                                {
                                    suggestions && suggestions.map((suggestion: any, index: number) => (<div key={suggestion.Place.Label} onClick={() => selectPlace(suggestion.Place)} className={`hover:bg-primary hover:text-white cursor-pointer text-[12px] pl-2 ${index < suggestions.length - 1 ? "border-b-indigo-600 border-b-[1px]" : ""}`}>{suggestion.Place.Label}</div>))
                                }
                            </div>
                        }
                    </div>
                </div>
                <div className="flex flex-col pt-2.5">
                    <label className="text-primary text-[10px] lg:text-[14px]">Indicaciones adicionales (Casa, Apto) </label>
                    <input type="text" className="border-b-2 border-neutral-300 w-full h-full text-[12px] lg:text-[15px] outline-0 pb-1" name="indicacionesAdicionales" onChange={onChange} value={createUsuarioInfo?.indicacionesAdicionales} />
                </div>
            </div>
            <div className="relative lg:w-1/2">
                <div className="flex flex-col pb-3">
                    <label className="text-primary text-[10px] lg:text-[14px]">Dirección</label>
                    <p className="text-neutral-500 w-full h-full text-[12px] lg:text-[15px] outline-0 pb-1">{locationInfo?.address || "-"}</p>
                </div>
                <div id="map" className="w-full h-[180px] lg:h-[210px] flex-1 border shadow-[0_0_5px_0_rgba(0,0,0,0.2)]" />
            </div>
        </div>
    );
};

export default ChooseMapLocation;
