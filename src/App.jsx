import './App.css'
import { NavBar } from './Components/NavBar/NavBar'
import { TitleSection } from './Components/TittleSection/TitleSection'
import { ContentSection } from './Components/ContentSection'
import { ContentProvider } from './Components/ContentProvider'
import { AlertPrompt } from './Components/AlertPrompt/AlertPrompt'
import { useEffect, useState } from 'react'

function App() {
	const [displayMode, setDisplayMode] 		= useState("Home");
	const [currentBlog, setCurrentBlog] 		= useState();
	const [currentUser, setCurrentUser] 		= useState();
	const [currentArticle, setCurrentArticle] 	= useState();
	const [previusMode, setPreviusMode] 		= useState("Home");
	const [alertMsg, setAlertMsg]				= useState("");
	const [alertShow, setAlertShow]				= useState(false);

	const [appData, setAppData] = useState({
		title: "BlogIt",
		description: "Make your dream blog real",
	});

	useEffect(() => {

		const fetchUser = localStorage.getItem('user');
		if (fetchUser){
			setUser(JSON.parse(fetchUser));
		}
	}, [])

	const defaultAppData = {
		title: "BlogIt",
		description: "Make your dream blog real",
	}

	function setBlog(blog){
		setCurrentBlog(blog);
	}

	function setMode(mode){
		setPreviusMode(displayMode);
		if (mode === "Home"){
			setBlog(null);
			setArticle(null);
			setDefaultData();
		} else if (mode != "Blog" && mode != "Article" && mode != "Create Article" && mode != "Create Blog"){
			setBlog(null);
			setArticle(null);
		}
		setDisplayMode(mode);
	}

	function setUser(user){
		setCurrentUser(user)
	}

	function setData(data){
		setAppData(data);
	}

	function setDefaultData(){
		setAppData(defaultAppData);
	}

	function setArticle(art){
		setCurrentArticle(art);
	}

	function showAlert(msg){
		setAlertShow(true);
		setAlertMsg(msg);
	}

	function hideAlert(){
		setAlertShow(false);
		setAlertMsg("");
	}

    return (
        <ContentProvider className='app' 
		data={{
			appData,
			currentUser,
			currentBlog,
			displayMode,
			previusMode,
			currentArticle,
			setBlog,
			setMode,
			setUser,
			setData,
			setDefaultData,
			setArticle,
			showAlert,
		}}
		>
            <NavBar/>
			<TitleSection />
			<ContentSection/>
			<AlertPrompt msg={alertMsg} enabled={alertShow} disable={hideAlert} />
        </ContentProvider>
    )
}

export default App;
