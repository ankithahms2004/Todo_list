import { useState ,useEffect} from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";




function App() {
  
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showfinished, setshowfinished] = useState(true)

  const saveTLS=(params)=>{
    localStorage.setItem("todos",JSON.stringify(todos))
  }

const toggleFinished=(e)=>{
setshowfinished(!showfinished)
}

  useEffect(() => {
    let todoString=localStorage.getItem("todos")
    if(todoString){
      let todos=JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
    
  }, [])
  

  const handleEdit=(e,id)=>{
   let t=todos.filter(i=>i.id===id)
    setTodo(t[0].todo)
    let newTodos= todos.filter(item=>{
      return item.id !== id;
    })
    setTodos(newTodos)
    saveTLS()
  }

  const handleDelete=(e,id)=>{
    let newTodos= todos.filter(item=>{
      return item.id !== id;
    })
    setTodos(newTodos)
    saveTLS()
  }

  const handleAdd=()=>{
    setTodos([...todos,{id:uuidv4(),todo,isCompleted:false}])
    setTodo("")
    saveTLS()
  }

  const handleChange=(e)=>{
setTodo(e.target.value)
  }

  const handleCheckbox=(e)=>{
       let id=e.target.name;
      let index= todos.findIndex(item=>{
        return item.id === id;
      })
      let newTodos=[...todos];
      newTodos[index].isCompleted=!newTodos[index].isCompleted;
      setTodos(newTodos)
      saveTLS()
  }


  return (
    <>
      <Navbar/>
      <div className='mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] md:w-1/2'>
      <h1 className='font-bold text-center text-3xl'>iTask - Manage your todos at one place</h1>
       <div className="addTodo my-4 flex flex-col gap-4 "><h2 className='text-2xl font-bold '>
        Add a Todo</h2>
        <div className="flex">
        <input name={todo.id} onChange={handleChange} value={todo} type='text' className='w-full rounded-full px-5 py-1'/>
        <button onClick={handleAdd} disabled={todo.length<=3} className='bg-violet-800 mx-2  hover:bg-violet-950 p-4 disabled:bg-violet-700 py-2 text-sm font-bold text-white rounded-full'>Save</button></div></div>
         <input className='my-4' type="checkbox" onChange={toggleFinished} checked={showfinished}/>Show Finished 
          <h2 className='text-2xl font-bold '>Your Todos</h2>
         
        <div className="todos">    
          {todos.length===0 && <div className='m-5'>No todos to display</div>}      
                  {todos.map(item=>{                 
                 return (showfinished || !item.isCompleted) && <div key={item.id} className="todo flex  my-3 justify-between">

                  <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted}  id="" />
            <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
            <div className="buttons flex h-full">
              <button onClick={(e)=>handleEdit(e,item.id)} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'><FaEdit />
              </button>
              <button onClick={(e)=>handleDelete(e,item.id)} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'><MdDelete />
              </button>

            </div>
          </div>
           })} 
        </div>
      </div>
    </>
  )
}

export default App
