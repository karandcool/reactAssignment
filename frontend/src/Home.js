import React, { useEffect, useState } from "react";
import { Link, Router, useNavigate,useParams } from "react-router-dom";

function Home () {
  const navigate = useNavigate()
  const [task, setTask] = useState({"taskName": "", "details": ""})
  const [isOpen, setIsOpen] = useState(false)
  const [updateData, setUpdateData] = useState()
  const [allTask, setAllTask] = useState([])
  useEffect(() => {
    if(localStorage.getItem("token")) {
      dataApi()
    } else{
      navigate("/")
    }
  }, [])

  const onChangeInput = (e) => {
        setTask({...task, [e.target.name]: e.target.value })
        console.log(e.target.value, e.target.name)
      }

      const onChangeUpdateInput = (e) => {
        setUpdateData({...updateData, [e.target.name]: e.target.value })
      }

  const createTask = () => {
    const token = JSON.parse(localStorage.getItem("token"))
    fetch("http://localhost:5000/api/data", {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', "token" : `Bearer ${token.token}` },
          body: JSON.stringify(task)
        })
        .then(res => res.json())
        .then((post) => {
          setTask({"taskName": "", "details": ""})
          dataApi()

        });
  }
  const dataApi = () => {
    const token = JSON.parse(localStorage.getItem("token"))
    console.log(token.token)
    fetch(`http://localhost:5000/api/data`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json',
                  'token': `Bearer ${token.token}`
    },
    })
    .then(res => res.json())
    .then((post) => {
      setAllTask(post.data)
      console.log(post)
    });
  }

    const deleteAccount = (e,id) => {
      e.preventDefault()
    fetch(`http://localhost:5000/api/data/?id=${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
    .then(res => res.json())
    .then((post) => {
     dataApi()
    });
  }

  const OpenPopUp = (data) => {
    setUpdateData(data)
    setIsOpen(true)
  }

  const update = () => {
    fetch(`http://localhost:5000/api/data/?id=${updateData.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updateData)
    })
    .then(res => res.json())
    .then((post) => {
      setTask({"taskName": "", "details": ""})
      setIsOpen(false)
      dataApi()
      
    });
  }
  return (
    <>
    <h2>Create task</h2>
    <label>Task name</label><input name="taskName" value={task.taskName} onChange={onChangeInput} />
    <label>details</label><input  name="details"  value={task.details} onChange={onChangeInput} />
    <button disabled={task.taskName == "" || task.details == ""} onClick={() => createTask()}> submit </button>

    <h2>All Task</h2>
    <table>
    <thead>
        <tr>
          
          <th>Task name</th>
          <th>Details</th>
 
        </tr>
      </thead>
      <tbody>
        {allTask.map((data) => {
          return (
            <tr key={data.id}>
           <td>{data.taskName}</td>
            <td>{data.details}
            <button onClick={(e) => OpenPopUp(data)}> Edit</button>
            <button onClick={(e) => deleteAccount(e,data.id)}> Delete</button>
         </td>
         </tr>
          )
        })}
         
         </tbody>
    </table>

    {isOpen && 
      
      <div className="popup-box">
      <div className="box">
        <label>Task Name</label><input name="taskName" value={updateData.taskName} onChange={onChangeUpdateInput}/>
        <label>Details</label><input name="details" value={updateData.details} onChange={onChangeUpdateInput}/>
        <button onClick={update}>Update</button>
        <button onClick={(e)=> setIsOpen(false)}>cancel</button>
      </div>
    </div>
       
    }
    </>
  )

}

export default Home;
