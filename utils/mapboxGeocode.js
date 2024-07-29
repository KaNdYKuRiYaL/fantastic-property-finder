// import mbxGeocoding from '@mapbox/mapbox-sdk/services/geocoding';
// import { accessToken } from 'mapbox-gl';

// const geocodingClient = mbxGeocoding({
//     accessToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN
// });

// export const geocode = async(address) =>{
//     try{
//         const response = await geocodingClient.forwardGeocode({
//             query : address,
//             limit : 1,
//         })
//         .send();
//         if(response.body.features.length){
//             const [feature] = response.body.features;
//             return {
//                 lat : feature.center[1],
//                 lng : feature.center[0],
//                 placename : feature.place_name,
//             };
//         }
//         throw new Error('No result found');
//     }
//     catch(error){
//         console.log(error);
//         throw new Error('Geocoding request failed'); 
//     }
// };