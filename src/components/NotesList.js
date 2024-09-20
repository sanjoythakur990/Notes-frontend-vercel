import React from 'react';
import NoteCard from './NoteCard';

const NotesList = ({ notes, onDelete, onEdit }) => {
    return (
        <div className='notes-list'>
            {notes.length === 0 ? (
                <p style={{ textAlign: 'center', color: '#666' }}>
                No notes available. Add a note to get started!
            </p>
            ) : (
                notes.map(note => (
                    <NoteCard key={note.id} note={note} onDelete={onDelete} onEdit={onEdit} />
                ))
            )}
        </div>
    );
};

export default NotesList;
