import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { signOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/service/firebaseConfig";
import { toast } from "sonner";
import { isAdmin } from "@/service/userService";
import { createUserAfterGoogleAuth } from "@/service/userService";
import SignInModal from './SignInModal';
import GoogleSignInDialog from './GoogleSignInDialog';

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
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);
  const [googleDialogOpen, setGoogleDialogOpen] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);

  useEffect(() => {
    // Listen for changes in localStorage (e.g., login/logout in other tabs)
    const onStorage = () => setUser(getUserProfile());
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (user?.uid) {
        const adminStatus = await isAdmin(user.uid);
        setIsUserAdmin(adminStatus);
      }
    };
    checkAdminStatus();
  }, [user]);

  const googleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("user");
      setUser(null);
      setIsUserAdmin(false);
      toast.success("Successfully signed out!");
      nav("/");
    } catch (error) {
      console.error("Error signing out:", error);
      toast.error("Failed to sign out");
    }
  };

  // Google sign-in handler for the dialog
  const handleGoogleSignIn = async () => {
    try {
      setLoadingGoogle(true);
      const provider = new GoogleAuthProvider();
      provider.addScope("profile");
      provider.addScope("email");
      const result = await signInWithPopup(auth, provider);
      const userData = {
        email: result.user.email,
        name: result.user.displayName,
        picture: result.user.photoURL,
        uid: result.user.uid,
      };
      // Create user in database (set hasPassword: false if new)
      const createdUser = await createUserAfterGoogleAuth({ ...userData, hasPassword: false });
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      toast.success("Successfully signed in!");
      setGoogleDialogOpen(false);
      setSignInOpen(false);
      // Check if user has set password
      if (!createdUser || createdUser.hasPassword === false) {
        nav("/set-password");
      } else {
        nav("/my-trips");
      }
    } catch (err) {
      toast.error("Google sign-in failed");
    } finally {
      setLoadingGoogle(false);
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
            {isUserAdmin && (
              <Button variant="outline" className="rounded-full" onClick={() => nav("/admin")}>
                Admin
              </Button>
            )}
            <Popover>
              <PopoverTrigger asChild>
                <img
                  src={user.picture}
                  className="h-[35px] w-[35px] rounded-full cursor-pointer"
                  alt="User Avatar"
                />
              </PopoverTrigger>
              <PopoverContent className="w-48 p-2">
                <div className="flex flex-col gap-2">
                  <button
                    className="text-left px-2 py-1 hover:bg-gray-100 rounded"
                    onClick={() => nav("/settings")}
                  >
                    Settings
                  </button>
                  <button
                    className="text-left px-2 py-1 text-red-600 hover:bg-gray-100 rounded"
                    onClick={googleLogout}
                  >
                    Logout
                  </button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <>
            <Button onClick={() => setSignInOpen(true)}>Sign In</Button>
            <SignInModal
              open={signInOpen}
              onOpenChange={setSignInOpen}
              onSignIn={() => setUser(getUserProfile())}
              googleDialogOpen={googleDialogOpen}
              setGoogleDialogOpen={setGoogleDialogOpen}
            />
            <GoogleSignInDialog
              open={googleDialogOpen}
              onOpenChange={setGoogleDialogOpen}
              onGoogleSignIn={handleGoogleSignIn}
              loading={loadingGoogle}
            />
          </>
        )}
      </div>
    </div>
  );
}