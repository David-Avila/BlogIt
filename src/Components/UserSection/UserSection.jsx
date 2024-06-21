import { useState, useContext, useEffect } from 'react'
import '../../App.css'
import { UserConfig } from './UserConfig';
import { UserLogin } from './UserLogin';
import { ContentContext } from '../ContentProvider'

export function UserSection(){
    const [isLogged, setIsLogged] = useState(false);
    const content = useContext(ContentContext);

    useEffect(() => {
        if (content.currentUser){
            setIsLogged(true);
        }
    }, []);

    function setLogged(userData){
        setIsLogged(true);
        content.setUser(userData);
    }

    if (isLogged){
        return <UserConfig setLogged={setLogged}/>
    } else {
        return <UserLogin setLogged={setLogged}/>
    }
}