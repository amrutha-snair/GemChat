import React, { useState } from 'react';

const ChatInput = ({ onSendMessage, disabled }) => {
    const [message, setMessage] = useState('');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (message.trim() || image) {
            onSendMessage(message, image);
            setMessage('');
            setImage(null);
            setImagePreview(null);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="chat-input-container">
            {imagePreview && (
                <div className="image-preview">
                    <img src={imagePreview} alt="Preview" />
                    <button type="button" onClick={() => {
                        setImage(null);
                        setImagePreview(null);
                    }}>×</button>
                </div>
            )}
            <div className="input-row">
                <label htmlFor="image-upload" className="image-upload-btn">
                    📷
                </label>
                <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: 'none' }}
                    disabled={disabled}
                />
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                    disabled={disabled}
                />
                <button type="submit" disabled={disabled || (!message.trim() && !image)}>
                    Send
                </button>
            </div>
        </form>
    );
};

export default ChatInput;
