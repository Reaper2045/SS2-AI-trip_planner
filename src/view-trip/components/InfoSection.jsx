import React from "react";

export default function InfoSection({trip}) {
    

    return(
        <div>
            <img src='/images/placeholder.jpg' className="h-[340px] w-full object-cover rounded-xl"/>

            <div className="my-5 flex flex-col gap-2">
                <h2 className="font-bold text-2xl">{trip?.userSelection?.location?.label}</h2>
                
                <div className="flex gap-2">
                    <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 font-medium">📅 {trip?.userSelection?.noOfDays} Day</h2>
                    <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 font-medium">💰 {trip?.userSelection?.budget} Budget</h2>
                    <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 font-medium">🧑‍🤝‍🧑 No. of Traveler: {trip?.userSelection?.travelers} People</h2>
                </div>
            </div>

            <div>

            </div>
        </div>
    );
}