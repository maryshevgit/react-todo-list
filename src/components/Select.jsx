import React from 'react'

const Select = ({selectValue, changeSelect, options}) => {
  return (
    <select className="select-css" value={selectValue} onChange={changeSelect}>
        {options.map(option =>
            <option key={option.id} value={option.title} >{option.title}</option>
        )}
    </select>
  )
}

export default Select