import '../../App.css'
import { useContext, useEffect, useRef } from 'react'
import { ContentContext } from '../ContentProvider'


export function ArticleViewer(){
    const content = useContext(ContentContext);
    const parr = useRef();

    useEffect(() => {
        content.setData({
            title: content.currentArticle.title,
            description: "By: " + content.currentArticle.author,
        })

        let textContent = content.currentArticle.content.replace("\n", "<br/>");
        textContent = textContent.replace("<B>", "<bold>");
        textContent = textContent.replace("</B>", "</bold>");
        textContent = textContent.replace("<I>", "<i>");
        textContent = textContent.replace("</I>", "</i>");

        parr.current.innerHTML = textContent;
    }, [])

    function goBack(){
        content.setMode(content.previusMode);
    }

    return(
        <div className='flex column articleViewer'>
            <button onClick={goBack}>Back</button>
            <p className='articleContent' ref={parr}></p>
        </div>
    )

}