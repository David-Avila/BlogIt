import './App.css'
import { NavBar } from './Components/NavBar/NavBar'
import { TitleSection } from './Components/TittleSection/TitleSection'
import { ContentSection } from './Components/ContentSection'
import { ContentProvider } from './Components/ContentProvider'
import { useState } from 'react'

function App() {
	const [displayMode, setDisplayMode] = useState("home");
	const [currentBlog, setCurrentBlog] = useState();

	const appData = {
		title: "Blog It",
		description: "Make your dream blog real",
		displayMode,
	}

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

    return (
        <ContentProvider className='app' 
		data={{
			mainData: appData,
			blogData: currentBlog,
			setBlog: setBlog,
			setMode: setMode,
		}}
		>
            <NavBar/>
			<TitleSection />
			<ContentSection/>
        </ContentProvider>
    )
}

export default App;