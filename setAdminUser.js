// setAdminUser.js
import { initializeApp, applicationDefault } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Initialize Firebase Admin SDK
initializeApp({
  credential: applicationDefault(),
});
const db = getFirestore();

async function setAdminUser() {
  const adminUser = {
    uid: 'BoWkTe8a2DgrQCzAJF7LsB0svjc2',
    email: 'testingemailforanything@gmail.com',
    name: 'Gmail Testing',
    picture: 'https://lh3.googleusercontent.com/a/ACg8ocKNY6KE7lQXf8iB5EluSdbXk6RsY-nBPFMXeh9xopfUvHsBA=s96-c',
    role: 'admin',
    createdAt: new Date(),
    hasPassword: true,
    password:'dGVzdGluZzEyM0A=',
  };

  await db.collection('users').doc(adminUser.uid).set(adminUser, { merge: true });
  console.log('Admin user set!');
}

setAdminUser().then(() => process.exit());