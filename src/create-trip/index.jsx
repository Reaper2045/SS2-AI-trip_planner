import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AI_PROMPT,
  SelectBudgetOptions,
  SelectTravelerList,
} from "@/constants/option";
import React, { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { toast } from "sonner";
import { chatSession } from "@/service/AImodal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";


export default function CreateTrip() {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]); //each time formData is cloned, print it out to check

  const login = useGoogleLogin({
    onSuccess: (loginRes) => {
      console.log(loginRes);
      GetUserProfile(loginRes);
    },
    onError: (err) => console.log(err)
  }); 
  
  

  const OnGenerateTrip = async () => {
    const user = localStorage.getItem("user");
    if (!user) {
      setOpenDialog(true);
      return;
    }

    // Validate form data
    if (
      !formData?.location ||
      !formData?.noOfDays ||
      !formData?.budget ||
      !formData?.travelers
    ) {
      toast.error("Please fill all details");
      return;
    }

    // Check if days exceed 7
    if (formData.noOfDays > 7) {
      toast.error("Maximum trip duration is 7 days");
      return;
    }

    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT.replace(
      "{location}",
      formData?.location?.label
    )
      .replace("{totalDays}", formData?.noOfDays)
      .replace("{travelers}", formData?.travelers)
      .replace("{budget}", formData?.budget)
      .replace("{totalDays}", formData?.noOfDays);

    console.log("Sending prompt to Gemini:", FINAL_PROMPT);

    // Send the prompt to Gemini via the chat session
    const result = await chatSession.sendMessage(FINAL_PROMPT);
    const responseText = result.response.text();

    console.log(responseText);
    setLoading(false);
    SaveAiTrip(responseText);
  };

  const SaveAiTrip = async (TripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const docID = Date.now().toString();
    
    await setDoc(doc(db, "AItrip", docID), {
      userSelection: formData,
      tripData: TripData,
      userEmail: user?.email,
      id: docID,
    });
    setLoading(false);
  }

  const GetUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "Application/json",
          },
        }
      )
      .then((resp) => {
        const userData = {
          ...resp.data,
          access_token: tokenInfo?.access_token
        };
        localStorage.setItem("user", JSON.stringify(userData));
        console.log("User Profile:", JSON.stringify(userData, null, 2));
        setOpenDialog(false); // Close the dialog after successful login
      })
      .catch((err) => {
        console.error("Failed to fetch user profile:", err);
        toast.error("Failed to fetch user profile");
      });
  };

  return (
    <div className="">
      
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 ">
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
                  handleInputChange("location", p);
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
        {/* Login dialog */}
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Sign in with Google
              </DialogTitle>
              <DialogDescription>
                <div className="flex flex-row items-center justify-center">
                  <img src="../logo_new.svg" />
                  <h2 className="text-lg font-bold">
                    Sign in with Google Authentication
                  </h2>
                </div>

                <div className="flex flex-row justify-center mt-5">
                  <p>View and save your journey just by Google Account!</p>
                </div>
                <div className="flex flex-row justify-center mt-2">
                  <Button 
                    className='w-full mt-5 flex gap-4 items-center'
                    onClick={login}
                  > 
                    <FcGoogle className="h-10" />
                    Sign in with Google
                  </Button>
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
    </div>
  );
}