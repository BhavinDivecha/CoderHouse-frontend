// ChatList.js
import React from 'react';
import styles from './ChatList.module.css';

const ChatList = ({ clients, onClose }) => {
    return (
        <div className={styles.chatList}>
            <div className={styles.header}>
                <h3>Chat</h3>
                <button onClick={onClose} className={styles.closeButton}>
                    Close
                </button>
            </div>
            <ul className={styles.clientList}>
                {clients.map((client) => (
                    <li key={client.id} className={styles.client}>
                        <img src={client.avatar} alt="" className={styles.avatar} />
                        <span>{client.name}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ChatList;
