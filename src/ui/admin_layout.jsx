import { useContext } from 'react';
import {Outlet} from 'react-router-dom';
import {Nav} from './nav';
import { ProfilContext } from '../contexts/profil_context';

export function AdminLayout(props){
    console.log("layout props",props);
    //const {profil} = props;
    const {profil} = useContext(ProfilContext);
    return(
        <>
            <Nav profil={profil}/>
            <Outlet/>
        </>
    )
}