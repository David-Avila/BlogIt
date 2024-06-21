import { useContext } from "react"
import { ContentContext } from "./ContentProvider"
import { HomeSection        } from "./HomeSection/HomeSection";
import { BlogSection        } from "./BlogSection/BlogSection";
import { UserSection        } from "./UserSection/UserSection";
import { AboutSection       } from "./AboutSection/AboutSection";
import { ContactSection     } from "./ContactSection/ContactSection"
import { CreateBlogSection  } from "./CreateBlogSection/CreateBlogSection";
import { CreateArticleSection } from "./BlogSection/CreateArticleSection";

export function ContentSection(){
    const content = useContext(ContentContext);

    switch (content.displayMode){
        case "Home":
            return <HomeSection />
        case "Blog":
            return <BlogSection />
        case "User":
            return <UserSection />
        case "About":
            return <AboutSection />
        case "Contact":
            return <ContactSection />
        case "Create Blog":
            return <CreateBlogSection />
        case "Create Article":
            return <CreateArticleSection />
        default:
            return <h1>Unknown display mode: {content.displayMode}</h1>
    }
}