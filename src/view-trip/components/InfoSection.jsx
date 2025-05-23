import React from "react";

export default function InfoSection({trip}) {
    return(
        <div>
            <img src='/placeholder.jpg' className="h-[340px] w-full object-cover rounded-xl"/>

            <div>
                <h2>{trip?.userSelection?.location?.label}</h2>
            </div>

            <div>

            </div>
        </div>
    );
}