import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { MdGridView, MdFormatListBulleted, MdBookmarkRemove, MdEditNote, MdSupervisedUserCircle } from 'react-icons/md'
import { BsFillHouseDoorFill, BsExclamationDiamond } from 'react-icons/bs'
import { useToDoFunctions } from '@/app/functions/useToDoFunctions'

export default function Navbar({ handleFeature }) {

    const pathname = usePathname();

    const {
        views,
        handleViews,
    } = useToDoFunctions();

    return (
        <>
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
                    <MdBookmarkRemove /> &nbsp; <i>Trash</i>
                </Link>
                <Link 
                    title="Features"
                    href="#"
                    onClick={handleFeature} 
                    className="link"
                >
                    <BsExclamationDiamond /> &nbsp; <i>Features</i>
                </Link>
            </div>
            <div className="task-holder-header-view">
                <button 
                    title="Account"
                >
                    <MdSupervisedUserCircle />
                </button>
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