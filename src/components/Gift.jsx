import React from 'react';
import StyleGiftContainer from './Gift.module.css';

const Gift = ({gift, handleEdit, index, handleDelete}) => {
  return (
    <>
      <li key={gift.id} className={StyleGiftContainer.mainLi}>
        <div className={StyleGiftContainer.liContainerData}>
          <img
            src={gift.img}
            alt="Product"
            className={StyleGiftContainer.mainImg}
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
