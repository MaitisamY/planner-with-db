/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import Header from '@/app/Header'
import Welcome from '@/app/Welcome'
import Footer from '@/app/Footer'
import Navbar from '@/app/Navbar'
import HomeContent from '@/app/task/TaskContent'
import NoteContent from '@/app/notes/NoteContent'
import TrashContent from '@/app/trash/TrashContent'
import Popup from '@/app/Popup'
import Feature from '@/app/Feature'
import { useToDoFunctions } from '@/app/functions/useToDoFunctions'
import { BsPlusLg } from 'react-icons/bs'

export default function Main() {

    const pathname = usePathname();
    const [popup, setPopup] = useState(false);
    const [features, setFeatures] = useState(false);
    const [accountDropdown, setAccountDropdown] = useState(false);
    const dropdownRef = useRef(null);
    const [isLogin, setIsLogin] = useState(true);

    const handleIsLogin = () => {
        setIsLogin(prevIsLogin => !prevIsLogin);
    }

    const handleAccountDropdown = () => {
        setAccountDropdown(prevAccountDropdown => !prevAccountDropdown);
    }

    const handlePopup = () => {
        setPopup(prevPopup => !prevPopup);
        console.log('Popup is ', !popup);
    }

    const handleFeature = () => {
      setFeatures(prevFeatures => !prevFeatures);
      console.log('Feature is ', !features);
    }

    const handleOutsidePopupClick = (event) => {
        if (event.target.id === 'popup' && popup) {
          setPopup(false);
        }
    };

    const handleOutsideFeatureClick = (event) => {
      if (event.target.id === 'feature' && features) {
        setFeatures(false);
      }
    }

    const handleOutsideDropdownClick = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target) && accountDropdown) {
            setAccountDropdown(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleOutsideDropdownClick);
        return () => {
            document.removeEventListener('click', handleOutsideDropdownClick);
        };
    }, [accountDropdown]);

    return (
        <>
            
            {popup && (
                <Popup 
                    closer={handlePopup} 
                    close={handleOutsidePopupClick} 
                    closeDropdown={handleOutsideDropdownClick} 
                />
            )}
            {features && (
                <Feature 
                    closer={handleFeature} 
                    close={handleOutsideFeatureClick} 
                    closeDropdown={handleOutsideDropdownClick} 
                />
            )}
            <main>
                <div className="welcome-holder" onClick={handleOutsideDropdownClick}>
                    <div className="welcome-holder-header">
                        <Header />
                    </div>
                    <div className="welcome-holder-content">
                        <Welcome opener={handlePopup} />
                    </div>
                </div>
                <div className="task-holder" onClick={handleOutsideDropdownClick}>
                    <Navbar 
                        handleFeature={handleFeature} 
                        handler={handleAccountDropdown} 
                        dropdownStatus={accountDropdown} 
                        close={handleOutsideDropdownClick}
                        dropdownRef={dropdownRef}
                        isLogin={isLogin}
                        handleIsLogin={handleIsLogin}
                    />
                    {
                        pathname === '/' ? <HomeContent /> 
                        : 
                        pathname === '/notes' ? <NoteContent /> 
                        : 
                        pathname === '/trash' ? <TrashContent />
                        :
                        null
                    }
                </div>
            </main>
            <Footer />
            <a 
                title="Create Task"
                onClick={handlePopup}
                className="create-task-btn-mobile"
            >
                <BsPlusLg />
            </a>
        </>
    );

}