import { useEffect, useState } from 'react'
import { Table, Button, Card } from 'react-bootstrap'
import Update from './Update'
import axios from 'axios'

export default function Posts ({
  data,
  setData,
  id
}) {
  const [comments, setComments] = useState([])

  useEffect(() => {
    getComments()
  }, [])

  // Delete Post
  const DeletePost = (id, e) => {
    e.preventDefault()
    axios
      .delete('https://jsonplaceholder.typicode.com/posts/' + id)
      .then((response) => {
        console.log(response.data, 'Deleted Post', id)
        const posts = data.filter((item) => item.id !== id)
        setData(posts)
      })
      .catch((err) => console.log(err))
  }

  async function getComments (id) {
    await axios.get('https://jsonplaceholder.typicode.com/posts/' + id + '/comments')
      .then((response) => setComments(response.data))
      .catch((err) => console.log(err))
  }

  return (
    <div>
      <Table striped bordered hover size='sm' className='blog-table'>
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Body</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((list, index) => {
            return (
              <tr key={index}>
                <td>{list.id}</td>
                <td>{list.title}
                </td>
                <td>{list.body}
                  {
                    comments.filter(comment => comment.postId === list.id)
                      .map(comment => {
                        return (
                          <div key={comment.id} className='comment_card'>
                            <Card className='comment_card_list'>
                              <Card.Body>
                                <Card.Title>Comment</Card.Title>
                                <hr />
                                <Card.Text>
                                  {comment.body}
                                </Card.Text>
                              </Card.Body>
                            </Card>
                          </div>
                        )
                      }
                      )
                                    }
                </td>
                <td>
                  <Update
                    data={data}
                    setData={setData}
                    editId={list.id}
                    editTitle={list.title}
                    editBody={list.body}
                  />
                  <Button
                    variant='danger'
                    onClick={(e) => {
                      DeletePost(list.id, e)
                    }}
                    className='action_btn'
                  >
                    Delete
                  </Button>
                  <br />
                  <Button
                    className='action_btn'
                    onClick={() => getComments(list.id)}
                  >
                    Comments
                  </Button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </div>
  )
}
