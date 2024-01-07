import React, { useState } from "react";
const Todo = () =>{
    const [showForm,setshowForm] = useState(true);
    const [showNew,setshowNew] = useState(false);
    const [showDelete,setshowDelete] = useState(true);
    const [toggleSubmit,settoggleSubmit] = useState(true);
    const [isEditItem,setisEditItem] = useState(null);
    const [showList,setshowList] = useState(true);
    const [editMessage,seteditMessage] = useState(false);
    const [deleteMessage,setdeleteMessage] = useState(false);
    const [deleteMessagesuccess,setdeleteMessagesuccess] = useState(false);
    const [inputTitle,setinputTitle] = useState("");
    const [inputDesc,setinputDesc] = useState("");
    const [items,setitems] = useState([]);
 
      
    // HANDLING INPUT FIELDS
    const handleInput =(e) =>{
        setinputTitle(e.target.value);
    };
        // HANDLING INPUT FIELDS
        const handleInputdesc =(e) =>{
            setinputDesc(e.target.value);
        };
        //SUBMITTING FORM
        const handleSubmit = (e) =>{
            setshowList(true);
            setshowNew(true);
            e.preventDefault();
            if (!inputTitle || !inputDesc){
                alert("fill data");
                showList(false);
            } else if (inputTitle && !toggleSubmit){
                setitems(
                    items.map((elem)=>{
                            return {...elem,name:inputTitle,desc:inputDesc}
                    })
                );
                setinputTitle("");
                setinputDesc("");
                settoggleSubmit(true);
                setshowForm(false);
                setshowDelete(true);
            } else {
                const allinputTitle = {
                    id: new Date().getTime().toString,
                    name: inputTitle,
                    desc: inputDesc,
                };
                setitems([allinputTitle,...items]);
                setinputTitle("");
                setinputDesc("");
                setshowForm(false);
            }
        };
        // SUBMITTING FORM

        // DELETE
        const handleDelete = (id) => {
            console.log(id);
            const updatedItems = items.filter((elem) => elem.id !== id);
            
            setdeleteMessage(true);
            setTimeout(() => {
              setitems(updatedItems);
              setdeleteMessage(false);
            }, 2000);
          
            setdeleteMessage(false);
            setdeleteMessagesuccess(false);
        };
        //DELETE
        // EDIT


        
        
        const handleEdit = (id, name, desc) => {
            setshowList(false);
            setshowDelete(false);
            setshowNew(false);
            setshowForm(true);
            settoggleSubmit(false);
          
            // Set specific values in the input fields when edit button is clicked
            setinputTitle(name); 
            setinputDesc(desc); 
          
            setisEditItem(id.toString());
          };

        //working one
        //EDIT

        // ADD NEW TASK
        const handelAdd =() => {
            //alert("hello")
            setshowForm(true);
            setshowList(true);
            setshowNew(false);
        };
        // ADD NEW TASK
    
    return(
        <>
        {showNew ?(
        <div className="container ">
            <div className="col-12 text-end">
                <button className="btn btn-primary" onClick={handelAdd}>
                     Add New Item
                </button>
            </div>
            </div>
        ) : (
            ""
        )}
        {showForm ? (
        <>
        <div className="container border round d-flex justify-content-center shadow p-3 mb-5 bg-" >
            <div className="row ">
                <div className="text-center">
                    <h2>{toggleSubmit ? "Add Task" :"Edit Task"}</h2>

                </div>
                <form className="col-12 p-2">
                <label htmlFor="title" className="my-2">
                    Enter Title
                </label>
                <input type="text"
                name="title"
                id="title"
                placeholder="title"
                className="w-100 my-1 p-2" 
                onChange={handleInput}
                value={inputTitle}
                />
                <label className="my-2" htmlFor="descripition" >
                    Enter
                </label>
                <input type="text"
                name="descripition"
                id="descripition"
                placeholder="descripition"
                className="w-100 my-1 p-2" 
                onChange={handleInputdesc}
                value={inputDesc}
                />
                {/* <div className="text-center">*/}
                {toggleSubmit ? (
                <button className="btn btn-primary my-2" onClick={handleSubmit}>Save</button>
                ) :(
                    <button className="btn btn-primary my-2" onClick={handleSubmit}>Update</button>
                )}
                {/*</div>*/}
                    </form>

            </div>
        </div>
            ) })}
        </>
    ) :
        ""}
    {showList ? (
        <div className="container py-2">
            {deleteMessage ? (
                <p className="text-center text-danger">Item Deleted Successfully</p>
                ) : (
                    ""
                    )}
       {items.map((elem,index) =>{
           return (
               <div
               className="row border rounded shadow p-3 mb-3 bg-white rounded p-2" key={elem.id}>
    <div className="col-12 row d-flex justify-content-between align-items-center">
        <div class="col-10">
            <h4>{elem.name}</h4>
            <p>{elem.desc}</p>
        </div>
        <div class="col-1">
        <button
        className="btn btn-primary mx-2"
         onClick={() => handleEdit(elem.id, elem.name, elem.desc )}
        >
            Edit
        </button>
        </div>
        <div class="col-1">
        {showDelete ? (
            <button 
            className="btn btn-danger mx-2"
            onClick={() => handleDelete(elem.id)}
            >
                Delete
                </button>
                    ) : ""
                    
                }
                </div>
                 </div>
        </div>
    ) })}
        </div>
    ):""}
    
    </>
    );
            }
 

            
export default Todo;