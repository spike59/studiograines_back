import {Outlet} from 'react-router-dom';
import {Nav} from './nav';
export function Layout(){
    return(
        <>
            <Nav/>
            <Outlet/>
        </>
    )
}