import '../../App.css'
import { useContext, useEffect, useState } from 'react'
import { ContentContext } from '../ContentProvider'
import sb from '../../../Private/SupabaseClient'

export function BlogSection(){
    const [articles, setArticles] = useState();
    const content = useContext(ContentContext);

    useEffect(() => {
        content.setData({
            title: content.currentBlog.title,
            description: content.currentBlog.description,
        })

        loadArticles()
        .then(res => {
            setArticles(res);
        })

    }, [])


    async function loadArticles(){
        const { data, error } = await sb
            .from("Articles")
            .select("*")
            .eq("blog_id", content.currentBlog.blog_id);

        if (error){
            alert(error.message);
        }        

        if (data){
            return data;
        }
    }

    function addArticle(){
        content.setMode("Create Article");
    }
    

    return (
        <div className='blogsGrid flex'>

            {(articles != undefined && articles.length > 0)
            && articles.map(art => {
                
            })}

            <div onClick={addArticle} className="blogPreview flex no-select">
                <h2>Add Article</h2>
            </div>
        </div>
    )
}
