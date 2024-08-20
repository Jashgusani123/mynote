import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteContext from "../Constaxt/notes/noteContext"
import Noteitem from "./Noteitem"
import Addnote from './Addnote'
import { useNavigate } from 'react-router-dom'

const Note = (props) => {
  const { showalert } =props
  let Navigate = useNavigate()
  const context = useContext(NoteContext);
  const { notes, editNote, getallNotes } = context;
  useEffect(() => {
    if(localStorage.getItem("token")){
      getallNotes()
    }else{
      Navigate('/login')
    }
    // eslint-disable-next-line
  }, [])
  const refShowModal = useRef(null)
  const refClose = useRef(null)
  const [note, setnote] = useState({id:"" ,etitle:"" , edescription : "" , etag:"" , desebal:false})
    
  const handleUpdate = (e)=>{
    if(note.etitle === "" && note.edescription === ""){
      showalert("Plz Enter So I wil Update If Not so Close it .." , "denger")
    }else{
      editNote(note.id ,note.etitle , note.edescription , note.etag)
      refClose.current.click()
     showalert("Update Note Succesfully" , "success")
    }
      
  }

  const onChange = (e)=>{
      setnote({...note , [e.target.name] : e.target.value , desebal:false})
  }
  const updateNote = (note) => {
    
    refShowModal.current.click()
    setnote({id:note._id , etitle:note.title , edescription :note.description , etag:note.tag , desebal:true})
  }
  
  return (
    <>
      <Addnote showalert={showalert}/>
      <button type="button" style={{ display: "none" }} ref={refShowModal} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Update</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <div className="mb-3">
                    <label htmlFor="etitle" className="form-label" >Title</label>
                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} onChange={onChange}  minLength={5} required/>
                </div>
                <div className=" mb-3">
                    <label htmlFor="edescription" className="form-label">Description</label>
                    <input type='text' className="form-control" id="edescription" name="edescription" value={note.edescription}  onChange={onChange} minLength={5} required></input>
                </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={refClose}>Close</button>
              <button type="button" className="btn btn-primary" disabled={note.desebal} onClick={handleUpdate}>Update Note</button>
            </div>
          </div>
        </div>
      </div>

      <div className="row ">
        <h1>Your Notes</h1>
          <div className="container">
            {notes.length === 0 && "No Notes For Show !!"}
          </div>
        {
          notes.map((note) => {
            return <Noteitem showalert={showalert} note={note} updateNote={updateNote} key={note._id} />
          })
        }
      </div>
    </>
  )
}

export default Note