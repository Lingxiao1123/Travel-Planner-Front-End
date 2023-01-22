import React, {useState } from 'react';
import {GoogleMap,useLoadScript,Marker, DirectionsRenderer, InfoWindow } from "@react-google-maps/api";
import usePlacesAutocomplete,{ getGeocode,getLatLng} from "use-places-autocomplete";
import "@reach/combobox/styles.css";
//Combobox package to displace the result and user input（search bar）
import {Combobox, ComboboxInput, ComboboxList, ComboboxOption, ComboboxPopover} from "@reach/combobox";

import hotel from "../assets/images/hotel.png";
import restaurant from "../assets/images/restaurant.png";
import tour from "../assets/images/tour.png";
import marker from "../assets/images/marker.png";

// import { getPlaceDetails } from "../utils";

let googlemap;

export function Map(props) {

    const [center, setCenter] = useState({lat:34.0522,lng:-118.2437})
    // const center = useMemo(()=> ({lat:34.0522,lng:-118.2437}),[]);
    //selected and setSelected initially is null,it will be assign by callback function setSelected
    //once the state change，will update the selected，and will add marker
    const [selected,setSelected] = useState();
    const [selectedMarker, setSelectedMarker] = useState("");
    const [mapmarker, setMapMarker] = useState();
    // const [directionsResponse, setDirectionsResponse] = useState(null);
    const [map, setMap] = useState(/** @type google.maps.Map */ (null));
    googlemap = map;    

    const{isLoaded} = useLoadScript({
        googleMapsApiKey: "AIzaSyCuQAJHg9VC-EZ1k-9bptmTySkxHDa7VzQ",
        //pass in the google places library
        libraries: ["places"],
    });
    if(!isLoaded) return <div>loading...</div>;

    const { directionsResponse, placelist, isPlanVisible, showCard, showMarker } = props;

    const PlacesAutocomplete = ({setSelected}) =>{
        const{
            ready,
            value,
            setValue,
            suggestions: {status,data},
            clearSuggestions,
        } = usePlacesAutocomplete();
    
        //handleSelection function -> convert address selected into lat and lng;
        //the address would be the string type
        const handleSelect = async (address) =>{
            //Override setValue:update the value into the full address other than the one in onchange
            setValue(address,false);
            clearSuggestions();
            // getGeocode() helps us to get the Latitude and longitude from the user input
            // decompose the latitude and longitude and pass in to the Setselected
            const results = await getGeocode({address});
            const {lat,lng} = await getLatLng(results[0]);
            console.log({lat,lng})
            //set selected state;
            setSelected({lat,lng});
            setCenter({lat,lng});
        }

        return(
            //user input Combobox,onSelect handler event helps to select one in the combobox
            <Combobox onSelect = {handleSelect}>
                {/*//ComboboxInput  --- > rander search bar*/}
                <ComboboxInput value = {value}
                               onChange = {(e) => setValue(e.target.value)}
                               disabled = {!ready}
                               className = "combobox-input"
                               placeholder = "Search an address"
                />
                {/*show result*/}
                <ComboboxPopover>
                    {/*combobox list : show suggestion and results*/}
                    <ComboboxList>
                        {status === "OK" &&
                            data.map(({place_id,description}) =>(
                                <ComboboxOption key={place_id} value={description} />
                            ))}
                    </ComboboxList>
                </ComboboxPopover>
            </Combobox>
        );
    };

    // const showDetail = async (place) =>{
    //     console.log(place);
    //     const result = await getPlaceDetails(place);
    //     console.log(result);
    // }
     

    return(
        <>
            <div className = "places-container">
                {/*PlaceAutocomplete component*/}
                {/*set selected state*/}
                <PlacesAutocomplete setSelected ={setSelected} />
            </div>
            <GoogleMap zoom = {10}
                       center= {center}
                       mapContainerClassName = "map-container"
                       onLoad={map => setMap(map)}
                       id='map'
                       >
                {showCard && <Marker 
                                position={{
                                    lat: showMarker.latitude,
                                    lng: showMarker.longitude  
                                }}
                                icon = {{
                                    url: showMarker.category==="sight" ? tour: (showMarker.category==="restaurant" ? restaurant: (showMarker.category === "hotel" ? hotel : marker)),
                                    scaledSize: new window.google.maps.Size(50, 50),
                                }}
                                zIndex={5}
                                onClick={() =>setSelectedMarker(showMarker)}
                                />}
                {selected && <Marker position={selected} />}
                {placelist.map(place =>{
                    const location = {
                        lat: place.latitude,
                        lng: place.longitude
                    }
                    return(<Marker
                            key={place.id}
                            position={location}
                            icon = {{
                                url: place.category==="sight" ? tour: (place.category==="restaurant" ? restaurant: (place.category === "hotel" ? hotel : marker)),
                                scaledSize: new window.google.maps.Size(30, 30),
                            }}
                            onClick={() =>setSelectedMarker(place)}
                            zIndex={showCard?0: 1}
                            // onClick={() => showDetail(place)}
                            />
                    )})
                }
                {selectedMarker && (
                    <InfoWindow
                        position={{lat: selectedMarker.latitude,
                                    lng: selectedMarker.longitude
                                    }}
                        options={{
                            pixelOffset: new window.google.maps.Size(0, -40),
                        }}
                        onCloseClick={() => setSelectedMarker("")}
                        >
                        <div>
                            <h4>{selectedMarker.name}</h4>
                        </div>
                    </InfoWindow>
                )}
                {directionsResponse && (
                    <DirectionsRenderer directions={directionsResponse} />
                )}
            </GoogleMap> 
        </>
    );

}

export function getPlaceDetails(place){
    const request = { placeId: `${place.place_id}` };
    // console.log(map);
    const service = new window.google.maps.places.PlacesService(googlemap);
    return new Promise((resolve, reject) => {
      service.getDetails(request, (result, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          resolve(result);
        } else {
          reject(status);
        }
      });
    });
  }



// export default Map;