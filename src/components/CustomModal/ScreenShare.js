import React, { useState, useEffect } from 'react';

const ScreenShare = ({ onScreenShare, onStopScreenShare }) => {
    const [isScreenSharing, setIsScreenSharing] = useState(false);
    const [stream, setStream] = useState(null);

    useEffect(() => {
        if (isScreenSharing) {
            navigator.mediaDevices
                .getDisplayMedia({ video: true })
                .then((screenStream) => {
                    setStream(screenStream);
                })
                .catch((error) => {
                    console.error('Error accessing screen sharing:', error);
                    setIsScreenSharing(false);
                });
        } else {
            if (stream) {
                stream.getTracks().forEach((track) => track.stop());
            }
        }
    }, [isScreenSharing]);

    return (
        <div>
            <button onClick={() => setIsScreenSharing(!isScreenSharing)}>
                {isScreenSharing ? 'Stop Screen Share' : 'Start Screen Share'}
            </button>
            {isScreenSharing && (
                <div>
                    {/* Render the screen sharing video element */}
                    <video
                        autoPlay
                        playsInline
                        srcObject={stream}
                    ></video>
                </div>
            )}
        </div>
    );
};

export default ScreenShare;
