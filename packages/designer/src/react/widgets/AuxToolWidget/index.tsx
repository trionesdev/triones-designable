import {useDesigner, useViewport} from "../../hooks";
import {useEffect, useRef} from "react";
import React from "react";

export const AuxToolWidget = ()=>{
    const engine = useDesigner()
    const viewport = useViewport()
    const ref = useRef<HTMLDivElement>()
    useEffect(() => {
        return engine.subscribeWith('viewport:scroll', () => {
            if (viewport.isIframe && ref.current) {
                ref.current.style.transform = `perspective(1px) translate3d(${-viewport.scrollX}px,${-viewport.scrollY}px,0)`
            }
        })
    }, [engine, viewport])

    if (!viewport) return null
    return  (<div ref={ref}>
        ss
    </div>)
}
AuxToolWidget.displayName = 'AuxToolWidget'