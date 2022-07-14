import {Link} from 'react-router-dom';
export const Nav = (props) => {
    console.log("nav props",props);
    const {profil} = props;
    // console.log("nav profil",profil);
    const user = profil.user||{};
    // const user = {
    //     "name":"zorro"
    // }
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container px-4 px-lg-5">
                <Link className="navbar-brand" to="/">Shop Deluxe 3 le même mais en mieux </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
                        <li className="nav-item"><Link className="nav-link active" aria-current="page" to="/">Home</Link></li>
                    {!profil.user &&    
                        <li className="nav-item"><Link className="nav-link" to="/account/register">register</Link></li>
                    }
                    {profil.user &&
                        <li className="nav-item"><Link className="nav-link" to="/account">profil</Link></li>                        
                    }
                    {profil.user && profil.user.role === 'Admin' &&
                        <li className="nav-item"><Link className="nav-link" to="/admin">admin</Link></li>
                    }

                        <li className="nav-item"><Link className="nav-link" to="/user/1">user1</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/user/2">user2</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/product/edit">test</Link></li>

                    </ul>
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
                        {/* <li>{user.name}</li> */}
                        {profil.user ?
                            <li className="nav-item"><Link className="nav-link" to="/account/logout">logout {user.name}</Link></li>:
                            <>
                                <li className="nav-item"><Link className="nav-link" to="/account/login">Login</Link></li>
                                <li className="nav-item"><Link className="nav-link" to="/account/login2">Login2</Link></li>
                            </>
                        }            
                    </ul>
                </div>
            </div>
        </nav>
    )
}




