import { Image } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "@/service/firebaseConfig";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { toast } from "sonner";
import { FcGoogle } from "react-icons/fc";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function Header() {
  const nav = useNavigate();
  const [user, setUser] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const login = async () => {
    try {
      const provider = new GoogleAuthProvider();
      provider.addScope("profile");
      provider.addScope("email");
      const result = await signInWithPopup(auth, provider);
      setOpenDialog(false);
      toast.success("Successfully signed in!");
    } catch (err) {
      console.error("Failed to sign in:", err);
      toast.error("Failed to sign in");
    }
  };

  const handleSignIn = () => {
    setOpenDialog(true);
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      toast.success("Successfully signed out!");
    } catch (error) {
      console.error("Error signing out:", error);
      toast.error("Failed to sign out");
    }
  };

  return (
    <>
      <div className="p-2 shadow-sm flex justify-between items-center px-5">
        <div className="flex gap-2 cursor-pointer" onClick={() => {nav('/')}}>
          <img className="h-13" src="/logo_new.svg" />
          <span className="font-bold text-4xl text-[#314689]">Trippy</span>
        </div>
        <div>
          {user ? (
            <Button 
              className='cursor-pointer'
              onClick={handleSignOut}
            >
              Sign Out
            </Button>
          ) : (
            <Button 
              className='cursor-pointer'
              onClick={handleSignIn}
            >
              Sign In
            </Button>
          )}
        </div>
      </div>

      {/* Login dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sign in with Google</DialogTitle>
            <DialogDescription>
              <div className="flex flex-row items-center justify-center">
                <img src="/logo_new.svg" />
                <h2 className="text-lg font-bold">
                  Sign in with Google Authentication
                </h2>
              </div>

              <div className="flex flex-row justify-center mt-5">
                <p>View and save your journey just by Google Account!</p>
              </div>
              <div className="flex flex-row justify-center mt-2">
                <Button
                  className="w-full mt-5 flex gap-4 items-center"
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
    </>
  );
}
