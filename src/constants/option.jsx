export const SelectTravelerList = [
  {
    id: 1,
    title: "Just Me",
    desc: "A sole traveler in exploration",
    icon: "👤",
    people: "1",
  },
  {
    id: 2,
    title: "A Couple",
    desc: "Two travelers in tandem",
    icon: "👫",
    people: "2 People",
  },
  {
    id: 3,
    title: "Family",
    desc: "A group of fun loving adventurers",
    icon: "👪",
    people: "3 to 5 People",
  },
  {
    id: 4,
    title: "Friends",
    desc: "A bunch of thrill-seekers",
    icon: "👥",
    people: "5 to 10 People",
  },
];

export const SelectBudgetOptions = [
  {
    id: 1,
    title: "Cheap",
    desc: "Stay conscious of costs",
    icon: "💰",
  },
  {
    id: 2,
    title: "Moderate",
    desc: "Keep cost on the average side",
    icon: "💸",
  },
  {
    id: 3,
    title: "Luxury",
    desc: "No need to worry about cost",
    icon: "💵",
  },
];

export const AI_PROMPT = `Generate a travel plan in the following JSON format:
{
  "hotels": [
    {
      "hotelName": "string",
      "hotelAddress": "string",
      "price": "string",
      "hotelImageUrl": "string",
      "geoCoordinates": "string",
      "rating": "string",
      "description": "string"
    }
  ],
  "itinerary": [
    {
      "day": number,
      "activities": [
        {
          "placeName": "string",
          "placeDetails": "string",
          "placeImageUrl": "string",
          "geoCoordinates": "string",
          "ticketPricing": "string",
          "rating": "string",
          "time": "string",
          "bestTimeToVisit": "string"
        }
      ]
    }
  ]
}

For Location: {location}
Duration: {totalDays} Days
Group Size: {travelers}
Budget: {budget}

Important: Return ONLY the JSON object, no additional text or explanation.`;
