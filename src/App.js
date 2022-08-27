import './App.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import AddPost from './components/AddPost'
import Posts from './components/Posts'

export default function App () {
  const [data, setData] = useState([])
  const [title, setTitle] = useState('')
  const [id, setId] = useState('')
  const [body, setBody] = useState('')
  const [users, setUsers] = useState([])

  async function getData () {
    await axios.get('https://jsonplaceholder.typicode.com/posts')
      .then((response) => { setData(response.data) })
      .catch(err => console.log(err))
  }

  async function getUsers () {
    await axios.get('https://jsonplaceholder.typicode.com/users')
      .then((response) => setUsers(response.data))
      .catch((err) => console.log(err))
  }
  // Get Data
  useEffect(() => {
    getData()
    getUsers()
  }, [])

  return (
    <div className='App'>
      <div>
        <AddPost
          data={data}
          setData={setData}
          id={id}
          setId={setId}
          title={title}
          setTitle={setTitle}
          body={body}
          setBody={setBody}
          users={users}
          setUsers={setUsers}
        />
      </div>
      <Posts
        data={data}
        setData={setData}
        id={id}
      />
    </div>
  )
}
