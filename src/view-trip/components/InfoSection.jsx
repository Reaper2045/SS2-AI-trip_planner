import React from "react";

export default function InfoSection({trip}) {
    return(
        <div>
            <img src='/placeholder.jpg' className="h-[340px] w-full object-cover rounded-xl"/>

            <div className="my-5 flex flex-col gap-2">
                <h2 className="font-bold text-2xl">{trip?.userSelection?.location?.label}</h2>
                
                <div>
                    <h2>{trip?.userSelection?.noOfDays}</h2>
                </div>
            </div>

            <div>

            </div>
        </div>
    );
}