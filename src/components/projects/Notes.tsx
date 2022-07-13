import '../../styles/projects/Notes.css';
import { useState, useEffect } from 'react';

interface Note {
    id: number;
    title: string;
    text: string;
    edit: boolean;
    color: string;
    textColor: string;
}

const Notes = () => {
    const [notes, setNotes] = useState<Note[]>([]);
    const [editedNotes, setEditedNotes] = useState<Note[]>([]);

    useEffect(() => {
        const getNotes = localStorage.getItem("notes");
        if(getNotes) setNotes(JSON.parse(getNotes));
    }, []);

    const handleAddNote = () => {
        setNotes(prev => {
            const newState = [...prev, {
                id: prev.length === 0 ? 1 : prev[prev.length-1].id+1,
                title: "",
                text: "",
                edit: false,
                color: '#ffe4c4',
                textColor: '#000000'
            }];

            localStorage.setItem("notes", JSON.stringify(JSON.parse(JSON.stringify(newState)).map((item:Note) => {
                item.edit = false;
                return item;
            })));

            return newState;
        })
    }

    const handleDeleteNote = (id:number) => {
        setNotes(prev => {
            const newState = prev.filter(item => item.id !== id);
            localStorage.setItem("notes", JSON.stringify(JSON.parse(JSON.stringify(newState)).map((item:Note) => {
                item.edit = false;
                return item;
            })));
            return newState;
        });
        if(editedNotes.find(item => item.id === id)) {
            setEditedNotes(prev => prev.filter(item => item.id !== id));
        }
    }

    const handleEditSaveNote = (note:Note, val:boolean) => {
        if(val)
            setNotes(prev => {
                const newState = [...prev];
                return newState.map(newNote => {
                    if(note.id === newNote.id) newNote.edit = val;
                    return newNote;
                });
            });
        
        setEditedNotes(prev => {
            if(prev.filter(item => item.id === note.id).length < 1) {
                return [...prev, {...note}];
            } else return [...prev];
        })

        if(!val) {
            setNotes(prev => {
                const newState = [...prev];
                newState.map(item => {
                    if(item.id === note.id) {
                        const editedObject = editedNotes.find(edited => edited.id === note.id);
                        item.title = editedObject!.title;
                        item.text = editedObject!.text;
                        item.edit = false;
                        item.color = editedObject!.color;
                        item.textColor = editedObject!.textColor;
                    }
                    return item;
                });

                localStorage.setItem("notes", JSON.stringify(JSON.parse(JSON.stringify(newState)).map((item:Note) => {
                    item.edit = false;
                    return item;
                })));
                return newState;
            });
            setEditedNotes(prev => [...prev].filter(item => item.id !== note.id));
        }
    }

    const handleCancelEdit = (id:number) => {
        setEditedNotes(prev => [...prev].filter(item => item.id !== id));
        setNotes(prev => [...prev].map(item => {
            if(item.id === id) item.edit = false;
            return item;
        }))
    }

    return (
        <div className="Notes">
            <button onClick={handleAddNote}>Dodaj notatkę</button>
            <div className="container">
                {notes.map(note => (
                    <div
                        className="note"
                        key={note.id}
                        style={
                            editedNotes.find(item => item.id === note.id) ?
                                {
                                    backgroundColor: editedNotes.find(item => item.id === note.id)!.color,
                                }
                                :
                                {
                                    backgroundColor: note.color,
                                    color: note.textColor
                                }
                        }
                    >
                        <div className="noteMenu">
                            {
                                note.edit ?
                                    <>
                                        <input
                                            type="color"
                                            value={editedNotes.find(item => item.id === note.id)!.textColor}
                                            onChange={e => setEditedNotes(prev => {
                                                const newState = [...prev];
                                                return newState.map(item => {
                                                    if(item.id === note.id) {
                                                        item.textColor = e.target.value;
                                                    }
                                                    return item;
                                                });
                                            })}
                                        />
                                        <input
                                            type="color"
                                            value={editedNotes.find(item => item.id === note.id)!.color}
                                            onChange={e => setEditedNotes(prev => {
                                                const newState = [...prev];
                                                return newState.map(item => {
                                                    if(item.id === note.id) {
                                                        item.color = e.target.value;
                                                    }
                                                    return item;
                                                });
                                            })}
                                        />
                                        <button onClick={() => handleCancelEdit(note.id)}>
                                            <img width="20px" height="20px" alt="Anuluj" src="/images/icons/cancel.svg"/>
                                        </button>
                                        <button onClick={() => handleEditSaveNote(note, false)}>
                                            <img width="20px" height="20px" alt="Zapisz" src="/images/icons/save.svg"/>
                                        </button>
                                    </>
                                    :
                                        <button onClick={() => handleEditSaveNote(note, true)}>
                                            <img width="20px" height="20px" alt="Edytuj" src="/images/icons/edit.svg"/>
                                        </button>
                            }
                            <button onClick={() => handleDeleteNote(note.id)}>
                                <img width="20px" height="20px" alt="Zamknij" src="/images/icons/close.svg"/>
                            </button>
                        </div>
                        {note.edit ?
                            <>
                                <input
                                    type="text"
                                    placeholder="Tytuł"
                                    style={{color: editedNotes.find(item => item.id === note.id)!.textColor}}
                                    value={editedNotes.find(item => item.id === note.id)!.title}
                                    onChange={(e) => {
                                        setEditedNotes(prev => {
                                            const newState = [...prev];
                                            return newState.map(item => {
                                                if(note.id === item.id) {
                                                    item.title = e.target.value;
                                                }
                                                return item;
                                            })
                                        })
                                    }}
                                />
                                <textarea
                                    placeholder="Treść"
                                    style={{color: editedNotes.find(item => item.id === note.id)!.textColor}}
                                    value={editedNotes.find(item => item.id === note.id)!.text}
                                    onChange={(e) => {
                                        setEditedNotes(prev => {
                                            const newState = [...prev];
                                            return newState.map(item => {
                                                if(note.id === item.id) {
                                                    item.text = e.target.value;
                                                }
                                                return item;
                                            })
                                        })
                                    }}
                                />
                            </>
                            :
                            <>
                                <div className="title">
                                    {note.title}
                                </div>
                                <div className="text">
                                    {note.text}
                                </div>
                            </>
                        }
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Notes;