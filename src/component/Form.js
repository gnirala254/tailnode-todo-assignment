import React from 'react';

const Form = ({
  inputText,
  setInputText,
  todos,
  setTodos,
  setStatus,
  clearAllHandler,
  searchedArray,
  setSearchedArray,
}) => {
  const inputTextHandler = (e) => {
    // console.log(e.target.value);
    setInputText(e.target.value);

    // to implement multiple search words
    // let searchWordArray = [];
    // const searchedWords = e.target.value.split(' ');
    // console.log(searchedWords);

    // searchedWords.forEach((text) => {
    //   searchWordArray.push(text.slice(1));
    //   console.log(searchWordArray);
    // });

    const hashtag = e.target.value[0];
    if (hashtag === '#') {
      setSearchedArray([]);
      const searchedWord = e.target.value.slice(1);
      todos.map((todo) =>
        todo.text.split(' ').forEach((word) => {
          if (word === searchedWord) {
            // console.log(todo);
            const array = todos.filter((el) => el.id === todo.id);
            // console.log(array);
            searchedArray = [...searchedArray, ...array];
            setSearchedArray(searchedArray);
            console.log(searchedArray);
          }
        })
      );

      if (searchedArray.length) {
        setStatus('search');
      }
    } else {
      setStatus('all');
    }
  };

  const submitTodoHandler = (e) => {
    e.preventDefault();
    setTodos([
      { text: inputText, completed: false, id: Math.random() },
      ...todos,
    ]);
    setInputText('');
  };

  const statusHandler = (e) => {
    setStatus(e.target.value);
  };

  return (
    <form>
      <input
        type="text"
        className="todo-input"
        value={inputText}
        onChange={inputTextHandler}
      />
      <button className="todo-button" type="submit" onClick={submitTodoHandler}>
        <i className="fas fa-plus-square"></i>
      </button>
      <div className="select">
        <select onChange={statusHandler} name="todos" className="filter-todo">
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="uncompleted">Uncompleted</option>
        </select>
      </div>
      <button className="trash-btn" onClick={clearAllHandler}>
        <i className="fas fa-trash"></i> Clear All
      </button>
    </form>
  );
};

export default Form;
