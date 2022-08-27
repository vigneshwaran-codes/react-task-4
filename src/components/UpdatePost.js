import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import axios from 'axios'

export default function UpdatePost ({ data, setData }) {
  const [id, setId] = useState('')
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  useEffect(() => {
    setId(localStorage.getItem('ID'))
    setTitle(JSON.parse(localStorage.getItem('title')))
    setBody(JSON.parse(localStorage.getItem('body')))
  }, [])

  const updatePost = async (id, e) => {
    e.preventDefault()
    const { data } = await axios.put('https://jsonplaceholder.typicode.com/posts/' + id, {
      id: id,
      title: title,
      body: body
    })
      .then(response => console.log(response.data))
      .catch(err => console.error(err))
    const posts = [...data]
    const postIndex = posts.findIndex(post => post.id === id)
    posts[postIndex] = data
    setData({ posts })
    setId('')
    setTitle('')
    setBody('')
  }

  return (
    <div>
      <Form>
        <Form.Group
          className='mb-2 col-3'
          controlId='exampleForm.ControlInput2'
        >
          <Form.Label>Id</Form.Label>
          <Form.Control
            type='number'
            placeholder='Enter id'
            value={id}
            onChange={(e) => {
              setId(e.target.value)
            }}
            required
          />
        </Form.Group>
        <br />
        <Form.Group
          className='mb-2 col-8'
          controlId='exampleForm.ControlInput3'
        >
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
        <Form.Group
          className='mb-2 col-8'
          controlId='exampleForm.ControlInput4'
        >
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
          onClick={(e) => updatePost(id, e)}
        >
          update
        </Button>
      </Form>
    </div>
  )
}
