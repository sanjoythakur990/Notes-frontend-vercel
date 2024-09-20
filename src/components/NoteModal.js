import React, { useState, useEffect } from 'react';

const NoteModal = ({ note, onSave, onClose }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (note) {
            setTitle(note.title);
            setContent(note.content);
        } else {
            setTitle('');
            setContent('');
        }
    }, [note]);

    const validateForm = () => {
        const newErrors = {};
        if (!title) newErrors.title = 'Title is required';
        if (!content) newErrors.content = 'Content is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            onSave({ title, content });
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>{note ? 'Edit Note' : 'Add Note'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Title:</label>
                        <input
                            type="text"
                            value={title}
                            placeholder='Enter note title...'
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        {errors.title && <span className="error" style={{ color: 'red' }}>{errors.title}</span>}
                    </div>
                    <div className="form-group">
                        <label>Content:</label>
                        <textarea
                            value={content}
                            placeholder='Enter note content...'
                            onChange={(e) => setContent(e.target.value)}
                        />
                        {errors.content && <span className="error" style={{ color: 'red' }}>{errors.content}</span>}
                    </div>
                    <div className="button-group">
                        <button type="submit">Save</button>
                        <button type="button" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NoteModal;


