import { useState } from 'react';
import '../../App.css'
import { NavBarItem } from '../NavBar/NavBarItem'
import { FaGithub, FaGoogle, FaLinkedin } from 'react-icons/fa6'

export function ContactSection(){
    const [gmailMsg, setGmailMsg] = useState();
    const iconSize = 32;

    function goTo(link){
        window.open(link, '_blank');
    }

    function gmailClicked(){
        setGmailMsg(true);

        navigator.clipboard.writeText("aviladurandavid613@gmail.com");

        setTimeout(() => {
            setGmailMsg(false);
        }, 2000);
    }

    return (
        <section className='flex column padding'>
            <h3>Hi, thanks for using BlogIt</h3>
            <p>
                If you have a bug or want a specific feature, reach me out with the 
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
                        action: gmailClicked, 
                        icon: <FaGoogle size={iconSize}/>,
                        tooltip: gmailMsg ? "Direction copied" : "Gmail",
                        }} 
                />
                
            </div>
        </section>
    )
}

