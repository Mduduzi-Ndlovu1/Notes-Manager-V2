import React, { RefObject, useEffect } from 'react'

interface DetectOutsideProps {
    ref: RefObject<HTMLDivElement>;
    callback: () => void
}

function useDetectOutside({ref, callback}: DetectOutsideProps) {
    useEffect(() => {
        // handles clicks outside the ref
        const handleClickOutside = (event: any) => {
            if(ref.current && !ref.current.contains(event.target)) {
                callback();
            }
        };
        // add evebt lsitener
    document.addEventListener("mousedown",handleClickOutside);

    //cleanup
    return () => {
        document.removeEventListener("mousedown", handleClickOutside)
    }
    }, [ref,callback]);

    return ref
}

export default useDetectOutside