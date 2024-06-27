import '../../App.css'
import { ContentContext } from '../ContentProvider'
import { useContext, useEffect, useRef, useState } from 'react'
import sb from '../../../Private/SupabaseClient'
import { v4 as uuidv4 } from 'uuid'

export function CreateArticleSection({}){
    const content = useContext(ContentContext);
    const [artData, setArtData] = useState();
    const artTitle = useRef();
    const cont = useRef();
    const isPriv = useRef();

    useEffect(() => {
        if (content.currentArticle){
            setArtData(content.currentArticle);
            setTimeout(() => {
                artTitle.current.value = content.currentArticle.title;
                cont.current.innerText = content.currentArticle.content;
                isPriv.current.checked = content.currentArticle.private;
            }, 50);
        }
    }, [])

    

    function saveArticle(e){
        e.preventDefault();

        if (artData){

            const upd = async () => {
                const { data, error } = await sb
                .from('Articles')
                .update({ 
                    title: e.target.title.value,
                    content: cont.current.innerText,
                    private: e.target.private.checked,
                })
                .eq('art_id', artData.art_id)

                if (error){
                    alert(error);
                }
            }

            upd()
            .then(() => {
                content.setMode(content.previusMode);
            })            

            return
        }

        const newArticle = {
            title: e.target.title.value,
            content: cont.current.innerText,
            blog_id: content.currentBlog.blog_id,
            private: e.target.private.checked,
            art_id: uuidv4(),
            author: content.currentUser.username
        }

        // Check if blog title already exists
        const checkTitle = async () => {
            const { data, error} = await sb
                .from("Articles")
                .select("*")
                .eq("title", newArticle.title)

            if (error){
                alert(error);
            }

            if (data){
                return data;
            }
        }

        checkTitle()
        .then(res => {
            if (res == undefined || res.length === 0){

                const add = async () => {
                    const {data, error} = await sb
                        .from("Articles")
                        .insert({
                            title: newArticle.title,
                            content: newArticle.content,
                            blog_id: newArticle.blog_id,
                            private: newArticle.private,
                            art_id: newArticle.art_id,
                            author: newArticle.author,
                        })

                    if (error){
                        alert(error);
                    }
                }

                add()
                .then(() => {
                    content.setMode(content.previusMode);
                })

            }
            else {
                alert("Article already exists");
            }
        })
    }

    function cancelCreation(){
        content.setMode(content.previusMode);
    }

    return (
        <form onSubmit={saveArticle} className='flex column newArticleDiv'>
                <label htmlFor="title">Article Title:</label>
                <input type="text" ref={artTitle} name='title'/>

                <label htmlFor='content'>Write Content here:</label>
                <span className="textArea" role="textbox" ref={cont}  name="content" contentEditable></span>                

                <label htmlFor="private">Private Article:</label>
                <input type="checkbox" ref={isPriv} name="private" />
                <input type="submit" value="Save" />
                <button onClick={cancelCreation}>Cancel</button>
        </form>
    )
}
