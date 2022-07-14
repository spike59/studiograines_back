import { useContext, useEffect} from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { ProfilContext } from '../../contexts/profil_context';
import { useCookies } from 'react-cookie';
import {  useNavigate } from 'react-router-dom';

export function Login() {
    const { setProfil } = useContext(ProfilContext);
    const [cookie, setCookie] = useCookies(['token']);
    const navigate = useNavigate();

    useEffect(() => {
        loadCaptchaEnginge(2);
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const jsonData = Object.fromEntries(formData.entries());
        const body = JSON.stringify(jsonData);

        if (validateCaptcha(jsonData.captcha) === true) {
            console.log("captcha ok envoie de la requete login");
            await fetch('http://localhost:5000/auth/login', {
                method: 'post',
                headers: {
                    "content-type": "application/json",
                },
                body,
            })
                .then(response => response.json())
                .then((jsonData) => {
                    //console.log("réponse ", jsonData);
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
                        //const cookieStr = "token=" + jsonData.token + "; max-age=" + 60 * 60 * 24
                        //console.log("cookiestr",cookieStr);
                        if (!cookie.token){
                            const age = 1 * 24 * 60 *60;
                            setCookie("token",jsonData.token,{maxAge:`${age}`});
                        }
                        setProfil(result.profil);
                        navigate("/account");
                    }
                })
                .catch(error => {
                    if (!error.response) {
                        // network error
                        //this.errorStatus = 'Error: Network Error';
                        console.log('Error: Network Error, verifier que le serveur est bien lancé');
                    } else {
                        //this.errorStatus = error.response.data.message;
                        console.log("error",error);
                    }
                  })
        }
        else {
            console.log("catptcha does not match")
            //alert('Captcha Does Not Match');
        }
    }

    return (
        <>
            <div>login page</div>
            <form onSubmit={handleSubmit}>
                <label htmlFor='mail'>adresse email</label>
                <input type="mail" name="email"></input>
                <input type="text" name="password"></input>
                < LoadCanvasTemplate />
                <input name="captcha"></input>
                <button>Se connecter</button>
            </form>
        </>
    )
}