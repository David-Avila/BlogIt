import './App.css'
import { NavBar } from './Components/NavBar/NavBar'
import { TitleSection } from './Components/TittleSection/TitleSection'
import { ContentSection } from './Components/ContentSection'
import { ContentProvider } from './Components/ContentProvider'
import { useState } from 'react'

function App() {
	const [displayMode, setDisplayMode] = useState("Home");
	const [currentBlog, setCurrentBlog] = useState();
	const [currentUser, setCurrentUser] = useState();
	const [appData, setAppData] = useState({
		title: "Blog It",
		description: "Make your dream blog real",
	});

	function setBlog(blog){
		if (blog){
			setCurrentBlog(blog);
		}
	}

	function setMode(mode){
		if (mode){
			setDisplayMode(mode);
		}
	}

	function setUser(user){
		if (user){
			setCurrentUser(user)
		}
	}

	function setData(data){
		if (data){
			setAppData(data);
		}
	}

    return (
        <ContentProvider className='app' 
		data={{
			appData,
			currentUser,
			currentBlog,
			displayMode,
			setBlog,
			setMode,
			setUser,
			setData,
		}}
		>
            <NavBar/>
			<TitleSection />
			<ContentSection/>
        </ContentProvider>
    )
}

export default App;