import React from "react";

export default function Hotels({trip}) {
    return(
        <div>
            <h2 className="font-bold text-xl mt-5">Hotels Recommendation</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
                {trip?.tripData?.hotels?.map((item, index) => (
                    <div key={index} className="border rounded-xl p-4 hover:shadow-lg transition-all">
                        <img 
                            src={item.hotelImageUrl || "/placeholder.jpg"} 
                            alt={item.hotelName}
                            className="w-full h-[200px] object-cover rounded-lg"
                        />
                        <div className="mt-3">
                            <h3 className="font-bold text-lg">{item.hotelName}</h3>
                            <p className="text-gray-500 text-sm mt-1">{item.hotelAddress}</p>
                            <div className="flex justify-between items-center mt-2">
                                <p className="font-medium">{item.price}</p>
                                <p className="text-yellow-500">⭐ {item.rating}</p>
                            </div>
                            <p className="text-sm text-gray-600 mt-2">{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}