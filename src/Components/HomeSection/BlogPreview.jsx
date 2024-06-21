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
        <section onClick={openBlog} className="blogPreview no-select">
            <h2>{data.title}</h2>
            <h3>By: {data.author}</h3>
            {owner === data.author 
            && <button 
                onClick={() => {deleteBlog(data.blog_id)}}
                className='danger'>Delete</button>}
        </section>
    )
}