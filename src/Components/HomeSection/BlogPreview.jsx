import '../../App.css'

export function BlogPreview({data, owner, deleteBlog}){

    function openBlog() {
        console.log(data);
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