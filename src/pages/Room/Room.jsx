import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useWebRTC } from '../../hooks/useWebRTC';
import { useParams, useHistory } from 'react-router-dom';
import { getRoom } from '../../http';
import styles from './Room.module.css';
import ChatList from '../../components/ChatList/ChatList';
import CustomModal from '../../components/CustomModal/CustomModal';

const Room = () => {
    const user = useSelector((state) => state.auth.user);
    const { id: roomId } = useParams();
    const [room, setRoom] = useState(null);

    const { clients, provideRef, handleMute,isScreenSharing, startScreenSharing, stopScreenSharing,chatMessages,message,sendMessage,setMessage,chat_Messages} = useWebRTC(roomId, user);

    const history = useHistory();

    const [isMuted, setMuted] = useState(true);

    const [isChatOpen, setChatOpen] = useState(false);

    const openChat = () => {
        setChatOpen(true);
    };

    const closeChat = () => {
        setChatOpen(false);
    };
        // State to store microphone sources
        const [micSources, setMicSources] = useState([]);
        const [selectedMic, setSelectedMic] = useState(''); // Track the selected microphone source
    

    useEffect(() => {
        const fetchRoom = async () => {
            const { data } = await getRoom(roomId);
            setRoom((prev) => data);
        };

        fetchRoom();
         // Fetch and populate microphone sources
         
    }, [roomId]);

    useEffect(() => {
        handleMute(isMuted, user.id);
    }, [isMuted]);
    useEffect(()=>{
        console.log(chatMessages);
    },[chatMessages]);

    const handManualLeave = () => {
        history.push('/rooms');
    };

    useEffect(() => {
        // Get the list of microphone sources
        navigator.mediaDevices.enumerateDevices().then(devices => {
            const audioInputDevices = devices.filter(device => device.kind === 'audioinput');
            setMicSources(audioInputDevices);
        });
    }, []);
    const handleMicSourceChange = async(event) => {
        const newMicSource = event.target.value;

        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: { deviceId: newMicSource } });
            // Here, you can handle the new media stream with the selected microphone source.
            // Update your WebRTC setup with the new media stream.
            // For example, you might need to replace the existing media stream with the new one.
            // Also, update the selected microphone state.
            setSelectedMic(newMicSource);
        } catch (error) {
            console.error('Failed to change microphone source:', error);
        }
    };
    const handleMuteClick = (clientId) => {
        if (clientId !== user.id) {
            return;
        }
        setMuted((prev) => !prev);
    };
    const toggleScreenSharing = () => {
        if (isScreenSharing) {
            stopScreenSharing(); // Stop screen sharing
        } else {
            startScreenSharing(); // Start screen sharing
        }
    };

    return (
        <div>
            <div className="container">
                <button onClick={handManualLeave} className={styles.goBack}>
                    <img src="/images/arrow-left.png" alt="arrow-left" />
                    <span>All voice rooms</span>
                </button>
            </div>
            <div className={styles.clientsWrap}>
                <div className={styles.header}>
                    {room && <h2 className={styles.topic}>{room.topic}</h2>}
                    <div className={styles.actions}>
                    <button onClick={openChat} className={styles.chatButton}>
                            <img src="/images/chat-icon.png" alt="Chat" />
                        </button>
                        <button onClick={toggleScreenSharing} className={styles.actionBtn}>
                            {/* <img src="/images/screen-share.png" alt="screen-share-icon" /> */}
                            <span>{isScreenSharing ? 'Stop Sharing' : 'Share Screen'}</span>
                        </button>
                        <button className={styles.actionBtn}>
                            <img src="/images/palm.png" alt="palm-icon" />
                        </button>
                        <button
                            onClick={handManualLeave}
                            className={styles.actionBtn}
                        >
                            <img src="/images/win.png" alt="win-icon" />
                            <span>Leave quietly</span>
                        </button>
                    </div>
                </div>
                <div className={styles.clientsList}>
                    {clients.map((client) => {
                        return (
                            <div className={styles.client} key={client.id}>
                                <div className={styles.userHead}>
                                    <img
                                        className={styles.userAvatar}
                                        src={client.avatar}
                                        alt=""
                                    />
                                    {isScreenSharing ? (
                                        // Display the screen sharing stream
                                        <video
    autoPlay
    ref={(instance) => {
        provideRef(instance, client.id);
    }}
/>

                                    ) : (
                                        // Display the regular audio stream
                                        <audio
                                            autoPlay
                                            ref={(instance) => {
                                                provideRef(instance, client.id);
                                            }}
                                        />
                                    )}
                                    <button
                                        onClick={() =>
                                            handleMuteClick(client.id)
                                        }
                                        className={styles.micBtn}
                                    >
                                        {client.muted ? (
                                            <img
                                                className={styles.mic}
                                                src="/images/mic-mute.png"
                                                alt="mic"
                                            />
                                        ) : (
                                            <img
                                                className={styles.micImg}
                                                src="/images/mic.png"
                                                alt="mic"
                                            />
                                        )}
                                    </button>
                                </div>
                                <h4>{client.name}</h4>
                            </div>
                        );
                    })}
                </div>
                 {/* Bottom Bar */}
            <div className={styles.bottomBar}>
            <button
                    onClick={() => setMuted(prev => !prev)}
                    className={styles.bottomBarButton}
                >
                    {isMuted ? (
                        <img
                            src="/images/mic-mute.png"
                            alt="Mute"
                            className={styles.icon}
                        />
                    ) : (
                        <img
                            src="/images/mic.png"
                            alt="Unmute"
                            className={styles.icon}
                        />
                    )}
                </button>
              {/* Microphone Source Dropdown with custom styles */}
              <div className={styles.micSourceDropdown}>
                    <select value={selectedMic} onChange={handleMicSourceChange}>
                        <option value="">Select a Microphone</option>
                        {micSources.map((micSource) => (
                            <option key={micSource.deviceId} value={micSource.deviceId}>
                                {micSource.label}
                            </option>
                        ))}
                    </select>
                </div>


                <button onClick={handManualLeave} className={styles.leaveButton}>
                    Leave
                </button>
            </div>
            {/* Custom Modal */}
            <CustomModal show={isChatOpen} handleClose={closeChat} clients={clients} localUserId={user.id} chatMessages={chatMessages} sendMessage={sendMessage} />
            </div>
        </div>
    );
};

export default Room;
