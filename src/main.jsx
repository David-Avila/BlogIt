import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import ThemeProvider from './Components/ThemeProvider'
import './App.css'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <ThemeProvider>
		<App/>
	</ThemeProvider>
)
