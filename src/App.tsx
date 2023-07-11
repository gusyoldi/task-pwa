import { useState, useEffect } from 'react'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import { Task } from './interfaces/Task'

interface Props {
	title?: string
}

export function App({ title }: Props) {
	//Setup PWA Download Event
	const [isReadyForInstall, setIsReadyForInstall] = useState(false)

	useEffect(() => {
		window.addEventListener('beforeinstallprompt', (event) => {
			// Prevent the mini-infobar from appearing on mobile.
			event.preventDefault()
			console.log('👍', 'beforeinstallprompt', event)
			// Stash the event so it can be triggered later.
			window.deferredPrompt = event
			// Remove the 'hidden' class from the install button container.
			setIsReadyForInstall(true)
		})
	}, [])

	async function downloadApp() {
		console.log('👍', 'butInstall-clicked')
		const promptEvent = window.deferredPrompt
		if (!promptEvent) {
			// The deferred prompt isn't available.
			console.log('oops, no prompt event guardado en window')
			return
		}
		// Show the install prompt.
		promptEvent.prompt()
		// Log the result
		const result = await promptEvent.userChoice
		console.log('👍', 'userChoice', result)
		// Reset the deferred prompt variable, since
		// prompt() can only be called once.
		window.deferredPrompt = null
		// Hide the install button.
		setIsReadyForInstall(false)
	}

	const [count, setCount] = useState(0)
	const [tasks, setTasks] = useState<Task[]>([
		{
			id: 1,
			title: 'Aprender TypeScript',
			description: 'Armar una App de tareas simple con TypeScript',
			completed: false,
		},
	])

	const getCurrentTimestamp = (): number => new Date().getTime()

	const addNewTask = (task: Task) =>
		setTasks([
			...tasks,
			{ ...task, id: getCurrentTimestamp(), completed: false },
		])

	const deleteTask = (id: number) =>
		setTasks(tasks.filter((task) => task.id !== id))

	return (
		<div className='bg-dark text-white' style={{ height: '100%' }}>
			{isReadyForInstall && (
				<button className='text-danger' onClick={downloadApp}>
					Descarga
				</button>
			)}

			<nav className='navbar navbar-dark bg-primary'>
				<div className='container'>
					<a
						href='https://vitejs.dev/'
						target='_blank'
						className='navbar-brand'>
						<img src='./vite.svg' alt='ViteLogo' style={{ width: '4rem' }} />
					</a>
					{title && <h1>{title}</h1>}
				</div>
			</nav>
			<main className='container p-4'>
				<div className='row'>
					<div className='col-md-4'>
						<TaskForm addNewTask={addNewTask} />
					</div>
					<div className='col-md-8'>
						<div className='row'>
							<TaskList deleteTask={deleteTask} tasks={tasks} />
						</div>
					</div>
				</div>
			</main>
		</div>
	)
}

// export default App;
