import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getFirestore,
	orderBy,
	query,
	updateDoc,
} from "firebase/firestore";
import { useFirebaseApp, useFirestore } from "solid-firebase";
import { For, Match, Switch, createSignal } from "solid-js";
import Todo from "./Todo";

const TodoList = (props: { uid: string }) => {
	const app = useFirebaseApp();
	const db = getFirestore(app);

	// the UID does not need to be reactive because new logins should trigger a todolist rerender
	// eslint-disable-next-line solid/reactivity
	const col = collection(db, props.uid);
	const todos = useFirestore(query(col, orderBy("createdAt", "asc")));

	const [todoName, setTodoName] = createSignal("");

	return (
		<Switch>
			<Match when={todos.loading}>
				<></>
			</Match>
			<Match when={todos.error}>
				<p>error fetching todos</p>
			</Match>
			<Match when={todos.data}>
				<For each={todos.data}>
					{(t) => (
						<Todo
							t={t.text}
							completed={t.completed}
							toggle={() => updateDoc(doc(col, t.id), { completed: !t.completed })}
							remove={() => deleteDoc(doc(col, t.id))}
						/>
					)}
				</For>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						addDoc(col, { text: todoName(), completed: false, createdAt: new Date().getTime() });
						setTodoName("");
					}}
				>
					<input
						class="muted"
						placeholder="next..."
						value={todoName()}
						onChange={(e) => setTodoName(e.currentTarget.value)}
					/>
				</form>
			</Match>
		</Switch>
	);
};

export default TodoList;
