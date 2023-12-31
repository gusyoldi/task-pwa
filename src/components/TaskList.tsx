import { Task } from "../interfaces/Task"
import TaskCard from "./TaskCard"

interface Props {
	tasks: Task[]
	deleteTask: (id: number) => void
}

export default function TaskList({ tasks, deleteTask }: Props) {
	return (
		<>
			{tasks.map((task) => {
				return (
					<div className="col-md-4 pb-2" key={task.id}>
						<TaskCard task={task} deleteTask={deleteTask} />
					</div>
				)
			})}
		</>
	)
}
