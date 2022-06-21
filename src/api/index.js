import axios from 'axios';

const URL = 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary';

export const getPlacesData = async (type, bounds) => {
    try {
        const response = await axios.get(
            'https://travel-advisor.p.rapidapi.com/' + type + '/list-in-boundary',
            {
                params: {
                    bl_latitude: bounds.ne.lat,
                    tr_latitude: bounds.sw.lat,
                    bl_longitude: bounds.ne.lng,
                    tr_longitude: bounds.sw.lng,
                },
                headers: {
                    'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_TRAVEL_API_KEY,
                    'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
                }
            });

        return response.data;
    }
    catch (error) {
        console.log(error);
    }
}
