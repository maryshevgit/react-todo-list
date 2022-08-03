import React, { useEffect, useRef, useState } from 'react'
import Modal from './Modal'
import Select from './Select'

/* Создаю массив для options */
const options = [
    {title: 'ожидает', color: 'gray', id: 1},
    {title: 'в процессе', color: 'blue', id: 2},
    {title: 'выполнена', color: 'green', id: 3},
]


const TodoItem = ({todo, index, todos, setTodos}) => {
    const [selectValue, setSelectValue] = useState('ожидает')
    const [active, setActive] = useState(false)
    const [inputValue, setInputValue] = useState('')

    /* Добавляю новое value для select */
    const changeSelect = (e) => {
        setSelectValue(e.target.value)
    }

    /* С помощью useEffect слежу за изменениями selectValue; нахожу определённый объект
    по id и меняю в нём state */
    useEffect(() => {
        setTodos(todos.map(item => {
            if(item.id === todo.id) {
                return {
                    ...item,
                    state: selectValue
                }
            }
            return item
        }))
    }, [selectValue])

    /* Делаю новую переменную для цвета, чтобы в будущем использовать для border,
    с помощью метода filter получаю массив, в котором имя объекта равно selectValue */
    const color = options.filter(option => option.title === selectValue)

    /* С помощью метода filter возвращаю новый массив, которые прошли проверку по id */
    const deleteTodo = () => {
        setTodos(todos.filter(item => item.id !== todo.id))
    }

    /* Меняю название todo у полученного по id объекта */
    const updateTodo = () => {
        setTodos(todos.map(item => {
            if(item.id === todo.id) {
                return {
                    ...item,
                    title: inputValue
                }
            }
            return item
        }))
        setActive(false)
        setInputValue('')
    }

    /* Создал ref для главного блока див, которому буду менять ширину */
    const ref = useRef(null);
    /* Создал ref для блока див, с помощью которого буду менять ширину */
    const refRight = useRef(null);


  useEffect(() => {
    const resizeableEle = ref.current;
    const styles = window.getComputedStyle(resizeableEle);
    let width = parseInt(styles.width, 10);
    let x = 0;

    /* Создал функцию для высчитывания кол-во пикселей при растяжении колонки и уменьшении */
    /* Создал переменную dx, которая будет высчитывать разницу между начальной шириной элемента
        и новой */
    /* Получаю новую ширину элемента, сложив разницу и начальную ширину */
    const onMouseMoveRightResize = (event) => {
      const dx = event.clientX - x;
      x = event.clientX;
      width = width + dx;
      resizeableEle.style.width = `${width}px`;
    };

    /* Создал функцию при отжатой кнопки мыши для удаления обработчика события */
    const onMouseUpRightResize = (event) => {
      document.removeEventListener('mousemove', onMouseMoveRightResize);
    };

    /* Создал функцию, которая будет работать при нажатии мыши, добавил в эту функцию обработчики событий (передвижение мыши и 
    отжатие мыши) */
    const onMouseDownRightResize = (event) => {
      x = event.clientX;
      document.addEventListener('mousemove', onMouseMoveRightResize);
      document.addEventListener('mouseup', onMouseUpRightResize);
    };

    /* Получаю элемент, который находится на правой границе элемента todo item, добавил к 
    этому элементу функцию при нажатой кнопки мыши*/
    const resizerRight = refRight.current;
    resizerRight.addEventListener('mousedown', onMouseDownRightResize);

    return () => {
      resizerRight.removeEventListener('mousedown', onMouseDownRightResize);
    };
  }, []);

  return (
    <div className="container">
        <div ref={ref} className="resizeable" style={{border: `5px solid ${color.map(item => item.color)}`}}>
            <div ref={refRight} className="resizer resizer-r"></div>
            <div className='todo__item'>
                <div className='item__info'>
                    <div className='index'>{index+1}.</div>
                    <div className='info__title' >
                        {todo.title}
                    </div>
                </div>
                <div className='item__update'>
                    <Select options={options} selectValue={selectValue} setSelectValue={setSelectValue} changeSelect={changeSelect} />
                    <div>
                        <div onClick={() => setActive(true)} className='item__edit'>
                            edit
                        </div>
                        <div className={`edit__modal ${active ? 'active' : '' }`} onClick={() => setActive(false)}>
                            <Modal updateTodo={updateTodo} inputValue={inputValue} setInputValue={setInputValue} setActive={setActive} title={todo.title} />
                        </div>
                    </div>
                    <div className='item__delete' onClick={deleteTodo}>
                        x
                    </div>
                </div>
            </div>
        </div>
    </div>

  )
}

export default TodoItem