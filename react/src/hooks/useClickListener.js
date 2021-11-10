import { useEffect } from "react/cjs/react.production.min"

function useClickListener(ref, callback){
    function onClick(e){
        callback(e)
    }

    useEffect(() => {
        ref.current.addEventListener("click", onClick)
        return () => {
            ref.current.removeEventListener("click", onClick)
        }
    }, [onClick])
}

export default useClickListener