import { createContext, useEffect, useState } from "react"

export const ThemeContext = createContext();

function ThemeProvider({children}){
    const [theme, setTheme] = useState("dark");
    
    useEffect(() => {
        checkTheme();
    }, [theme])

    function checkTheme(){
        const docStyles = document.documentElement.style;
        switch (theme){
            case "dark":
                docStyles.setProperty('--bgColor', "#161616");
                docStyles.setProperty('--fontColor', "#ececec");
                docStyles.setProperty('--accentColor', "#352386");

                break;
            case "light":
                docStyles.setProperty('--bgColor', "#ececec");
                docStyles.setProperty('--fontColor', "#161616");
                docStyles.setProperty('--accentColor', "#41cf41");

                break;
            default:
                alert("ThemeProvider - 27: " + theme + " theme has no styles applied to it.")
        }
        //
    }

    function changeTheme(newTheme){
        setTheme(newTheme);
    }

    return (
        <ThemeContext.Provider value={{theme, changeTheme, checkTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider;
