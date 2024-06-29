import { useEffect, useState } from 'react'
import '../../App.css'

export function AlertPrompt({msg, enabled, disable}){    

    return (
        <div className={enabled ? "alert showAlert" : "alert hideAlert"}>
            {enabled 
            &&
            <>
                <h2>{msg}</h2>
                <button 
                    onClick={disable}
                >Continue</button>
            </>
            }
            
        </div>
    )
}