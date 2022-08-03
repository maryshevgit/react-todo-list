import { useRef, useState } from 'react';
import './App.scss';
import TodoItem from './components/TodoItem';

function App() {
  const [todos, setTodos] = useState([])
  const [query, setQuery] = useState('')



  const inputRef = useRef(null)

  /* Создаю новый todo: разворачиваю todos и помещаю туда новый объект */
  const addTodo = () => {
    if(inputRef.current.value){
      setTodos([...todos,{
        id: Date.now(),
        title: inputRef.current.value,
      }])
    }
    inputRef.current.value = ''
  }

  /* Создал поиск с помощью метода фильтр, не изменяя состояния todos  */
  const search = (todos) => {
    return todos.filter((item) => item.title.toLowerCase().includes(query))
  }

  return (
    <div className="todos">
      <h1 className='todos__title'>
        Todo List
      </h1>
      <div className='todos__create'>
        <input
          placeholder='Название todo' 
          ref={inputRef}
        />
        <button onClick={addTodo}>
          Добавить
        </button>
      </div>
      <div className='todos__create'>
        <input
          placeholder='Поиск...'
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
      </div>
      <div className='todos__body'>
        <div className='todos__list'>
          {search(todos).map((todo, index) => 
            <div key={todo.id}>
              <TodoItem todo={todo} todos={todos} setTodos={setTodos} index={index} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
