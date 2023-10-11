import './App.css';
import { useEffect, useState} from 'react'
import axios from 'axios'

const URL = 'http://localhost:3001'

function App() {
  const [persons, setPersons] = useState([])
  const [newPerson, setNewPerson] = useState('')

    useEffect(() => {
      axios.get(URL)
        .then(response => {
            setPersons(response.data)
        }).catch(error => {
            alert(error)
        })
    }, [])


    const save = (e) => {
      e.preventDefault()
      // {name: "Matti"}
      const json = JSON.stringify({name:newPerson})
      //axions.post(`${url}/new`)...
      axios.post(URL + '/new',json,{
        headers:{
          'Content-Type' : 'application/json'
        }
      }).then(response => {
          setPersons(persons => [...persons,response.data])
          setNewPerson('')
      }).catch(error => {
        alert(error)

      })
    }

  return (
    <div>
      <h3>My favourite teachers</h3>
      <form onSubmit={save}>
        <label>New teacher</label>
        <input value={newPerson} onChange={e => setNewPerson(e.target.value)}/>
        <button>Save</button>
      </form>
      <ul>
        {
          persons.map(person => {
              return <li>{person.name}</li>
          })
        }
      </ul>
    </div>
  );
}

export default App;
