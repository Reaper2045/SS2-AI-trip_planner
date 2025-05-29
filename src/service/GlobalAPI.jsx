import axios from "axios"
import { data } from "react-router-dom"

const BASE_URL='https://places.googleapis.com/v1/places:searchText'

const config = {
    headers:{
        'Content-Type':'application/json',
        'X-Goog-Api-Key': import.meta.env.VITE_GOOGLE_PLACE_API_KEY,
        'X-Goog-FieldMask':[
            'place.photos',
            'place.displayName',
            'place.id',
        ]
    }
}

export const GetPlaceDetails=(data)=>axios.post(BASE_URL, data, config);