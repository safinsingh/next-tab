import { initializeApp } from "firebase/app";
import { FirebaseProvider } from "solid-firebase";
import Main from "./components/Main";

const firebaseApp = initializeApp({
	apiKey: "AIzaSyCR3_1MryD_eAcyU9WX750lFXgGHkiC3ws",
	authDomain: "next-tab.firebaseapp.com",
	projectId: "next-tab",
	storageBucket: "next-tab.appspot.com",
	messagingSenderId: "11302456868",
	appId: "1:11302456868:web:92553a295cd6dbf5e192b1",
	measurementId: "G-XSX05DP4W2",
});

const App = () => {
	return (
		<FirebaseProvider app={firebaseApp}>
			<Main />
		</FirebaseProvider>
	);
};

export default App;
