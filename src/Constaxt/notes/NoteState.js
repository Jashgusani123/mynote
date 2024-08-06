import React, { useState } from 'react'
import noteContext from './noteContext'

const NoteState = (props) => {
  const host = "http://localhost:5000"
   const noteInitsialized = []
   const [notes, setnotes] = useState(noteInitsialized)

 //GetAll Notes....
 const getallNotes = async()=>{
  //API Call
  const response = await fetch(`${host}/api/notes/fatchallnotes`, {
    method: "GET",
    headers: {
      "auth-token":localStorage.getItem("token"),
    },
  });
  const json = await response.json()
  setnotes(json)
}


   //Add a new Note....
   const addNotes = async(title , description , tag)=>{
    //API Call
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem("token"),
      },
      body: JSON.stringify({title , description , tag}),
    });
    const note = await response.json()
    setnotes(notes.concat(note))
   }




   //Delete a Note...
   const deleteNote = async(id)=>{
    //API Call
    const response = await fetch(`${host}/api/notes/notedelete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem("token"),
      },
     
    });
    await response.json();
    //This is Client side
    const newNote = notes.filter((note)=>{return note._id !== id}) 
    setnotes(newNote)
   }

   //Edit a Note...
   const editNote = async(id,title , description , tag)=>{
    //API Call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem("token"),
      },
      body: JSON.stringify({title , description , tag}),
    });
     await response.json()
    //This is Client side
    let newnote = JSON.parse(JSON.stringify(notes))
    for(let index = 0 ; index<newnote.length ; index++){
      const element = newnote[index]
      if(element._id === id){
        newnote[index].title = title;
        newnote[index].description = description;
        newnote[index].tag = tag;
        break;
      }
    }
    setnotes(newnote)
   }
    return (
        <noteContext.Provider value={{ notes , addNotes , deleteNote , editNote , getallNotes}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState