import { GoogleGenAI } from "@google/genai";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Generation configuration
const generationConfig = {
  temperature: 0.7,
  topK: 32,
  topP: 0.95,
  maxOutputTokens: 8192,
};

// Example JSON response to help the model understand the expected format
const exampleResponse = `{
  "hotels": [
    {
      "hotelName": "Hanoi Backpackers' Hostels",
      "hotelAddress": "28 Hang Buom, Hanoi, Vietnam",
      "price": "$8-$15 per night",
      "hotelImageUrl": "https://www.booking.com/hotel/vn/hanoi-backpackers.en-gb.html",
      "geoCoordinates": "21.0298, 105.8514",
      "rating": "4 stars",
      "description": "A popular hostel for budget travelers, offering dorm beds and private rooms in a central location."
    },
    {
      "hotelName": "Hanoi Emerald Waters Hotel & Spa",
      "hotelAddress": "24 Le Van Huu, Hanoi, Vietnam",
      "price": "$20-$40 per night",
      "hotelImageUrl": "https://www.agoda.com/en-us/emerald-waters-hotel-and-spa/hotel/hanoi-vn.html",
      "geoCoordinates": "21.0368, 105.8488",
      "rating": "3.5 stars",
      "description": "A comfortable hotel with a spa and a rooftop pool offering reasonable prices."
    },
    {
      "hotelName": "Little Hanoi Hotel",
      "hotelAddress": "36 Hang Bac, Hanoi, Vietnam",
      "price": "$15-$30 per night",
      "hotelImageUrl": "https://www.booking.com/hotel/vn/little-hanoi.en-gb.html",
      "geoCoordinates": "21.0289, 105.8532",
      "rating": "4 stars",
      "description": "A charming boutique hotel in the Old Quarter with well-appointed rooms and friendly service."
    }
  ],
  "itinerary": [
    {
      "day": "Day 1",
      "plan": [
        {
          "time": "9:00 AM - 12:00 PM",
          "placeName": "Hoan Kiem Lake & Ngoc Son Temple",
          "placeDetails": "Visit the iconic Hoan Kiem Lake and Ngoc Son Temple, a peaceful oasis in the heart of Hanoi. Explore the lake's surroundings and enjoy the scenic views.",
          "placeImageUrl": "https://www.vietnamtourism.com/sites/default/files/styles/medium/public/images/node/1000/hoankiem-lake.jpg",
          "geoCoordinates": "21.0282, 105.8545",
          "placeAddress": "Hoan Kiem District, Hanoi, Vietnam",
          "ticketPricing": "Free entry to the lake; small fee for Ngoc Son Temple",
          "timeToTravel": "2-3 hours"
        },
        {
          "time": "12:00 PM - 1:00 PM",
          "placeName": "Lunch at a local restaurant",
          "placeDetails": "Enjoy an authentic Vietnamese lunch at a local eatery in the Old Quarter. Many options are available for cheap and delicious meals.",
          "placeImageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Pho_in_Hanoi.jpg/1280px-Pho_in_Hanoi.jpg",
          "geoCoordinates": "21.0285, 105.8525",
          "placeAddress": "Various locations in the Old Quarter",
          "ticketPricing": "$3-$5",
          "timeToTravel": "1 hour"
        },
        {
          "time": "1:00 PM - 4:00 PM",
          "placeName": "Hanoi Old Quarter",
          "placeDetails": "Explore the bustling streets of Hanoi's Old Quarter, a maze of narrow streets filled with shops, street food vendors, and ancient architecture. Get lost in the charm and experience the local life.",
          "placeImageUrl": "https://www.vietnam-destinations.com/images/stories/virtualtour/hanoi-old-quarter-street-scene.jpg",
          "geoCoordinates": "21.0291, 105.8522",
          "placeAddress": "Hanoi Old Quarter, Hanoi, Vietnam",
          "ticketPricing": "Free",
          "timeToTravel": "3 hours"
        },
        {
          "time": "4:00 PM - 5:00 PM",
          "placeName": "Coffee break at a local cafe",
          "placeDetails": "Enjoy a traditional Vietnamese coffee at a local cafe and relax after exploring the Old Quarter. Try the egg coffee!",
          "placeImageUrl": "https://www.vietnamtourism.com/sites/default/files/styles/large/public/images/node/5100/ca-phe-trung-egg-coffee.jpg",
          "geoCoordinates": "21.0285, 105.8525",
          "placeAddress": "Various locations in the Old Quarter",
          "ticketPricing": "$1-$2",
          "timeToTravel": "1 hour"
        },
        {
          "time": "5:00 PM - 7:00 PM",
          "placeName": "Temple of Literature",
          "placeDetails": "Visit the Temple of Literature, Vietnam's first university, a beautiful historical site with peaceful courtyards and traditional architecture.",
          "placeImageUrl": "https://www.vietnamtourism.com/sites/default/files/styles/large/public/images/node/1000/temple-of-literature.jpg",
          "geoCoordinates": "21.0218, 105.8415",
          "placeAddress": "58 Quoc Tu Giam Street, Hanoi, Vietnam",
          "ticketPricing": "$2",
          "timeToTravel": "2 hours"
        },
        {
          "time": "7:00 PM - 8:00 PM",
          "placeName": "Dinner at a local restaurant",
          "placeDetails": "Enjoy dinner at a local restaurant. Many options are available in the Old Quarter or near your hotel.",
          "placeImageUrl": "https://media.timeout.com/images/105915633/image.jpg",
          "geoCoordinates": "21.0285, 105.8525",
          "placeAddress": "Various locations in Hanoi",
          "ticketPricing": "$5-$10",
          "timeToTravel": "1 hour"
        }
      ]
    }
  ]
}`;

// Create a chat session with pre-configured history
export const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {text: "Generate a travel plan in JSON format exactly like the following example, matching the structure, field names, and level of detail. Do not add any extra text or explanation."}
      ]
    },
    {
      role: "model",
      parts: [
        {text: exampleResponse}
      ]
    }
  ]
});