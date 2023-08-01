import { useNavigate } from "@solidjs/router";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { useFirebaseApp } from "solid-firebase";

const Login = () => {
	const navigate = useNavigate();
	const toRoot = () => navigate("/", { replace: true });
	const app = useFirebaseApp();

	const signInWithGoogle = () =>
		signInWithPopup(getAuth(app), new GoogleAuthProvider()).then(toRoot);

	return (
		<>
			<p>sign in</p>
			<button onClick={signInWithGoogle} class="linkButton">
				with google
			</button>
		</>
	);
};

export default Login;
