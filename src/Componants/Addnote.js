import React, { useContext , useState} from 'react'
import noteContext from "../Constaxt/notes/noteContext"

const Addnote = (props) => {
    const {showalert} = props
    const context = useContext(noteContext);
    const { addNotes }= context;

    const [note, setnote] = useState({title:"" , description : "" , tag:"Default"})
    
    const handleAdd = (e)=>{
        e.preventDefault()
        if(note.title === "" , note.description === ""){
            showalert("Plz Full Data .." , "danger")
        }else{
            addNotes(note.title , note.description , note.tag)
            showalert("Add Note SuccessFully " , "success")
            setnote({title:"" , description : "" , tag:"Default"})
        }

    }   

    const onChange = (e)=>{
        setnote({...note , [e.target.name] : e.target.value})
    }

    return (
        <>
            <div className="my-3 container">
                <h1>Add Notes</h1>
                <div className="  mb-3">
                    <label htmlFor="title" className="form-label" >Title</label>
                    <input type="text" className="form-control" id="title" name="title" placeholder="Enter Text ..."onChange={onChange} minLength={5} required value={note.title}/>
                </div>
                <div className=" mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type='text' className="form-control" id="description" name="description" onChange={onChange} minLength={5} required value={note.description}/>
                </div>
                <button type="button" className="btn btn-primary" onClick={handleAdd}>Add Note</button>
            </div>
        </>
    )
}

export default Addnote