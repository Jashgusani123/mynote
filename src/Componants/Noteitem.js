import React, { useContext } from 'react'
import noteContext from '../Constaxt/notes/noteContext'

const Noteitem = (props) => {
    const { note, updateNote , showalert} = props;
    const context = useContext(noteContext);
    const { deleteNote } = context;

    return (
        <div className='col-md-3' >
            <div className="row ">
                <div className=" mb-3 ">
                    <div className="card ">
                        <div className="card-body w-full">
                            <h5 className="card-title">{note.title}</h5>
                            <p className="card-text">{note.description}</p>
                            <i className="fa-solid fa-trash mx-3" onClick={() => {
                                 deleteNote(note._id)
                                 showalert("Delete Note Succesfully" , "success")
                                 }}></i>
                            <i className="fa-solid fa-pen-to-square mx-3" onClick={() => {
                                updateNote(note)
                            }}></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Noteitem