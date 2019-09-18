import React from 'react'

const ItemView = props => {
  const item = props.item
  return (
    <div id="item-container">
      <span>{item.name}</span>
      <img src={item.imageUrl} />
      <span>{item.price}</span>
    </div>
  )
}

export default ItemView
