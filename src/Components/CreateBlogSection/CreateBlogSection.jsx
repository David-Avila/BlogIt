import '../../App.css'
import { ContentContext } from '../ContentProvider'
import { useContext, useEffect, useRef } from 'react'
import sb from '../../../Private/SupabaseClient'
import { v4 as uuidv4 } from 'uuid'

export function CreateBlogSection(){
    const content = useContext(ContentContext);
    const title = useRef();
    const desc = useRef();
    const priv = useRef();

    useEffect(() => {
        if (content.currentBlog){
            title.current.value = content.currentBlog.title;
            desc.current.innerText = content.currentBlog.description;
            priv.current.checked = content.currentBlog.private;
        }
    }, [])

    function saveBlog(e){
        e.preventDefault();

        if (content.currentBlog){
            const upd = async () => {
                const { data, error } = await sb
                .from('Blogs')
                .update({ 
                    title: e.target.title.value,
                    description: desc.current.innerText,
                    private: e.target.private.checked,
                })
                .eq('blog_id', content.currentBlog.blog_id)

                if (error){
                    content.showAlert(error.message);
                }
            }

            upd()
            .then(() => {
                content.setMode(content.previusMode);
                content.setBlog(null);
            })    

            return;
        }

        const newBlog = {
            title: e.target.title.value,
            description: desc.current.innerText,//e.target.description.value,
            blog_id: uuidv4(),
            private: e.target.private.checked,
            author: content.currentUser.username,
        }

        // Check if blog title already exists
        const checkTitle = async () => {
            const { data, error} = await sb
                .from("Blogs")
                .select("*")
                .eq("title", newBlog.title)

            if (error){
                content.showAlert(error.message);
            }

            if (data){
                return data;
            }
        }

        checkTitle()
        .then(res => {
            if (res == undefined || res.length === 0){
                //Add new blog

                const add = async () => {
                    const {data, error} = await sb
                        .from("Blogs")
                        .insert({
                            title: newBlog.title,
                            description: newBlog.description,
                            blog_id: newBlog.blog_id,
                            author: newBlog.author,
                            private: newBlog.private,
                        })

                    if (error){
                        content.showAlert(error.message);
                    }
                }

                add()
                .then(() => {
                    content.setMode("Home");
                })

            }
            else {
                content.showAlert("Blog already exists");
            }
        })
    }

    function cancelCreation(){
        content.setMode(content.previusMode);
    }

    return (
        <form onSubmit={saveBlog} className='flex column newArticleDiv'>
            <label htmlFor="title">Blog Title:</label>
            <input type="text" ref={title} name='title'/>
            <label htmlFor="description">Add a short description of the blog:</label>
            <span className="textArea" ref={desc} role="textbox" name="description" contentEditable></span>   
            <label htmlFor="private">Private Blog:</label>
            <input type="checkbox" ref={priv} name="private" />
            <input className='btn' type="submit" value="Save" />
            <button onClick={cancelCreation}>Cancel</button>
        </form>
    )
}
