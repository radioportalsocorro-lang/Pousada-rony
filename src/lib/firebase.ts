import { initializeApp, getApps, getApp } from 'firebase/app';
import { initializeFirestore } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

// Inicializa a aplicação Firebase
export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Inicializa o Firestore especificando o banco de dados configurado
export const db = initializeFirestore(app, {}, firebaseConfig.firestoreDatabaseId);
