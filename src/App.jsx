// src/App.js
import { useState } from 'react';
import './App.css'
import contacts from './contacts.json'

function App() {
  const [firstSeven, setFirstSeven] = useState(contacts.slice(0, 7));
  const [remainingContacts, setRemainingContacts] = useState(contacts.slice(7));

  function addRandomContact() {
    if (remainingContacts.length > 0) {
      const random = Math.floor(Math.random() * remainingContacts.length);
      const pickedContact = remainingContacts.splice(random, 1)[0];
      setFirstSeven([...firstSeven, pickedContact])
      console.log(remainingContacts.length)
    } else {
      alert("No more contacts")
    }
  }

  function sortByName () {
    setFirstSeven([...firstSeven.sort((a, b) => a.name.localeCompare(b.name))])
  }

  function sortByPopularity () {
    setFirstSeven([...firstSeven.sort((a, b) => (b.popularity) - (a.popularity))])
  }

  function deleteContact (id) {
    const contactsRemaining = firstSeven.filter((contact) => contact.id !== id)
    setFirstSeven(contactsRemaining);
  }
  

  return (
    <div className='App'>
    <h1>IronContacts</h1>
      <button onClick={addRandomContact}>Add Random Contact</button>
      <button onClick={sortByPopularity}>Sort by popularity</button>
      <button onClick={sortByName}>Sort by name</button>
    
      <table>
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Won an Oscar</th>
            <th>Won an Emmy</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {firstSeven.map((contact) => (
          <tr key={contact.id}>
            <td>
              <img className ='image' src={contact.pictureUrl} alt="celeb" />
            </td>
            <td>
              {contact.name}
            </td>
            <td>
                {contact.popularity.toFixed(2)}
            </td>
              {contact.wonEmmy ? <td><img src='/public/trophy.jpeg' alt ='trophy'></img></td> : <td></td>}
              {contact.wonOscar ? <td><img src='/public/trophy.jpeg' alt='trophy'></img></td> : <td></td>}
  
              <td> <button onClick={() => deleteContact(contact.id)}>Delete</button></td>
          </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
export default App

