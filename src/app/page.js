/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import Main from '@/app/Main'
import { useToDoFunctions } from '@/app/functions/useToDoFunctions'
import '@/app/styles/globals.css'
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  WhatsappIcon
} from 'react-share'
import { BsShare } from 'react-icons/bs'

export default function Home() {

    const {
      notifications,
      shareUrl,
      shareMessage,
    } = useToDoFunctions();

    return (
        <>
            <Main />
            <div className="share-buttons-mobile">
                <span title="Share our app on social media"><BsShare /></span>
                <FacebookShareButton url={shareUrl} quote={shareMessage}>
                    <FacebookIcon title="Share on Facebook" className="fb" size={25} />
                </FacebookShareButton>
                <TwitterShareButton url={shareUrl} title={shareMessage}>
                    <TwitterIcon title="Share on Twitter" className="tw" size={25} />
                </TwitterShareButton>
                <LinkedinShareButton url={shareUrl} summary={shareMessage}>
                    <LinkedinIcon title="Share on LinkedIn" className="in" size={25} />
                </LinkedinShareButton>
                <WhatsappShareButton url={shareUrl} title={shareMessage}>
                    <WhatsappIcon title="Share on WhatsApp" className="wa" size={25} />
                </WhatsappShareButton>
            </div>
            {notifications.length > 0 && (
              <div className="notification-container">{notifications}</div>
            )}
            <div className="if-size-less-than-300">
                <p>Sorry! We do not support mobile devices less than 300 pixels wide.</p>
            </div>
        </>
    );
}
