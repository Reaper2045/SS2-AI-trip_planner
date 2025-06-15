import './App.css'
import Hero from './components/custom/Hero'
import { useEffect } from 'react';
import { db } from '@/service/firebaseConfig';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

function useEnsureAdminUser() {
  useEffect(() => {
    const adminUser = {
      uid: 'BoWkTe8a2DgrQCzAJF7LsB0svjc2',
      email: 'testingemailforanything@gmail.com',
      name: 'Gmail Testing',
      picture: 'https://lh3.googleusercontent.com/a/ACg8ocKNY6KE7lQXf8iB5EluSdbXk6RsY-nBPFMXeh9xopfUvHsBA=s96-c',
      role: 'admin',
      createdAt: serverTimestamp(),
      hasPassword: true,
      password: 'dGVzdGluZzEyM0A=',
    };
    setDoc(doc(db, 'users', adminUser.uid), adminUser, { merge: true });
  }, []);
}

export default function App() {
  useEnsureAdminUser();
  return (
    <>
      {/* Hero section*/}
      <Hero/>
    </>
  )
}