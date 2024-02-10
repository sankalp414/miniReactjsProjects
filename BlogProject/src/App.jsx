import authService from './appwrite/auth'
import {useDispatch} from 'react-redux'
import { useEffect, useState } from 'react'
import './App.css'
import {login,logout} from './store/authSlice'
function App() {
  const [loading,setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData)=>{
      if (userData) {
        dispatch(login({userData}))
      }else{
        dispatch(logout())
      }
    })
    .finally(setLoading(false))
  },[])

  return !loading ? (
    <div className='min-h-screen '>

    </div>
  ) : null
}

export default App
