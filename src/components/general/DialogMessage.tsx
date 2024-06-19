import React from "react";

import './DialogMessage.scss';

const DialogMessage: React.FC<{
    message: MessageModel;
}> = ({message}) => {
    return (
        <div className="dialog-message">
            <img src="/base-avatar.webp" alt="" className="avatar" />
            <div className="message">
                <p>
                    {message.text}
                </p>
                <p className="date">
                    {message.created_at}
                </p>
            </div>
        </div>
    );
}

export default DialogMessage;