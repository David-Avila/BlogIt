import '../../App.css'
import { ContentContext } from '../ContentProvider'
import { useContext } from 'react'
import sb from '../../../Private/SupabaseClient'
import { v4 as uuidv4 } from 'uuid'

export function CreateBlogSection(){
    const content = useContext(ContentContext);

    function saveBlog(e){
        e.preventDefault();

        const newBlog = {
            title: e.target.title.value,
            description: e.target.description.value,
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
                alert(error);
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
                        alert(error);
                    }
                }

                add()
                .then(() => {
                    content.setMode("Home");
                })

            }
            else {
                alert("Blog already exists");
            }
        })
    }

    function cancelCreation(){
        content.setMode("Home");
    }

    return (
        <form onSubmit={saveBlog} className='userForm'>
            <label htmlFor="title">Blog Title:</label>
            <input type="text" name='title'/>
            <label htmlFor="description">Add a short description of the blog:</label>
            <input type="text" name='description'/>
            <label htmlFor="private">Private Blog:</label>
            <input type="checkbox" name="private" />
            <input className='btn' type="submit" value="Save" />
            <button onClick={cancelCreation}>Cancel</button>
        </form>
    )
}