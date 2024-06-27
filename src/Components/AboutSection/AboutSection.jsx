import { FaGithub } from 'react-icons/fa6'
import '../../App.css'
import { NavBarItem } from '../NavBar/NavBarItem'

export function AboutSection(){
    return (
        <div style={{textAlign: "center"}}>
            <p>BlogIt is a website in wich you can create your own blog and share it 
                with other people.
                <br /> <br />
                Write tutorials, science articles or make a news related blog.

                <br /> <br />
                Whatever you want to write about, you can use BlogIt.
                <br /><br />
            </p>

            <h3>Find the source code on GitHub</h3>
            <NavBarItem data={{
                    action: () => {
                        window.open("https://github.com/David-Avila/BlogIt", "_blank");
                    }, 
                    icon: <FaGithub size={32}/>,
                    tooltip: "Open Github",
                    }} />
        </div>
    )
}