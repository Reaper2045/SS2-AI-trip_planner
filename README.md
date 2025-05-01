# Trippy - AI Travel Planner

AI-powered travel planning app using Gemini AI to generate personalized trip itineraries.

## Quick Setup

### Prerequisites
- Node.js v18+
- Google Places API key
- Google Gemini AI API key
- Firebase project

### Installation
```sh
# Install dependencies
npm install

# Create .env.local file
cp .env.example .env.local

# Start dev server
npm run dev
```

### Environment Setup
Create a `.env.local` file with:
```
# Required API Keys
VITE_GOOGLE_PLACE_API_KEY=your_key_here
VITE_GOOGLE_GEMINI_AI_API_KEY=your_key_here

## Troubleshooting

For "[react-google-places-autocomplete]: Google script not loaded" error:
- Check `.env.local` has valid Google Places API key
- Enable Google Places API in Google Cloud Console
- Enable billing in your Google Cloud account

## Tech Stack
- React/Vite + TailwindCSS
- Firebase (Auth, Firestore, Storage)
- Google Gemini AI + Places API