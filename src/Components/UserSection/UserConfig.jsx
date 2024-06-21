import '../../App.css'
import { useContext } from 'react'
import { ContentContext } from '../ContentProvider'

export function UserConfig(){
    const content = useContext(ContentContext);

    return (
        <div className='userConfig'>
            <h2>Hi {content.currentUser.username}. Here you
                can config your profile.
            </h2>
        </div>
    )
}