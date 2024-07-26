import '../../App.css'
import { ContentContext } from '../ContentProvider'
import { useContext } from 'react'

export function BlogPreview({data, owner, deleteBlog}){
    const content = useContext(ContentContext);

    function openBlog() {
        content.setBlog(data);
        content.setMode("Blog");
    }

    function editBlog(blog){
        content.setBlog(blog);
        content.setMode("Create Blog");
    }

    return (
        <section className="blogPreview no-select">
            <div className='flex column'>
                <h2>{data.title}</h2>
                <h3>By: {data.author}</h3>
            </div>

            <div className='btnsDiv'>
                <button onClick={openBlog}>Open</button>

                {owner === data.author 
                && 
				<>
                    <button 
                        onClick={() => {deleteBlog(data.blog_id)}}
                        className='danger'>Delete</button>

                    <button 
                        onClick={() => {editBlog(data)}}
                        >Edit</button>
                </>
                }
            </div>
        </section>
    )
}