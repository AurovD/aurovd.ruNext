import {MutableRefObject, useEffect, useRef} from "react";

export const useObserver = (ref, callback) => {
    const observer: MutableRefObject<any> = useRef();

    

    useEffect(() => {
        let cb = function(entries) {
            if (entries[0].isIntersecting) {
                callback()
            }
        };
        observer.current = new IntersectionObserver(cb);
        observer.current.observe(ref.current)
    }, [])
}