import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC_WjnHl_Q5kGWwE7BGYAS3pNoIN_2fsnw",
    authDomain: "formulario-bni.firebaseapp.com",
    projectId: "formulario-bni",
    storageBucket: "formulario-bni.firebasestorage.app",
    messagingSenderId: "797036906569",
    appId: "1:797036906569:web:b9ecade2d87e816805d798",
    measurementId: "G-8F3J6L4M3T"
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
