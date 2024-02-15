import { useState } from 'react'
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

    return (
        <>
            
            {popup && (
                <Popup closer={handlePopup} close={handleOutsidePopupClick} />
            )}
            {features && (
                <Feature closer={handleFeature} close={handleOutsideFeatureClick} />
            )}
            <main>
                <div className="welcome-holder">
                    <div className="welcome-holder-header">
                        <Header />
                    </div>
                    <div className="welcome-holder-content">
                        <Welcome opener={handlePopup} />
                    </div>
                </div>
                <div className="task-holder">
                    <div className="task-holder-header">
                        <Navbar handleFeature={handleFeature} />
                    </div>
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