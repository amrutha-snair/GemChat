import React from 'react';

const MessageList = ({ messages }) => {
    return (
        <div className="message-list">
            {messages.map((msg, index) => (
                <div key={index} className={`message ${msg.role}`}>
                    <div className="message-content">
                        {msg.role === 'user' ? 'You: ' : 'Agent: '}
                        {msg.image && (
                            <div className="message-image">
                                <img src={msg.image} alt="User upload" style={{ maxWidth: '200px' }} />
                            </div>
                        )}
                        <div className="message-text">{msg.text}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MessageList;
