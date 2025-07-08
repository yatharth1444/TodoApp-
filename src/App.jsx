import { useEffect, useState } from "react"
import styles from "./style.module.css"
import TodoListItem from "./components/todoListItem/index"
import TodoDialogList from "./components/todoListDetails/index"
import { Skeleton } from "@mui/material"
function App() {
  const [todoList, setTodoList] = useState([])
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const [todoDetails, setTodoDetails] = useState(null)
  const [openDialog, setOpenDialog] = useState(false)
  async function fetchTodoListDetails(fetchCurrentIdofTODOItem){
    console.log(fetchCurrentIdofTODOItem);
    try {
      const apiResponse = await fetch(`https://dummyjson.com/todos/${fetchCurrentIdofTODOItem}`)
      const details = await apiResponse.json()
       if(details){
        setOpenDialog(true)
        setTodoDetails(details)
      }else{
        setOpenDialog(false)
        setTodoDetails(null)
      }
    } catch (error) {
      console.log(error);
     
    }
  }
  async function fetchTodoList(){
       try {
         setLoading (true)
         const apiResponse = await fetch('https://dummyjson.com/todos')
         const result = await apiResponse.json()
         console.log(result)
         if(result?.todos && result?.todos.length > 0){
          setTodoList(result.todos)
          setErrorMessage('')
          setLoading(false)
         }
        else{
          setTodoList([])
          setLoading(false)
          setErrorMessage('')
        }
       } catch (error) {
          console.log(error);
          
       }
  }
  useEffect(()=>{
    fetchTodoList()
  },[])
 if(loading){
  return <Skeleton variant="rectangular" width={650} height={650} />
 }
  return (
    <div className={styles.mainWrapper}>
      <h1 className={styles.heading}>simple todo using material ui</h1>
      <div className={styles.TodoListWrapper}>
      {  todoList && todoList.length > 0 ? 
         todoList.map((singleItem)=> <TodoListItem todo={singleItem} fetchDetailsForCurrentItem={fetchTodoListDetails}/> ): null
          } 
          </div>
          <TodoDialogList
           todoDetails ={todoDetails} 
           setOpenDialog={setOpenDialog} 
           openDialog={openDialog}
           setTodoList={setTodoList}
           />
    </div>
  )

}
export default App
