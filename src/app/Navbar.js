import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { MdGridView, MdFormatListBulleted, MdEditNote, MdSupervisedUserCircle, MdNewReleases } from 'react-icons/md'
import { BsFillHouseDoorFill, BsBookmarkX } from 'react-icons/bs'
import { useToDoFunctions } from '@/app/functions/useToDoFunctions'
import Login from '@/app/Login'
import Signup from '@/app/Signup'

export default function Navbar({ handleFeature, dropdownStatus, close, handler, dropdownRef, isLogin, handleIsLogin }) {

    const pathname = usePathname();

    const {
        views,
        handleViews,
    } = useToDoFunctions();

    const { data: session, status } = useSession();

    return (
        <>
            <div className="task-holder-header" onClick={close}>
                <div className="task-holder-header-nav">
                    <Link 
                        title="Home"
                        href={pathname === '/' ? '#' : "/"} 
                        className={ `link ${ pathname === '/' ? 'active' : '' }` }
                    >
                        <BsFillHouseDoorFill /> &nbsp; <i>Home</i>
                    </Link>
                    <Link 
                        title="Trash"
                        className={ `link ${ pathname === '/notes' ? 'active' : '' }` }
                        href="/notes"
                    >
                        <MdEditNote /> &nbsp; <i>Notes</i>
                    </Link>
                    <Link 
                        title="Trash"
                        className={ `link ${ pathname === '/trash' ? 'active' : '' }` }
                        href="/trash"
                    >
                        <BsBookmarkX /> &nbsp; <i>Expired</i>
                    </Link>
                    <Link 
                        title="Features"
                        href="#"
                        onClick={handleFeature} 
                        className="link"
                    >
                        <MdNewReleases /> &nbsp; <i>Features</i>
                    </Link>
                </div>
                <div className="task-holder-header-account">
                    <button 
                        title="Account"
                        onClick={handler}
                    >
                        <MdSupervisedUserCircle /> &nbsp; 
                        {
                            status === 'authenticated' ? <i>{session.user.name}</i> : <i>Account</i>
                        }
                    </button>
                    {
                        dropdownStatus &&
                        <div className="account-dropdown" ref={dropdownRef}>
                            {
                                status === 'authenticated' ?
                                <>
                                    <p>{session.user.email}</p>
                                    <button onClick={() => signOut()}>Sign Out</button>
                                </>
                                :
                                <>
                                <div className="selection">
                                    <button
                                        className={`selector ${isLogin ? 'active' : ''}`}
                                        onClick={handleIsLogin}
                                    >
                                        Login
                                    </button>
                                    <button
                                        className={`selector ${!isLogin ? 'active' : ''}`}
                                        onClick={handleIsLogin}
                                    >
                                        Sign Up
                                    </button>
                                </div>
                                { isLogin ? <Login /> : <Signup /> }
                                </>
                            }
                        </div>
                        
                    }
                </div>
            </div>
            <div className="task-holder-view-switchers">
                <button 
                    className={views === 0 ? "active" : ""}
                    title="Grid"
                    onClick={() => handleViews(0)}
                >
                    <MdGridView />
                </button>
                <button 
                    className={views === 1 ? "active" : ""}
                    title="List"
                    onClick={() => handleViews(1)}
                >
                    <MdFormatListBulleted />
                </button>
            </div>
        </>
    )
}