import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';

export function Register(){
    const [successReg,setSuccesReg] = useState({"registered":false});
    //const [errors,setErrors] = useState({});
    //const navigate = useNavigate();
    useEffect (()=>{
        loadCaptchaEnginge(2);
    },[])

    const handleSubmit =async (e)=>{
        e.preventDefault();
        console.log("envoyé",e.currentTarget);
        const formData = new FormData(e.currentTarget);
        console.log("form data",formData)
        const jsonData = Object.fromEntries(formData.entries());
        const body = JSON.stringify(jsonData);
        console.log("body",jsonData.captcha);
        if (validateCaptcha(jsonData.captcha)===true) {
            console.log("captcha match");
            //alert('Captcha Matched');
            console.log("captcha ok envoie de la requete register");
            await fetch('http://localhost:5000/auth/register', {
                method:'post',
                headers: {
                  "content-type": "application/json",
                },
                body,
              })
              .then(response=>response.json())
              .then((jsonData) => {
                  console.log("reponse ",jsonData);
                  //let data = await response.json();
                  //console.log("response message",data.message);
                    // if (response.status === 200){
                    jsonData.status === 200 ? 
                        setSuccesReg({
                            "registered":true,
                            "token":jsonData.token
                        }):
                        setSuccesReg({
                            "registered":false,
                            "status":jsonData.status,
                            "message":jsonData.message
                        })
                    
                })
                .catch(console.log);
        }
   
        else {
            console.log("catptcha does not match")
            //alert('Captcha Does Not Match');
        }    
    }

    if (successReg.registered){
        const url = '../account/validation?t=' + successReg.token;
        return(<>
            <div>coompte créé , en attente de validation !</div>
            <p>ATTENTION ne pas garder en prod XD</p>
            <p>cliquer sur le lien de validation (faux mail )</p>
            <Link to={url}>confirmer l'inscription</Link>
        </>)
    }
    return (
        <>
        <div>register page</div>
        <form onSubmit={handleSubmit}>
            <label htmlFor='mail'>adresse email</label>
            <input type="mail" name="email"></input>
            <input type="text" name="password"></input>
            <input type="text" name="password2"></input>
            < LoadCanvasTemplate />
            <input name="captcha"></input>
            <button>creer compte</button>
        </form>
        </>
    )
}