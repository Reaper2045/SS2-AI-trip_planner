import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/service/firebaseConfig';
import { useNavigate } from 'react-router-dom';

function encodePasswordBase64(password) {
  return btoa(password);
}

async function getUserByEmail(email) {
  const q = query(collection(db, 'users'), where('email', '==', email));
  const querySnapshot = await getDocs(q);
  if (!querySnapshot.empty) {
    return { ...querySnapshot.docs[0].data(), uid: querySnapshot.docs[0].id };
  }
  return null;
}

export default function SignInModal({ open, onOpenChange, onSignIn, googleDialogOpen, setGoogleDialogOpen }) {
  const [tab, setTab] = useState('google');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let userDoc = await getUserByEmail(email);
      if (!userDoc) {
        toast.error('User not found');
        setLoading(false);
        return;
      }
      if (!userDoc.hasPassword) {
        toast.error('This account does not have a password set. Please sign in with Google.');
        setLoading(false);
        return;
      }
      const encoded = encodePasswordBase64(password);
      if (userDoc.password !== encoded) {
        toast.error('Incorrect password');
        setLoading(false);
        return;
      }
      // Success
      localStorage.setItem('user', JSON.stringify(userDoc));
      toast.success('Signed in!');
      onOpenChange(false);
      onSignIn && onSignIn();
      nav('/my-trips');
    } catch (err) {
      toast.error('Sign in failed');
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sign In</DialogTitle>
          <DialogDescription>
            <div className="flex gap-4 mb-4">
              <Button variant={tab === 'google' ? 'default' : 'outline'} onClick={() => setTab('google')}>Google</Button>
              <Button variant={tab === 'email' ? 'default' : 'outline'} onClick={() => setTab('email')}>Email & Password</Button>
            </div>
            {tab === 'google' && (
              <Button className="w-full flex gap-4 items-center" onClick={() => setGoogleDialogOpen(true)}>
                <img src="/logo_new.svg" className="h-6" alt="Logo" />
                Sign in with Google
              </Button>
            )}
            {tab === 'email' && (
              <form onSubmit={handleEmailSignIn} className="space-y-4 mt-2">
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Signing in...' : 'Sign In'}
                </Button>
              </form>
            )}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
} 

