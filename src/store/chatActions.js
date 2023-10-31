// chatActions.js
export const sendMessage = (sender, recipient, message) => {
    return {
        type: 'SEND_MESSAGE',
        payload: {
            sender,
            recipient,
            message,
        },
    };
};
