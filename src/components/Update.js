import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import UpdatePost from './UpdatePost'

export default function Update ({ data, setData, editId, editTitle, editBody }) {
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const setID = (id) => {
    console.log(id)
    localStorage.setItem('ID', id)
  }

  const setEditTitle = (title) => {
    localStorage.setItem('title', JSON.stringify(title))
  }

  const setEditBody = (body) => {
    localStorage.setItem('body', JSON.stringify(body))
  }

  return (
    <div>
      <Button
        variant='dark'
        onClick={(e) => {
          setID(editId, e)
          setEditTitle(editTitle)
          setEditBody(editBody)
          handleShow()
        }}
        className='action_btn'
      >
        Edit
      </Button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop='static'
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Edit Post
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UpdatePost data={data} setData={setData} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
