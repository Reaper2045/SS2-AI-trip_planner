import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AI_PROMPT, SelectBudgetOptions, SelectTravelerList } from "@/constants/option";
import React, { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { chatSession } from "@/service/AImodal";

export default function CreateTrip() {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState([]);

  const handleInputChange = (name, value) => {

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]); //each time formData is cloned, print it out to check

  const OnGenerateTrip =async () => {
    // Validate form data
    if (!formData?.location || !formData?.noOfDays || !formData?.budget || !formData?.travelers) {
      toast.error("Please fill all details");
      return;
    }
    
    // Check if days exceed 7
    if (formData.noOfDays > 7) {
      toast.error("Maximum trip duration is 7 days");
      return;
    }


    const FINAL_PROMPT = AI_PROMPT
    .replace('{location}', formData?.location?.label)
    .replace('{totalDays}', formData?.noOfDays)
    .replace('{travelers}', formData?.travelers)
    .replace('{budget}', formData?.budget)
    .replace('{totalDays}', formData?.noOfDays)

    console.log("Sending prompt to Gemini:", FINAL_PROMPT);
      
      // Send the prompt to Gemini via the chat session
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      const responseText = result.response.text();
      
      console.log( responseText);
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
        <h2 className="font-bold text-3xl">Tell us your travel ideas 🏕️🌴</h2>

        <p className="mt-3 text-gray-500 text-xl">
          Just provide some basic information, and our trip planner will
          generate a customized itinerary based on your preferences.
        </p>

        <div className="mt-15 flex flex-col gap-10">
          {/* Select location */}
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
                  handleInputChange('location', p);
                },
              }}
              //print out to check respond of API
            />
          </div>
          {/* Select trip length */}
          <div>
            <h2 className="text-xl my-3 font-medium">
              How many days you want to stay?
            </h2>
            <Input
              placeholder={"Example: 3"}
              type="number"
              onChange={(e) => {
                handleInputChange("noOfDays", e.target.value); // get the day
              }}
            />
          </div>
          {/* Select budget */}
          <div>
            <h2 className="text-xl my-3 font-medium">What is your budget ?</h2>
            <div className="grid grid-cols-3 gap-5 mt-5">
              {SelectBudgetOptions.map((item, index) => (
                <div
                  key={index}
                  onClick={() => {
                    handleInputChange("budget", item.title);
                  }} // get the budget options
                  className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg
                    ${
                      formData?.budget == item.title &&
                      "shadow-2xl border-black"
                    }`} //dynamic styling for chosen option
                >
                  <h2 className="text-4xl">{item.icon}</h2>
                  <h2 className="font-bold text-lg">{item.title}</h2>
                  <h2 className="text-sm text-gray-500">{item.desc}</h2>
                </div>
              ))}
            </div>
          </div>
          {/* Select number of travelers */}
          <div>
            <h2 className="text-xl my-3 font-medium">Who would you go with?</h2>
            <div className="grid grid-cols-3 gap-5 mt-5">
              {SelectTravelerList.map((item, index) => (
                <div
                  key={index}
                  onClick={() => {
                    handleInputChange("travelers", item.people);
                  }}
                  className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg
                    ${
                      formData?.travelers == item.people &&
                      "shadow-2xl border-black"
                    }`} //dynamic styling for chosen option
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
          <Button onClick={OnGenerateTrip}> Generate trip!</Button>
        </div>
      </div>
    </div>
  );
}
