//design hook
import { useState } from "react";

export function useHover() {
    const [Hovered,setHovered] = useState(false);

    const listener = {
        onMouseEnter: () => setHovered(true),
        onMouseLeave: () => setHovered(false),
    };

    return [Hovered, listener] as const; 

}