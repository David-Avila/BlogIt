import '../../App.css'
import { useContext } from 'react'
import { ThemeContext } from '../ThemeProvider'
import { ContentContext } from '../ContentProvider';
import { FaHouse, FaMoon, FaSun } from "react-icons/fa6";
import { FaInfoCircle, FaAddressCard, FaUser } from "react-icons/fa";
import { NavBarItem } from './NavBarItem';

export function NavBar(){
    const themeContext = useContext(ThemeContext);
    const content = useContext(ContentContext);

    const iconSize = 22;

    function btnHomeClicked(){
        content.setData({
            title: "Blog It",
            description: "Make your dream  blog real",
        })
        content.setMode("Home");
    }

    function btnAboutClick(){
        content.setData({
            title: "About",
            description: "What is Blog It?",
        })
        content.setMode("About");
    }

    function btnContactClick(){
        content.setData({
            title: "Contact",
            description: "Here is how you can contact me",
        })
        content.setMode("Contact");
    }

    function btnUserClicked(){
        content.setData({
            title: "User",
            description: "Manage your account here",
        })
        content.setMode("User");
    }

    function btnChangeThemeClick(){
        if (themeContext.theme === "dark")
            themeContext.changeTheme("light");
        else
            themeContext.changeTheme("dark");
    }

    return (
        <div className='navBar'>
            <div className='navBarMainBtns'>

                <NavBarItem data={{
                    action: btnHomeClicked, 
                    icon: <FaHouse size={iconSize}/>,
                    tooltip: "Home",
                    }} />

                <NavBarItem data={{
                    action: btnAboutClick, 
                    icon: <FaInfoCircle size={iconSize}/>,
                    tooltip: "About",
                    }} />
                
                <NavBarItem data={{
                    action: btnContactClick, 
                    icon: <FaAddressCard size={iconSize}/>,
                    tooltip: "Contact",
                    }} />

            </div>
            
            <div className='navBarMainBtns'>
    
                <NavBarItem className='btnThemeSelect' data={{
                    action: btnChangeThemeClick, 
                    icon: themeContext.theme === "dark" 
                            ? <FaSun size={iconSize}/> 
                            : <FaMoon size={iconSize}/>,
                    tooltip: themeContext.theme === "dark"
                            ?   "Light Mode"
                            :   "Dark Mode",
                    }} />
              
                <NavBarItem data={{
                    action: btnUserClicked, 
                    icon: <FaUser size={iconSize}/>,
                    tooltip: "User",
                    }} />

            </div>
        </div>
    )
}