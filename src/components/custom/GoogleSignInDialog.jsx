import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { FcGoogle } from 'react-icons/fc';

export default function GoogleSignInDialog({ open, onOpenChange, onGoogleSignIn, loading }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sign in with Google</DialogTitle>
          <DialogDescription>
            <div className="flex flex-col items-center justify-center gap-2 mb-4">
              <img src="/logo_new.svg" className="h-14" alt="Logo" />
              <h2 className="text-lg font-bold text-center">Sign in with Google Authentication</h2>
            </div>
            <div className="flex flex-row justify-center mb-2">
              <p>View and save your journey just by Google Account!</p>
            </div>
            <Button
              className="w-full mt-5 flex gap-4 items-center justify-center text-base"
              onClick={onGoogleSignIn}
              disabled={loading}
            >
              <FcGoogle className="h-6 w-6" />
              Sign in with Google
            </Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
} 