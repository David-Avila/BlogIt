import '../../App.css'
import { useContext } from 'react'
import { ContentContext } from '../ContentProvider'
import { UserBlogs } from './UserBlogs';

export function UserConfig(){
    const content = useContext(ContentContext);

    function logOut(){
        localStorage.removeItem('user');
        content.setUser(null);
        content.setMode("Home");
    }

    function changeUser(){

    }

    function changePass(){

    }

    return (
        <div className='userConfig'>
            <h2>Hi {content.currentUser.username}. Here you
                can configurate your profile.
            </h2>

            <div className='flex column'>
                <button onClick={logOut}>Log Out</button>
                <button onClick={changeUser}>Change Username</button>
                <button onClick={changePass}>Change Password</button>
            </div>

            <UserBlogs />
            
        </div>
    )
}