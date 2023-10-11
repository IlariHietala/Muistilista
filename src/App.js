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

    const remove = (name) => {
      axios.delete(`${URL}/delete/${name}`)
      .then(() => {
        const tempPersons = [...persons]
        tempPersons.splice(tempPersons.findIndex(e => e.name===name), 1)
        setPersons(tempPersons)
      })
  }

  return (
    <div>
      <h3>Muistilista</h3>
      <form onSubmit={save}>
        <label>Lisää listalle</label>
        <input value={newPerson} onChange={e => setNewPerson(e.target.value)}/>
        <button>Save</button>
      </form>
      <ul>
        {
          persons.map(person => (
            <li>{person.name} <a href="#" onClick={() => remove(person.name)}>Delete</a></li>
          ))
        }
      </ul>
    </div>
  );
}

export default App;
