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

export const AI_PROMPT = `Generate a travel plan in JSON format exactly like the following example, matching the structure, field names, and level of detail. Do not add any extra text or explanation.

{
  "hotels": [
    {
      "hotelName": "Hanoi Backpackers' Hostels",
      "hotelAddress": "28 Hang Buom, Hanoi, Vietnam",
      "price": "$8-$15 per night",
      "hotelImageUrl": "https://www.booking.com/hotel/vn/hanoi-backpackers.en-gb.html",
      "geoCoordinates": "21.0298, 105.8514",
      "rating": "4 stars",
      "description": "A popular hostel for budget travelers, offering dorm beds and private rooms in a central location."
    }
    // ... more hotels
  ],
  "itinerary": [
    {
      "day": "Day 1",
      "plan": [
        {
          "time": "9:00 AM - 12:00 PM",
          "placeName": "Hoan Kiem Lake & Ngoc Son Temple",
          "placeDetails": "...",
          "placeImageUrl": "...",
          "geoCoordinates": "...",
          "placeAddress": "...",
          "ticketPricing": "...",
          "timeToTravel": "..."
        }
        // ... more activities
      ]
    }
    // ... more days
  ]
}

For Location: {location}
Duration: {totalDays} Days
Group Size: {travelers}
Budget: {budget}

Important: Return ONLY the JSON object, no additional text or explanation.`;