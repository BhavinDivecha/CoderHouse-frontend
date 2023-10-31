// ChatModal.js
import React, { useState } from 'react';
import styles from './ChatModal.module.css';

const ChatModal = ({ localuser,user, onClose }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    const sendMessage = () => {
        if (newMessage.trim() === '') {
            return;
        }
    
        // Create a new message object with sender, recipient, and content
        const message = {
            sender: localuser,
            recipient: user.id, // Replace with the recipient's ID
            content: newMessage,
        };
    
        // Add the message to the state
        setMessages([...messages, message]);
    
        // Clear the message input field
        setNewMessage('');
    
        // Send the message to the recipient (in a real implementation, use your messaging system)
        // You might send the message through a WebSocket, API, or any other method.
    };
    

    return (
        <div className={styles.chatModal}>
            <div className={styles.header}>
                <h2>Chat with {user.name}</h2>
                <button onClick={onClose} className={styles.closeButton}>
                    &times;
                </button>
            </div>
            <div className={styles.chatArea}>
    {messages.map((message, index) => (
        <div key={index} className={styles.message}>
            {message.content}
        </div>
    ))}
</div>
            <div className={styles.inputArea}>
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                />
                <button onClick={sendMessage} className={styles.sendButton}>
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatModal;
