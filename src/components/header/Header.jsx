import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Container, Logo, LogoutBtn } from '../index'

function Header() {
    const authStatus = useSelector((state) => state.status);
    const navigate = useNavigate();

    const navItems = [
        {
            name: 'Home',
            slug: '/',
            active: true
        },
        {
            name: 'Login',
            slug: '/login',
            active: !authStatus
        },
        {
            name: 'Sign up',
            slug: '/signup',
            active: !authStatus
        },
        {
            name: 'All Posts',
            slug: '/allPosts',
            active: authStatus
        },
        {
            name: 'Add Post',
            slug: '/addPost',
            active: authStatus
        }
    ]

    return (
        <header className="py-3 shadow bg-gray-500">
            <Container>
                <nav className="flex">
                    <div className="mr-4">
                        <Link to='/'>
                            <Logo width='70px' />
                        </Link>
                    </div>

                    <ul className="flex ml-auto">
                        {navItems.map((item) => 
                            item.active ? 
                            (<li key={item.name}>
                                <button 
                                    onClick={() => navigate(item.slug)}
                                    className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full cursor-pointer"
                                >
                                    {item.name}
                                </button>
                            </li>) : null 
                        )}

                        {authStatus && (<LogoutBtn />)}
                    </ul>
                </nav>
            </Container>
        </header>
    )
}

export default Header;