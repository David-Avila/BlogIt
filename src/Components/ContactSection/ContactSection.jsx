import '../../App.css'
import { NavBarItem } from '../NavBar/NavBarItem'
import { FaGithub, FaGoogle, FaLinkedin } from 'react-icons/fa6'

export function ContactSection(){
    const iconSize = 32;

    function goTo(link){
        window.open(link, '_blank');
    }

    return (
        <section className='flex column padding'>
            <h3>Hi, thanks for using BlogIt</h3>
            <p>
                If you have a bug or want a specific feature, contact me with the 
                following links.
            </p>
            <div className='flex row socialIcons'>
                <NavBarItem data={{
                        action: () => {goTo("https://www.linkedin.com/in/david-avila-duran-12568a222")}, 
                        icon: <FaLinkedin size={iconSize}/>,
                        tooltip: "LinkedIn",
                        }} 
                />
                <NavBarItem data={{
                        action: () => {goTo("https://github.com/David-Avila")}, 
                        icon: <FaGithub size={iconSize}/>,
                        tooltip: "GitHub",
                        }} 
                />
                
                
            </div>
        </section>
    )
}
/* GMAIL
<NavBarItem data={{
                        action: () => {}, 
                        icon: <FaGoogle size={iconSize}/>,
                        tooltip: "Gmail",
                        }} 
                />*/