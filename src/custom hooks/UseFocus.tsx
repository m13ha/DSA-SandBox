import { useRef } from "react"

const useFocus = () => {
    const htmlElRef = useRef<any>(null)
    const setFocus = () => {
        if (htmlElRef.current) {
            htmlElRef.current.focus();
        }
    };

    return [htmlElRef, setFocus] as const
}

export default useFocus