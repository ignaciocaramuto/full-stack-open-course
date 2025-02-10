import { useNavigate } from "react-router-dom"
import { useField } from "../hooks"

export const CreateNew = (props) => {
  const content = useField('text')
  const author = useField('text')
  const url = useField('text')

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.inputProps.value,
      author: author.inputProps.value,
      url: url.inputProps.value,
      votes: 0
    })
    navigate("/")
  }

  const handleReset = () => {
    content.reset()
    author.reset()
    url.reset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content.inputProps} />
        </div>
        <div>
          author
          <input {...author.inputProps} />
        </div>
        <div>
          url for more info
          <input {...url.inputProps} />
        </div>
        <button type="submit">create</button>
        <button onClick={handleReset} type="button">reset</button>
      </form>
    </div>
  )
}

