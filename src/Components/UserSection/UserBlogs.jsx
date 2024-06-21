import { useState, useContext, useEffect } from 'react'
import { ContentContext } from '../ContentProvider';
import { BlogPreview } from '../HomeSection/BlogPreview';
import sb from '../../../Private/SupabaseClient'
import '../../App.css'

export function UserBlogs(){
    const [blogs, setBlogs] = useState();
    const content = useContext(ContentContext);

    useEffect(() => {
        loadBlogs()
        .then(res => {
            setBlogs(res);
        })
    }, [])

    async function loadBlogs(){
        const { data, error } = await sb
            .from("Blogs")
            .select("*")
            .eq('author', content.currentUser.username);

        if (error){
            alert(error.message);
        }        

        if (data){
            return data;
        }
    }

    function addBlog(){
        if (!content.currentUser){
            alert("You have to be loged in to create a blog");
            return
        }

        content.setMode("Create Blog");
    }

    function deleteBlog(id){

        const del = async () => {
            const { error } = await sb
            .from('Blogs')
            .delete()
            .eq('blog_id', id)

            if (error){
                alert(error);
            }
        }

        del()
        .then(() => {
            loadBlogs()
            .then(res => {
                setBlogs(res);
            })
        })

    }

    return (
        <div className="blogsGrid flex">
            {(blogs != undefined && blogs.length > 0)
            && blogs.map(blog => {
                return <BlogPreview owner={content.currentUser.username} key={blog.blog_id} data={blog} deleteBlog={deleteBlog}/>
            })}

            <div onClick={addBlog} className="blogPreview flex no-select">
                <h2>Create your blog</h2>
            </div>

        </div>
    )

}