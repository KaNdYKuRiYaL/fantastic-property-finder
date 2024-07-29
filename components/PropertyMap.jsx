"use client"
import React , {useState,useEffect} from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import Map , {Marker} from 'react-map-gl';
import { setDefaults , fromAddress } from 'react-geocode';
import Spinner from './Spinner';
import Image from 'next/image';
import pin from '@/assets/images/pin.svg';



const PropertyMap = ({property}) => {
    
    const [lat , setLat]  = useState(null);
    const [lng , setLng]  = useState(null);
    const [viewport , setViewport] = useState({
        latitude  : 0,
        longitude :0,
        zoom : 12,
        width : '100%',
        height : '500px'
    });
    
    const [loading , setLoading ] = useState(true);
    setDefaults({
        key : process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_APIKEY ,
        language: 'en',
        region: "us"
    });
    
    useEffect(()=>{
        const fetchCoords = async()=>{
            const res = await fromAddress(`${property.location.street} ${property.location.city} ${property.location.state} ${property.location.zipcode}`);
            const {lat , lng} = res.results[0].geometry.location;
            
            setLat(lat);
            setLng(lng);
            setViewport({
                ...viewport,
                latitude: lat,
                longitude: lng,
            });
            setLoading(false);
            console.log(lat,lng); 

        }
        fetchCoords();
        
    },[property.location])

    if(loading) return <Spinner loading={loading}/>;

    return !loading && (
       <Map
        mapboxAccessToken = {process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        mapLib = {import('mapbox-gl')}
        initialViewState = {{
            longitude : lng,
            latitude : lat,
            zoom : 15
        }}
        style = {{width : '100%' , height: '500px'}}
        mapstyle = 'mapbox://styles/mapbox/streets-v11'>
            <Marker longitude={lng} latitude={lat}
            anchor='bottom'>
                <Image src={pin} alt='location' width={40} height={40}></Image>
            </Marker>
        </Map>
    )
};

export default PropertyMap;
