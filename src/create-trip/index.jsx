import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SelectBudgetOptions, SelectTravelerList } from "@/constants/option";
import React, { useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

export default function CreateTrip() {
  const [place, setPlace] = useState();
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      
      <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
        <h2 className="font-bold text-3xl">Tell us your travel ideas 🏕️🌴</h2>

        <p className="mt-3 text-gray-500 text-xl">
          Just provide some basic information, and our trip planner will
          generate a customized itinerary based on your preferences.
        </p>

        <div className="mt-15 flex flex-col gap-10">
          <div>
            <h2 className="text-xl my-3 font-medium">
              Where do you want to go?
            </h2>
            <GooglePlacesAutocomplete
              apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
              selectProps={{
                place,
                onChange: (p) => {
                  setPlace(p);
                  console.log(p);
                },
              }}
              //print out to check respond of API
            />
          </div>
          {/* */}
          <div>
            <h2 className="text-xl my-3 font-medium">
              How many days you want to stay?
            </h2>
            <Input placeholder={"Example: 3"} type="number" />
          </div>

          <div>
            <h2 className="text-xl my-3 font-medium">What is your budget ?</h2>
            <div className="grid grid-cols-3 gap-5 mt-5">
              {SelectBudgetOptions.map((item, index) => (
                <div
                  key={index}
                  className="p-4 border cursor-pointer rounded-lg hover:shadow-lg"
                >
                  <h2 className="text-4xl">{item.icon}</h2>
                  <h2 className="font-bold text-lg">{item.title}</h2>
                  <h2 className="text-sm text-gray-500">{item.desc}</h2>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl my-3 font-medium">Who would you go with?</h2>
            <div className="grid grid-cols-3 gap-5 mt-5">
              {SelectTravelerList.map((item, index) => (
                <div
                  key={index}
                  className="p-4 border cursor-pointer rounded-lg hover:shadow-lg"
                >
                  <h2 className="text-4xl">{item.icon}</h2>
                  <h2 className="font-bold text-lg">{item.title}</h2>
                  <h2 className="text-sm text-gray-500">{item.desc}</h2>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="my-10 flex justify-end">
          <Button> Plan your trip!</Button>
        </div>

      </div>

    </div>
  );
}
