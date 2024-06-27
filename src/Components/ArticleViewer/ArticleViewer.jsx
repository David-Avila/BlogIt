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
        textContent = textContent.replace(/<H/g, "<span class='bold'>")
        textContent = textContent.replace(/H>/g, "</span>")

        // SMALL TITLES
        textContent = textContent.replace(/<h/g, "<span class='bold-small'>")
        textContent = textContent.replace(/h>/g, "</span>")
        // COURSIVE
        textContent = textContent.replace(/<C/g, "<i>")
        textContent = textContent.replace(/C>/g, "</i>")
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
            <p className='articleContent' ref={parr}></p>
        </div>
    )

}