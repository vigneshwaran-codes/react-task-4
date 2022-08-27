import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import axios from 'axios'

export default function AddPost ({ data, setData, title, setTitle, id, setId, body, setBody, users, setUsers }) {
  const [userId, setUserId] = useState('')
  // Add post
  const addPost = async (e) => {
    e.preventDefault()
    await axios.post('https://jsonplaceholder.typicode.com/posts', {
      userId,
      title,
      body
    })
      .then(response => setData([...data, { userId: userId, title: title, body: body }]))
      .catch(err => console.log(err))
    setUserId('')
    setTitle('')
    setBody('')
  }

  const selectUsers = (users) => {
    setUserId(users)
  }

  return (
    <Form>
      <Form.Group className='mb-2 col-3' controlId='exampleForm.ControlInput1'>
        <Form.Label>User Id</Form.Label>
        <select size='10'>
          {
                      users.map(user => {
                        return (
                          <option key={user.id} onClick={() => selectUsers(user.id)}>{user.name}</option>
                        )
                      })
          }
        </select>
      </Form.Group>
      <br />
      <Form.Group className='mb-2 col-3' controlId='exampleForm.ControlInput2'>
        <Form.Label>User Id</Form.Label>
        <Form.Control
          type='text'
          placeholder='Enter id'
          value={userId}
          onChange={(e) => {
            setId(e.target.value)
          }}
          required
        />
      </Form.Group>
      <br />
      <Form.Group className='mb-2 col-8' controlId='exampleForm.ControlInput3'>
        <Form.Label>Title</Form.Label>
        <Form.Control
          type='text'
          name='title'
          placeholder='Enter title'
          value={title}
          onChange={(e) => {
            setTitle(e.target.value)
          }}
          required
        />
      </Form.Group>
      <br />
      <Form.Group className='mb-2 col-8' controlId='exampleForm.ControlInput4'>
        <Form.Label>Body</Form.Label>
        <Form.Control
          type='text'
          name='description'
          placeholder='Enter Description'
          value={body}
          onChange={(e) => {
            setBody(e.target.value)
          }}
          required
        />
      </Form.Group>
      <br />
      <br />
      <Button
        variant='success'
        disabled={(!title, !id, !body)}
        type='submit'
        onClick={addPost}
      >
        Submit
      </Button>
    </Form>
  )
}
