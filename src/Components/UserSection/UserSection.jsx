import { useState } from 'react'
import '../../App.css'
import { UserConfig } from './UserConfig';
import { UserLogin } from './UserLogin';

export function UserSection(){
    const [isLogged, setIsLogged] = useState(false);

    if (isLogged){
        return <UserConfig setLogged={setIsLogged}/>
    } else {
        return <UserLogin setLogged={setIsLogged}/>
    }
}