import React, { useState, useEffect } from "react";

import "./styles.css";

import api from "./services/api";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    carregarRepositories();
  }, []);

  function carregarRepositories(params) {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }

  async function handleAddRepositories() {
    const response = await api.post('repositories', {
      title: `Projeto ${Date.now()}`,
      url: 'http://github.com/renatoschlogel',
	    techs: ["Node.js", "React"]
    });

    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepositories(id) {
    await api.delete(`repositories/${id}`);
    
    setRepositories(repositories.filter(repository => repository.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
      
        {repositories.map(repository => 
          <li key={repository.id}>{repository.title}
            <button onClick={() => handleRemoveRepositories(repository.id)}>
              Remover
            </button>
          </li>
         )}
    
      </ul>

      <button onClick={handleAddRepositories}>Adicionar</button>
    </div>
  );
}

export default App;
