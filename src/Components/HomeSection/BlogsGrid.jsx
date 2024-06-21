import { useContext, useEffect, useState } from "react"
import { BlogPreview } from "./BlogPreview";
import sb from '../../../Private/SupabaseClient'
import {v4 as uuidv4} from 'uuid'
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

        const newBlog = {
            title: "Test Blog",
            description: "Blog added for testing",
            blog_id: uuidv4(),
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
                        })

                    if (error){
                        alert(error);
                    }
                }

                add();

            }
            else {
                alert("Blog already exists");
            }
        })

    }

    return (
        <div className="blogsGrid flex">
            {(blogs != undefined && blogs.length > 0)
            && blogs.map(blog => {
                return <BlogPreview data={blog}/>
            })}

            <div onClick={addBlog} className="blogPreview flex no-select">
                <h2>Create your blog</h2>
            </div>

        </div>
    )
}