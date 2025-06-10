import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { signOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/service/firebaseConfig";
import { toast } from "sonner";

function getUserProfile() {
  try {
    return JSON.parse(localStorage.getItem("user"));
  } catch {
    return null;
  }
}

export default function Header() {
  const nav = useNavigate();
  const [user, setUser] = useState(getUserProfile());

  useEffect(() => {
    // Listen for changes in localStorage (e.g., login/logout in other tabs)
    const onStorage = () => setUser(getUserProfile());
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const login = async () => {
    try {
      const provider = new GoogleAuthProvider();
      provider.addScope("profile");
      provider.addScope("email");
      const result = await signInWithPopup(auth, provider);
      localStorage.setItem("user", JSON.stringify(result.user));
      setUser(result.user);
      toast.success("Successfully signed in!");
    } catch (err) {
      console.error("Failed to sign in:", err);
      toast.error("Failed to sign in");
    }
  };

  const googleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("user");
      setUser(null);
      toast.success("Successfully signed out!");
      nav("/");
    } catch (error) {
      console.error("Error signing out:", error);
      toast.error("Failed to sign out");
    }
  };

  return (
    <div className="p-3 shadow-sm flex justify-between items-center">
      <img className="h-13 cursor-pointer" src="/logo_new.svg" onClick={()=> nav("/")}/>
      <div>
        {user ? (
          <div className="flex items-center gap-3">
            <Button variant="outline" className="rounded-full" onClick={() => nav("/my-trips")}>
              My Trips
            </Button>
            <Popover>
              <PopoverTrigger asChild>
                <img
                  src={user.picture}
                  className="h-[35px] w-[35px] rounded-full cursor-pointer"
                  alt="User Avatar"
                />
              </PopoverTrigger>
              <PopoverContent className="w-32 p-2">
                <h2
                  className="cursor-pointer text-center text-red-600 hover:underline"
                  onClick={googleLogout}
                >
                  Logout
                </h2>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button onClick={login}>Sign In</Button>
        )}
      </div>
    </div>
  );
}