import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

// TODO: Replace with your actual Firebase configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const saveDiagnosticsResult = async (userData, answers) => {
    try {
        const docRef = await addDoc(collection(db, "diagnosticos"), {
            nome: userData.nome,
            email: userData.email,
            respostas: answers,
            data: serverTimestamp()
        });
        return docRef.id;
    } catch (e) {
        console.error("Erro ao salvar resultado: ", e);
        throw e;
    }
};
