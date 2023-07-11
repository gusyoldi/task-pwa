import { AiOutlinePlus } from "react-icons/ai"
import { useState, ChangeEvent, FormEvent } from "react"
import { Task } from "../interfaces/Task"

interface Props {
	addNewTask: (task: Task) => void
}

type HandleInputChange = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>

const initialTaskState = {
	title: "",
	description: "",
}

export default function TaskForm({ addNewTask }: Props) {
	const [task, setTask] = useState(initialTaskState)

	const handleInputChange = ({
		target: { name, value },
	}: HandleInputChange) => {
		setTask({ ...task, [name]: value })
	}

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if(task.title && task.description)
		addNewTask(task)
		setTask(initialTaskState)
	}

	return (
		<div className="card card-body bg-secondary text-dark">
			<h1>Nueva tarea</h1>

			<form onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="Título"
					name="title"
					className="form-control mb-3 rounded-0 shadow-none border-0"
					onChange={handleInputChange}
					value={task.title}
				/>
				<textarea
					name="description"
					rows={10}
					placeholder="Escribí la tarea"
					className="form-control mb-3 shadow-none border-0"
					onChange={handleInputChange}
					value={task.description}></textarea>
				<button className="btn btn-primary">
					Agregar <AiOutlinePlus />
				</button>
			</form>
		</div>
	)
}
