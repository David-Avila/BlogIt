import { useContext } from 'react'
import '../../App.css'
import { ContentContext } from '../ContentProvider'

export function TitleSection(){
    const content = useContext(ContentContext);    

    switch (content.displayMode){
        case "Blog":
            return (
                <section className='titleSection'>
                    <h1 className='titleHeader'>{content.currentBlog.title}</h1>
                    <p className='titleDesc'>{content.currentBlog.description}</p>
                </section>
            )
        default:
            return (
                <section className='titleSection'>
                    <h1 className='titleHeader'>{content.appData.title}</h1>
                    <p className='titleDesc'>{content.appData.description}</p>
                </section>
            )
    }
}