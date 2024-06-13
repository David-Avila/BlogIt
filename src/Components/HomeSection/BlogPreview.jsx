
export function BlogPreview({data}){
    return (
        <section className="blogPreview">
            <h2>{data.title}</h2>
            <h3>{data.author}</h3>
        </section>
    )
}