import '../../App.css'
import { useContext, useEffect, useState } from "react"
import { BlogPreview } from "./BlogPreview";
import sb from '../../../Private/SupabaseClient'
import { ContentContext } from "../ContentProvider";

export function BlogsGrid(){
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

    return (
        <div className="blogsGrid flex row">
            {(blogs != undefined && blogs.length > 0)
            && blogs.map(blog => {
                if (!blog.private){
                    return <BlogPreview key={blog.blog_id} data={blog}/>
                }
            })}

            {content.currentUser 
            && 
                <div onClick={addBlog} className="blogPreview flex no-select">
                    <h2>Create your blog</h2>
                </div>
            }


        </div>
    )
}
