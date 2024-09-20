import React from 'react';

const NoteCard = ({ note, onDelete, onEdit }) => {
    return (
        <div className="note-card">
            <h2>{note.title}</h2>
            <p>{note.content.substring(0, 100)}...</p>
            <div className='button-group'>
                <button onClick={() => onEdit(note)}>Edit</button>
                <button onClick={() => {
                    if (window.confirm('Are you sure you want to delete this note?')) {
                        onDelete(note.id);
                    }
                }}>Delete</button>
            </div>
        </div>
    );
};

export default NoteCard;
