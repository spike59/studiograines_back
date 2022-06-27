
import { createContext, useEffect, useState } from "react";
import {  useCookies } from "react-cookie";

const ProfilContext = createContext();
const ProfilProvider = ({ children }) => {
    console.log("provider!");
    //const [auth, setAuth] = useState({role:0});
    const [cookie] = useCookies(['token']);
    const [profil,setProfil] = useState({})
    useEffect(()=>{
        if (cookie.token)
        {
            console.log("fetch");
            fetch("http://localhost:5000/auth/refresh_token",
            {
                method: 'post', 
                credentials:'include'
            })
            .then(response => {
                if( response.status === 200){
                    return response.json();
                }
                else{
                    return "error";
                }
            
                
            })
            .then((jsonData) => {
                console.log("réponse app update token ", jsonData);
                //let result;
                if (jsonData.user) {
                    let profil = 
                    {
                        "user": {
                            "name": jsonData.user.email,
                            "role": jsonData.user.role,
                            "token": jsonData.user.token
                        }
                    }
                    setProfil(profil);
                }
            }).catch(console.log);
        }
    },[cookie])
  
    return (
      <ProfilContext.Provider value={{profil, setProfil}}>
        {children}
      </ProfilContext.Provider>
    );
}

export {ProfilContext,ProfilProvider};