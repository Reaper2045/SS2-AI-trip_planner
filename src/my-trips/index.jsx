import { db } from "@/service/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserTripCardItem from "./components/UserTripCard";

export default function MyTrips() {
    const navigate = useNavigate();
    const [userTrips, setUserTrips] = useState([]);
    const [showFilter, setShowFilter] = useState(false);
    const [sortOrder, setSortOrder] = useState('latest');

    useEffect(() => {
        GetUserTrips();
    }, []);

    const handleSort = (order) => {
        setSortOrder(order);
        const sortedTrips = [...userTrips].sort((a, b) => {
            if (!a.createdAt || !b.createdAt) return 0;
            return order === 'latest' 
                ? b.createdAt.seconds - a.createdAt.seconds
                : a.createdAt.seconds - b.createdAt.seconds;
        });
        setUserTrips(sortedTrips);
        setShowFilter(false);
    };

    /* get all user's trips */
    const GetUserTrips = async() => {
        const user = JSON.parse(localStorage.getItem('user'));
        console.log(user);

        if (!user) {
            navigate("/");
            return;
        }
        setUserTrips([]);
        const q = query(collection(db, 'AItrip'), where('userUid', '==', user?.uid));
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
            <div className="flex justify-between items-center">
                <h2 className="font-bold text-3xl">My Trips</h2>
                <div className="relative">
                    <button 
                        onClick={() => setShowFilter(!showFilter)}
                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center gap-2"
                    >
                        Filter
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                    {showFilter && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-10">
                            <button 
                                onClick={() => handleSort('latest')}
                                className="w-full text-left px-4 py-2 hover:bg-gray-100"
                            >
                                Latest Created
                            </button>
                            <button 
                                onClick={() => handleSort('oldest')}
                                className="w-full text-left px-4 py-2 hover:bg-gray-100"
                            >
                                Oldest Created
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                {userTrips.map((trip, index) => (
                    <UserTripCardItem key={trip.id} trip={trip} index={index} />
                ))}
            </div>
        </div>
    );
}
