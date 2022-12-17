import React, { useState, useEffect } from 'react';
import api from './services/api';

import './app.css'
import './main.css'
import './global.css'
import './sidebar.css'
import Notes from './Components'
import RadioButton from './Components/RadioButton'

//Componente = É uma estrutura de codigo que retorna html, css ou js
//Propriedades = São informações que um componente PAI passa para um componente Filho
//Estado = Função que armazena uma informação e manipula

function App() {
  
  const [selectedValue, setSelectedValue] = useState('all')
  const [title, setTitles] = useState('')
  const [notes, setNotes] = useState('')
  const [allNotes, setAllNotes] = useState([])


  useEffect(() => { 
  getAllNotes()
},
[])

async function getAllNotes(){
  const response = await api.get('/annotations')

  setAllNotes(response.data)
}

async function loadNotes(option) {
  const params = {priority: option}
  const response = await api.get(`/priorities/`, {params})

  if(response){
    setAllNotes(response.data)
  }
}

function handleChange(e){
  setSelectedValue(e.value);

  if (e.checked && e.value !== 'all') {
    loadNotes(e.value);
  } else {
    getAllNotes();
  }
}

async function handleDelete(id){
const deletedNote = await api.delete(`/annotations/${id}`);

if(deletedNote) {
  setAllNotes(allNotes.filter(note => note._id !== id))
}

}

async function handleChangePriority(id){
  const changedNote = await api.post(`/priorities/${id}`)

  if(changedNote && selectedValue !== 'all'){
    loadNotes(selectedValue)
  } else if(changedNote) {
    getAllNotes(); 
  } 
} 

 async function handleSubmit(e){
    e.preventDefault();

    const response = await api.post('/annotations',{
      title,
      notes,
      priority: false
    })
    setNotes('')
    setTitles('')

    if(selectedValue !== 'all'){
      getAllNotes();
    } else {
      setAllNotes([...allNotes, response.data])
    }
    setSelectedValue('all')
    }

useEffect(() => {
  function enableSubtmitButton(){
    let btn = document.getElementById('btn_submit')
    btn.style.background = '#a0a7e9'

    if (title && notes) {
      btn.style.background = '#7372DD'
        } 
  }
          enableSubtmitButton()
}, [title, notes])

  return (
    <div id="app">
      <aside>
        <strong>Caderno de Notas</strong>
        <form onSubmit={handleSubmit}>

          <div className='input-block'>
            <label htmlFor='title'>Titulo da Anotação</label>
            <input 
            maxLength= '30'
            onChange={e => setTitles(e.target.value)}
            value={title}
            required />
          </div>

          <div className='input-block'>
            <label htmlFor='nota'>Anotação</label>
            <textarea value={notes} required
            onChange={e => setNotes(e.target.value)}/>
          </div>

          <button type='submit' id='btn_submit'>Salvar</button>
        </form>
        <RadioButton 
        selectedValue = {selectedValue}
        handleChange = {handleChange}
        />

      </aside>
      
      <main>
        <ul>
          {allNotes.map(data => (
              <Notes 
              key={data.id}
              data={data}
              handleDelete = {handleDelete}
              handleChangePriority = {handleChangePriority}
              />
              
          ))}
        </ul>
      </main>
    </div>
  )
}

export default App;
