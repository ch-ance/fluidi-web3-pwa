import {useState, useEffect} from 'react'

export default function useLocalStorage(key, initialValue = null) {
    const init = () => localStorage.getItem(key) ?? initialValue;
    const [state, setState] = useState(init);

    useEffect(() => {
        localStorage.setItem(key, state);
    }, [key, state])

    return [state, setState];
}

// const [count, setCount] = useLocalStorage('count', 0);