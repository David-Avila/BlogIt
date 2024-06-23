import '../../App.css'
import { ContentContext } from '../ContentProvider'
import { useContext } from 'react'

export function BlogPreview({data, owner, deleteBlog}){
    const content = useContext(ContentContext);

    function openBlog() {
        content.setMode("Blog");
        content.setBlog(data);
    }

    return (
        <section className="blogPreview flex row no-select">
            <div className='flex column'>
                <h2>{data.title}</h2>
                <h3>By: {data.author}</h3>
            </div>

            <div className='flex column'>
                <button onClick={openBlog}>Open Blog</button>

                {owner === data.author 
                && <button 
                    onClick={() => {deleteBlog(data.blog_id)}}
                    className='danger'>Delete</button>}
            </div>
        </section>
    )
}