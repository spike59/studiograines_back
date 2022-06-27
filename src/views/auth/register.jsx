import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';

export function Register(){
    const navigate = useNavigate();
    useEffect (()=>{
        loadCaptchaEnginge(6);
    },[])

    const handleSubmit =async (e)=>{
        e.preventDefault();
        console.log("envoyé",e.currentTarget);
        const formData = new FormData(e.currentTarget);
        console.log("form data",formData)
        const jsonData = Object.fromEntries(formData.entries());
        const body = JSON.stringify(jsonData);
        console.log("body",jsonData.captcha);
        if (validateCaptcha(jsonData.captcha)==true) {
            //alert('Captcha Matched');
            console.log("captcha ok envoie de la requete register");
            await fetch('http://localhost:5000/auth/register', {
                method:'post',
                headers: {
                  "content-type": "application/json",
                },
                body,
              }).then((response) => {
                  console.log("reponse ",response.status);
                    response.status === 200?
                        navigate('/auth/validation'):
                        navigate('auth/register')
                    //return callback ? callback(response) : response;
                })
                .catch(console.log);
        }
   
        else {
            //alert('Captcha Does Not Match');
        }    
    }

    return (
        <>
        <div>register page</div>
        <form onSubmit={handleSubmit}>
            <label htmlFor='mail'>adresse email</label>
            <input type="mail" name="mail"></input>
            < LoadCanvasTemplate />
            <input name="captcha"></input>
            <button>creer compte</button>
        </form>
        </>
    )
}