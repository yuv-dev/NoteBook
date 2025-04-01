import React from "react";
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaWhatsapp,
  FaEnvelope,
  FaLink,
} from "react-icons/fa";
import "./ShareNote.css";

const ShareNote = ({ note }) => {
  const shareUrl = `http://localhost:8080/public/note/${note.shareId}`;
  const title = note.title;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    alert("Link copied to clipboard!");
  };

  return (
    <div className="share-container">
      <div className="share-buttons">
        <FacebookShareButton className="share-btn" url={shareUrl} quote={title}>
          <FaFacebook />
        </FacebookShareButton>

        <TwitterShareButton className="share-btn" url={shareUrl} title={title}>
          <FaTwitter />
        </TwitterShareButton>

        <LinkedinShareButton className="share-btn" url={shareUrl} title={title}>
          <FaLinkedin />
        </LinkedinShareButton>

        <WhatsappShareButton className="share-btn" url={shareUrl} title={title}>
          <FaWhatsapp />
        </WhatsappShareButton>

        <EmailShareButton
          className="share-btn"
          url={shareUrl}
          subject={title}
          body={note.description}
        >
          <FaEnvelope />
        </EmailShareButton>


        <button onClick={copyToClipboard} className="clipboard-btn">
          <FaLink />
          
        </button>
      </div>
    </div>
  );
};

export default ShareNote;
