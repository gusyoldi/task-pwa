import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import 'bootswatch/dist/yeti/bootstrap.min.css'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<App title='Aplicación de tareas con React y TypeScript' />
	</React.StrictMode>
)

serviceWorkerRegistration.register({
	onUpdate: async (registration: any) => {
		// Corremos este código si hay una nueva versión de nuestra app
		// Detalles en: https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle
		if (registration && registration.waiting) {
			await registration.unregister()
			registration.waiting.postMessage({ type: 'SKIP_WAITING' })
			// Des-registramos el SW para recargar la página y obtener la nueva versión. Lo cual permite que el navegador descargue lo nuevo y que invalida la cache que tenía previamente.
			window.location.reload()
		}
	},
})
