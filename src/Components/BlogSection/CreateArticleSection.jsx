import '../../App.css'
import { ContentContext } from '../ContentProvider'
import { useContext } from 'react'
import sb from '../../../Private/SupabaseClient'

export function CreateArticleSection(){
    const content = useContext(ContentContext);

    function saveArticle(e){
        e.preventDefault();

        const newArticle = {
            title: e.target.title.value,
            content: e.target.content.value,
            blog_id: content.currentBlog.blog_id,
            private: e.target.private.checked,
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
                        })

                    if (error){
                        alert(error);
                    }
                }

                add()
                .then(() => {
                    content.setMode("Home");
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
        <form onSubmit={saveArticle} className='userForm'>
            <label htmlFor="title">Article Title:</label>
            <input type="text" name='title'/>
            <label htmlFor="content">Add a short description of the blog:</label>
            <textarea name="content"></textarea>
            <label htmlFor="private">Private Article:</label>
            <input type="checkbox" name="private" />
            <input className='btn' type="submit" value="Save" />
            <button onClick={cancelCreation}>Cancel</button>
        </form>
    )
}