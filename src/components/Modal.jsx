import React from 'react'

const Modal = ({inputValue, setInputValue, updateTodo, setActive}) => {

  return (
    <div onClick={() => setActive(false)}>
        <div className='modal__body' onClick={e => e.stopPropagation()}>
            <div className='body__top' >
                Редактирование
                <div className='item__delete' onClick={() => setActive(false)}>
                    x
                </div> 
            </div>
            <div className='todos__create'>
                <input 
                    placeholder='Введите новое название'
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                />
                <button onClick={updateTodo}>Сохранить</button>
            </div>
        </div>
    </div>
  )
}

export default Modal