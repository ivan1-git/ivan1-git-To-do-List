import React, { useState } from 'react';
import './App.css';

function App() {
  const [tareas, setTareas] = useState([]);
  const [input, setInput] = useState('');
  const [filtro, setFiltro] = useState('todas');

  const agregarTarea = () => {
    if (input.trim() === '') return;
    const nuevaTarea = {
      id: Date.now(),
      texto: input,
      completada: false,
    };
    setTareas([nuevaTarea, ...tareas]);
    setInput('');
  };

  const toggleTarea = (id) => {
    const actualizadas = tareas.map((tarea) =>
      tarea.id === id ? { ...tarea, completada: !tarea.completada } : tarea
    );
    setTareas(actualizadas);
  };

  const eliminarTarea = (id) => {
    const actualizadas = tareas.filter((t) => t.id !== id);
    setTareas(actualizadas);
  };

  const tareasFiltradas = tareas.filter((t) => {
    if (filtro === 'activas') return !t.completada;
    if (filtro === 'completadas') return t.completada;
    return true;
  });

  const total = tareas.length;
  const completadas = tareas.filter((t) => t.completada).length;
  const activas = total - completadas;
  const progreso = total > 0 ? Math.round((completadas / total) * 100) : 0;

  return (
    <div className="container">
      <h1>Lista de Tareas</h1>
      <label className="subtitle">Organiza tus tareas de manera eficiente</label>

      <div className="stats">
        <div className="card total">
          <span>Total</span>
          <h2>{total}</h2>
        </div>
        <div className="card active">
          <span>Activas</span>
          <h2>{activas}</h2>
        </div>
        <div className="card completed">
          <span>Completadas</span>
          <h2>{completadas}</h2>
        </div>
        <div className="card progress">
          <span>Progreso</span>
          <h2>{progreso}%</h2>
        </div>
      </div>

      <div className="task-input">
        <input
          type="text"
          placeholder="Agregar nueva tarea..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && agregarTarea()}
        />
        <button onClick={agregarTarea}>+ Agregar</button>
      </div>

      <div className="filters">
        <button className={filtro === 'todas' ? 'active-filter' : ''} onClick={() => setFiltro('todas')}>Todas</button>
        <button className={filtro === 'activas' ? 'active-filter' : ''} onClick={() => setFiltro('activas')}>Activas</button>
        <button className={filtro === 'completadas' ? 'active-filter' : ''} onClick={() => setFiltro('completadas')}>Completadas</button>
      </div>

      <ul className="task-list">
        {tareasFiltradas.map((tarea) => (
          <li key={tarea.id} className={tarea.completada ? 'completada' : ''}>
            <button className={`check ${tarea.completada ? 'checked' : ''}`} onClick={() => toggleTarea(tarea.id)}>
              {tarea.completada && '✔'}
            </button>
            <span className="task-text">{tarea.texto}</span>
            <button className="delete" onClick={() => eliminarTarea(tarea.id)}>🗑</button>
          </li>
        ))}
        {tareasFiltradas.length === 0 && <p>No hay tareas.</p>}
      </ul>
    </div>
  );
}

export default App;
