import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api";

function App() {

  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('repositories').then(Response => {
      setRepositories(Response.data)
    })
  }, [])

  async function handleAddRepository() {
    const response = await api.post('repositories',
      {
        title: 'Projeto React',
        url: 'projeto-react',
        techs: '123'
      }
    )
    const repository = response.data
    setRepositories([...repositories, repository])
  }

  async function handleRemoveRepository(id) {

    await api.delete(`repositories/${id}`)

      const repositoriesFilter = repositories.filter(repository => repository.id !== id)
      setRepositories(repositoriesFilter)

  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map(repository => (
            <li key={repository.id}>
              {repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>Remover</button>
            </li>

          ))
        }


      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
