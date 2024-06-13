import '../../App.css'
import { useContext } from 'react'
import { ThemeContext } from '../ThemeProvider'
import { ContentContext } from '../ContentProvider';
import { FaHouse, FaMoon, FaSun } from "react-icons/fa6";
import { FaInfoCircle, FaAddressCard, FaUser } from "react-icons/fa";

export function NavBar(){
    const themeContext = useContext(ThemeContext);
    const content = useContext(ContentContext);

    const iconSize = 22;

    function btnHomeClicked(){
        content.setMode("home");
    }

    function btnAboutClick(){
        
    }

    function btnContactClick(){

    }

    function btnUserClicked(){

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
                <h3><a onClick={btnHomeClicked}><FaHouse size={iconSize}/></a></h3>
                <h3><a onClick={btnAboutClick}><FaInfoCircle size={iconSize} /></a></h3>
                <h3><a onClick={btnContactClick}><FaAddressCard size={iconSize} /></a></h3>
            </div>
            
            <div className='navBarMainBtns'>
                <h3>
                    <a className='btnThemeSelect' onClick={btnChangeThemeClick}>
                        {themeContext.theme === "dark" 
                        ? <FaMoon size={iconSize}/> 
                        : <FaSun size={iconSize}/>}
                    </a>
                </h3>
                <h3><a onClick={btnUserClicked}><FaUser size={iconSize}/></a></h3>
            </div>
        </div>
    )
}