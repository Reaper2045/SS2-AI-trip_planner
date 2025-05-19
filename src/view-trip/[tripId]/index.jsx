import { db } from '@/service/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import React, { use, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner';

export default function ViewTrip() {
    const {tripId} = useParams();
    
    const [trip, setTrip] = useState([]);

    useEffect(()=> {
        tripId&&GetTripData();
    }, [tripId]);

    /*
    fetch trip info from firebase
    */
    const GetTripData = async() => {
        const docRef = doc(db, 'AItrip', tripId);
        const docSnap = await getDoc(docRef);
        

        if(docSnap.exists()) {
            console.log("document:", docSnap.data());
            setTrip(docSnap.data());
        } else {
            console.log("No document found");
            toast("No trip found");
        }
    };

  return (
    <div>
    {/*Info section*/}
    {/*Hotels*/}
    {/*Daily Plan*/}
    {/*Footer*/}
    </div>
  )
}

