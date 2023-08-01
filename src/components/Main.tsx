import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { useAuth, useFirebaseApp } from "solid-firebase";
import { Show, createSignal, onCleanup } from "solid-js";
import { getCurrentTime } from "../util";
import TodoList from "./TodoList";

const Main = () => {
	const [time, setTime] = createSignal(getCurrentTime());
	const updateTime = setInterval(() => setTime(getCurrentTime()), 1000);
	onCleanup(() => clearInterval(updateTime));

	const app = useFirebaseApp();
	const auth = getAuth(app);
	const state = useAuth(auth);

	const signInWithGoogle = () => signInWithPopup(getAuth(app), new GoogleAuthProvider());

	return (
		<>
			<p>
				welcome
				<Show when={state.data}>
					, {state.data?.displayName?.toLowerCase().split(" ")[0] ?? "user"}
				</Show>
			</p>
			<p>{time()}</p>
			<br />
			<Show
				when={state.data}
				fallback={
					<button onClick={signInWithGoogle} class="linkButton">
						sign in
					</button>
				}
			>
				<TodoList uid={state.data!.uid} />
				<br />
				<button onClick={() => auth.signOut()} class="linkButton">
					sign out
				</button>
			</Show>
		</>
	);
};

export default Main;
