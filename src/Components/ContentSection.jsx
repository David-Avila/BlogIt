import { useContext } from "react"
import { ContentContext } from "./ContentProvider"
import { HomeSection } from "./HomeSection/HomeSection";
import { BlogSection } from "./BlogSection/BlogSection";

export function ContentSection(){
    const content = useContext(ContentContext);

    switch (content.mainData.displayMode){
        case "home":
            return <HomeSection />
        case "blog":
            return <BlogSection />
        default:
            return <h1>Unknown display mode: {content.mainData.displayMode}</h1>
    }
}