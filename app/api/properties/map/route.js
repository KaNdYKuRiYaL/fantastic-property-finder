import { geocode } from "@/utils/mapboxGeocode";

export default async function handler(request) {
    const { address } = request.query;

    if (!address) {        
        return new Response.error("Address is requestuired" , {status:400});
    }

    try {
        const data = await geocode(address);
        return new Response(JSON.stringify(data) , {status:200});
    } catch (error) {
        return new Response(JSON.stringify(error.messge) , {status:200});
    }
}