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
      "hotelName": "Example Hotel",
      "hotelAddress": "123 Main Street, Example City",
      "price": "$100-150 per night",
      "hotelImageUrl": "https://example.com/hotel.jpg",
      "geoCoordinates": "37.7749, -122.4194",
      "rating": "4.5 stars",
      "description": "A comfortable hotel in the heart of the city."
    }
  ],
  "itinerary": [
    {
      "day": 1,
      "activities": [
        {
          "placeName": "Famous Landmark",
          "placeDetails": "Historic site with amazing views",
          "placeImageUrl": "https://example.com/landmark.jpg",
          "geoCoordinates": "37.7775, -122.4183",
          "ticketPricing": "$25 per person",
          "rating": "4.8 stars",
          "time": "Morning",
          "bestTimeToVisit": "Early morning to avoid crowds"
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
        {text: "Generate a travel plan in JSON format with hotels and daily itinerary including hotel name, address, price, image URL, coordinates, rating, and description. For each day, include activities with place name, details, image URL, coordinates, ticket price, rating, time, and best time to visit."}
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