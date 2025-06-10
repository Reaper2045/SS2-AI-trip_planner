import { db } from "@/service/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserTripCardItem from "./components/UserTripCard";

export default function MyTrips() {
    const navigate = useNavigate();
    const [userTrips, setUserTrips] = useState([]);

    useEffect(() => {
    GetUserTrips();
  }, []);
/* get all user's trips */
  const GetUserTrips = async() => {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user);

    if (!user) {
      navigate("/");
      return;
    }
    setUserTrips([]);
    const q = query(collection(db, 'AItrip'), where('userEmail', '==', user?.email));
    const querySnapshot = await getDocs(q);
    let trips = [];
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        trips.push({ ...doc.data(), createdAt: doc.data().createdAt, id: doc.id });
      });
    // Sort by createdAt descending (newest first)
    trips.sort((a, b) => {
      if (!a.createdAt || !b.createdAt) return 0;
      return b.createdAt.seconds - a.createdAt.seconds;
    });
    setUserTrips(trips);
  };

  return(
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
        <h2 className="font-bold text-3xl">My Trips</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {userTrips.map((trip, index) => (
                <UserTripCardItem trip={trip} index={index} />
            ))}
        </div>
    </div>
  );
}
