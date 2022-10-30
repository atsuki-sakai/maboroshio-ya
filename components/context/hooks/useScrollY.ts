import React, { useState, useEffect } from 'react'

const useScrollY = () => {
    const [scrollY, setScrollY] = useState(0);
    useEffect(() => {
        function handleScrollYChange() {
        setScrollY(window.scrollY);
        }
        window.addEventListener('scroll', handleScrollYChange);
    }, [])
    return scrollY;
}

export default useScrollY