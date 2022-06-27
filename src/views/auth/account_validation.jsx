import { useContext, useEffect } from "react";
import { useCookies } from "react-cookie";
import { Link, useSearchParams } from "react-router-dom";
import { ProfilContext } from '../../contexts/profil_context';

export function AccountValidation(){
    //on doit recuperer useSearchParams dans un state pr que ca marche mais le setter est optionnel
    const [search] = useSearchParams();
    console.log("urlParams",search.get("t"));
    const token = search.get("t");
    const {profil, setProfil} = useContext(ProfilContext);
    const [cookie, setCookie] = useCookies(['token']);

    useEffect(()=>{
        const body = JSON.stringify({token:token});
        fetch('http://localhost:5000/auth/validate', {
                method: 'post',
                headers: {
                    "content-type": "application/json",
                },
                body,
            })
            .then(response => response.json())
            .then((jsonData) => {
                console.log("réponse ", jsonData);
                //let result;
                if (jsonData.email) {
                    let result = ({
                        "logged": true,
                        "profil": {
                            "user": {
                                "name": jsonData.email,
                                "role": jsonData.role,
                                "token": jsonData.token
                            }
                        }
                    })
                    if (!cookie.token){
                        setCookie("token",jsonData.token);
                    }
                    setProfil(result.profil);
                }
            })
            .catch(console.log);
        

    })

    if(token){
        if (profil.user){
            return(
                <>
                    <div>account page , validation réussie <p>{profil.user.name}</p></div>
                    <Link to='/auth/login'>se connecter</Link>
                </>
            )
        }
        else{
            return(
                <div>account page , validation en cours envoie du token pr valider<p>{token}</p></div>
            )
        }

    }


    return (
        <div>account page validation pas de token dans l'url</div>
    )
}