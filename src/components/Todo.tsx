const Todo = (props: { t: string; completed: boolean; toggle: () => void; remove: () => void }) => {
	return (
		<div class="todo">
			<button
				onClick={() => props.toggle()}
				class={`glassButton ${props.completed ? "strike" : ""}`}
			>
				{props.t}
			</button>
			<button class="glassButton remove" onClick={() => props.remove()}>
				×
			</button>
		</div>
	);
};

export default Todo;
