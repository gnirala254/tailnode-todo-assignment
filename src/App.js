import React, { useState, useEffect } from 'react';
import './App.css';
import Form from './component/Form';
import TodoList from './component/TodoList';

function App() {
  const [inputText, setInputText] = useState('');
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState('all');
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [searchedArray, setSearchedArray] = useState([]);

  const filterHandler = () => {
    switch (status) {
      case 'completed':
        setFilteredTodos(todos.filter((todo) => todo.completed === true));
        break;
      case 'uncompleted':
        setFilteredTodos(todos.filter((todo) => todo.completed === false));
        break;
      case 'search':
        // console.log(searchedArray);
        setFilteredTodos(searchedArray);
        break;
      default:
        const copletedArray = todos.filter((todo) => todo.completed === true);
        const incompleteArray = todos.filter(
          (todo) => todo.completed === false
        );
        setFilteredTodos([...incompleteArray, ...copletedArray]);
        break;
    }
  };

  useEffect(() => {
    getLocalTodos();
  }, []);

  useEffect(() => {
    filterHandler();
    saveLocalTodos();
  }, [todos, status]);

  const saveLocalTodos = () => {
    localStorage.setItem('todos', JSON.stringify(todos));
  };

  const getLocalTodos = () => {
    if (localStorage.getItem('todos') === null) {
      localStorage.setItem('todos', JSON.stringify([]));
    } else {
      let todoLocal = JSON.parse(localStorage.getItem('todos'));
      setTodos(todoLocal);
    }
  };

  const clearAllHandler = () => {
    localStorage.clear();
    setFilteredTodos([]);
  };

  return (
    <div className="App">
      <header>
        <h3>Gautam's Todo List</h3>
      </header>

      <Form
        inputText={inputText}
        setInputText={setInputText}
        todos={filteredTodos}
        setTodos={setTodos}
        setStatus={setStatus}
        clearAllHandler={clearAllHandler}
        setSearchedArray={setSearchedArray}
        searchedArray={searchedArray}
      />
      <TodoList
        todos={todos}
        setTodos={setTodos}
        filteredTodos={filteredTodos}
      />
    </div>
  );
}

export default App;
