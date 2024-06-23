import '../../App.css'
import { useContext, useEffect, useRef } from 'react'
import { ContentContext } from '../ContentProvider'


export function ArticleViewer(){
    const content = useContext(ContentContext);
    const textContent = content.currentArticle.content.replace("/\n/", "<br/>");
    const parr = useRef();

    useEffect(() => {
        content.setData({
            title: content.currentArticle.title,
            description: "By: " + content.currentArticle.author,
        })

        parr.current.innerText = content.currentArticle.content.replace("/\n/", "<br/>");
    }, [])

    function goBack(){
        content.setMode(content.previusMode);
    }

    return(
        <div className='flex column padding'>
            <button onClick={goBack}>Back</button>
            <p className='articleContent' ref={parr}></p>
        </div>
    )

}