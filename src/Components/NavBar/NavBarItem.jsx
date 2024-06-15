import { useState } from 'react'
import '../../App.css'
import { TooltipMenu } from '../TooltipMenu.jsx/TooltipMenu'

export function NavBarItem({data}){
    const [showTooltip, setShowTooltip] = useState(false);

    return (
            <h3>
                <a 
                onClick={data.action} 
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                >
                    {data.icon}                
                    <TooltipMenu enabled={showTooltip} tooltip={data.tooltip}/>
                </a>
                
            </h3>
        
    )
}