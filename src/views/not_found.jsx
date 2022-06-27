import { Link } from "react-router-dom";

export function NotFound(){
    return (
        <>
            <h1>page introuvable</h1>
            <Link to="/">home</Link>
            
        </>
    )
}