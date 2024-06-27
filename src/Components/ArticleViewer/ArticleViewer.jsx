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

        // NEW LINES
        let textContent = content.currentArticle.content.replace(/\n/g, "<br>");

        // TITLES
        textContent = textContent.replace(/<B/g, "<span class='bold'>")
        textContent = textContent.replace(/B>/g, "</span>")

        // ITALIC
        textContent = textContent.replace(/<I/g, "<i>")
        textContent = textContent.replace(/I>/g, "</i>")
        parr.current.innerHTML = textContent;
        //parr.current.innerText = content.currentArticle.content;
    }, [])

    function goBack(){
        content.setArticle(null);
        content.setMode(content.previusMode);
    }

    return(
        <div className='flex column articleViewer'>
            <button onClick={goBack}>Back</button>
            <h3 className='articleContent' ref={parr}></h3>
        </div>
    )

}