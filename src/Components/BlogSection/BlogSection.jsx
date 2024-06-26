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
            content.showAlert(error.message);
        }        

        if (data){
            return data;
        }
    }

    function addArticle(){
        content.setMode("Create Article");
    }
    
    function deleteArticle(id){
        const del = async () => {
            const { error } = await sb
            .from('Articles')
            .delete()
            .eq('art_id', id)

            if (error){
                content.showAlert(error.message);
            }
        }

        del()
        .then(() => {
            loadArticles()
            .then(res => {
                setArticles(res);
            })
        })
    }

    function openArticle(art){
        content.setArticle(art);
        content.setMode("Article");
    }

    function editArticle(art){
        content.setArticle(art);
        content.setMode("Create Article")
    }

    return (
        <div className='blogsGrid flex'>

            {(articles != undefined && articles.length > 0)
            && articles.map(art => {
                    if (!art.private || (content.currentUser &&  art.author === content.currentUser.username)){
                        return (<div key={art.art_id} className="blogPreview flex column no-select">
                            <h1>{art.title}</h1>

                            <div className='btnsDiv'>
                                <button onClick={() => {openArticle(art)}}>Open</button>

                                {(content.currentUser != undefined && content.currentUser.username === art.author)
                                    && <>
                                    <button 
                                        onClick={() => {deleteArticle(art.art_id)}}
                                        className='danger'>Delete
                                    </button>

                                    <button onClick={() => {editArticle(art)}}>
                                        Edit
                                    </button>
                                    </>
                                }
                            </div>
                        </div>)
                    }
            })}

            {(content.currentUser && content.currentUser.username === content.currentBlog.author)
            && 
                <div onClick={addArticle} className="blogPreview flex no-select">
                    <h2>Add Article</h2>
                </div>
            }

        </div>
    )
}
