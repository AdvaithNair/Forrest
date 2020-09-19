import React from 'react'
import {GoogleMap, LoadScript, Polyline} from '@react-google-maps/api';
import {MAPS_API} from "@app/common";

const containerStyle = {
    height: '400px'
};

interface DataPoints {
    lat: number;
    lng: number;
}

interface RouteData {
    route: string;
    efficiency: number;
    latLon?: Array<DataPoints>;
    directions?: Array<string>;
}

interface Props {
    currentDirection: number;
    polySet: any;
}


const BasicMap: React.FC<Props> = ({currentDirection, polySet}) =>{
    const path = polySet;
    const directionPath = [path[currentDirection],path[currentDirection+1]];

    console.log(polySet)

    const options = {
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
        clickable: false,
        draggable: false,
        editable: false,
        visible: true,
        radius: 30000,
        paths: polySet,
        zIndex: 1
    };

    const directionOptions = {
        strokeColor: '#0a00ff',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#0100ff',
        fillOpacity: 0.35,
        clickable: false,
        draggable: false,
        editable: false,
        visible: true,
        radius: 30000,
        paths: directionPath,
        zIndex: 2
    };

    const onLoad = (polyline: any) => {
        console.log('polyline: ', polyline)
    };
    let arrayMiddle = Math.round(path.length / 2);
    const center = path[arrayMiddle];

    return (
        <LoadScript
            googleMapsApiKey={MAPS_API.KEY}
        >
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={8}
            >
                <Polyline
                    onLoad={onLoad}
                    path={path}
                    options={options}
                />
                <Polyline
                    onLoad={onLoad}
                    path={directionPath}
                    options={directionOptions}
                />
            </GoogleMap>
        </LoadScript>
    )
}

export default BasicMap