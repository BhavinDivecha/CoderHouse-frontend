import React, { useState, useRef, useEffect } from 'react';
import styles from './CustomModal.module.css';

const CustomModal = ({ show,localUserId, handleClose, chatMessages, sendMessage }) => {
    const [messageInput, setMessageInput] = useState('');

    // Ref to scroll to the bottom of the chat messages
    const chatContainerRef = useRef(null);

    const handleSendMessage = () => {
        if (messageInput.trim() === '') return;

        sendMessage(messageInput,localUserId);
        setMessageInput('');

        // Automatically scroll to the bottom of the chat messages when a new message is sent
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    };

    // Scroll to the bottom of the chat messages when a new message arrives
    useEffect(() => {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }, [chatMessages]);

    return (
        <div className={`${styles.modal} ${show ? styles.show : ''}`}>
            <div className={styles.modalContent}>
                <span className={styles.close} onClick={handleClose}>
                    &times;
                </span>
                <h2>Public Chat</h2>
                <div className={styles.chatContainer} ref={chatContainerRef}>
                    <ul className={styles.messages}>
                    {chatMessages && chatMessages.map((message, index) => (
    <li key={index}  className={`${styles.message} ${
        message.userId === localUserId
            ? styles['current-user-message']
            : styles['other-user-message']
    }`}>
        <div className={styles.list}>
        <span className={styles.sender}>{message.user}:</span>
        <span className={styles.messageText}>{message.message}</span>
        </div>
    </li>
))}

                    </ul>
                    
                </div>
                <div className={styles.inputArea}>
                    <input
                        type="text"
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        placeholder="Type a message..."
                    />
                    <button onClick={handleSendMessage}>Send</button>
                </div>
            </div>
        </div>
    );
};

export default CustomModal;
