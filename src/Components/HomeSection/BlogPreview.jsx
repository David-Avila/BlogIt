import '../../App.css'

export function BlogPreview({data}){

    function openBlog() {

    }

    return (
        <section onClick={openBlog} className="blogPreview no-select">
            <h2>{data.title}</h2>
            <h3>By: {data.author}</h3>
        </section>
    )
}