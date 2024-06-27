import '../../App.css'
import { useContext } from 'react'
import { ContentContext } from '../ContentProvider'
import { UserBlogs } from './UserBlogs';

export function UserConfig(){
    const content = useContext(ContentContext);

    function logOut(){
        content.setUser(null);
        content.setMode("Home");
    }

    return (
        <div className='userConfig'>
            <h2>Hi {content.currentUser.username}. Here you
                can config your profile.
            </h2>

            <div className='flex column'>
                <button onClick={logOut}>Log Out</button>
                <h2>Change Username</h2>
                <h2>Change Password</h2>
            </div>

            <h2>This are your blogs</h2>
            <UserBlogs />
            
        </div>
    )
}