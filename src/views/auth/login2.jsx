import { useContext, useEffect} from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { ProfilContext } from '../../contexts/profil_context';
import { useCookies } from 'react-cookie';
import {  useNavigate } from 'react-router-dom';
import {LoginComponent,LoginForm,Input} from '../../components/auth/login_component';
export function Login2() {
    const { setProfil } = useContext(ProfilContext);
    const [cookie, setCookie] = useCookies(['token']);
    const navigate = useNavigate();

    const mode = 'login';
    return (
        <div className={`app app--is-${mode}`}>
            <p>login2</p>
            <LoginComponent
            mode={mode}
            onSubmit={
                function(e) {
                    e.preventDefault();
                    console.log('submit');
                }
            }
            onSubmit2={
                function(e) {
                    e.preventDefault();
                    console.log('submit2');
                }
            }
        />
        </div>
    )
}