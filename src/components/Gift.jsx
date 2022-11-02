import React from 'react'

import StyleGiftContainer from './Gift.module.css'

const Gift = ({ gift, handleEdit, index, handleDelete, handleDuplicate }) => {
  return (
    <>
      <li key={gift.id} className={StyleGiftContainer.mainLi}>
        <div className={StyleGiftContainer.liContainerData}>
          <img
            alt="Product"
            className={StyleGiftContainer.mainImg}
            src={gift.img}
          />
          <span>
            <p>
              <span className={StyleGiftContainer.titleGift}>{gift.name}</span>
              x{gift.quantity} - ${gift.price}
            </p>
            <small>Para: {gift.namePerson}</small>
          </span>
        </div>
        <div className={StyleGiftContainer.liButtons}>
          <button
            className="mainButton"
            onClick={() => handleEdit(index)}
          >
            E
          </button>
          <button
            className="mainButton"
            onClick={() => handleDuplicate(index)}
          >
            D
          </button>
          <button
            className="deleteButton"
            onClick={() => handleDelete(index)}
          >
            X
          </button>
        </div>
      </li>
    </>
  )
}

export default Gift
