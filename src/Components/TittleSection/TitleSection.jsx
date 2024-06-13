import { useContext } from 'react'
import '../../App.css'
import { ContentContext } from '../ContentProvider'


export function TitleSection(){
    const content = useContext(ContentContext);    

    switch (content.mainData.displayMode){
        case "home":
            return (
                <section className='titleSection'>
                    <h1 className='titleHeader'>{content.mainData.title}</h1>
                    <p className='titleDesc'>{content.mainData.description}</p>
                </section>
            )
        case "blog":
            return (
                <section className='titleSection'>
                    <h1 className='titleHeader'>{content.blogData.title}</h1>
                    <p className='titleDesc'>{content.blogData.description}</p>
                </section>
            )
        default:
            return <h1>Error: No data found for {content.mainData.displayMode}</h1>
    }
}