import React from 'react'
import styles from './ShopSelect.module.css'

const ShopSelect = ({children,...props}) => {
  return (
    <div>
      <select 
        className={styles.select} 
        {...props}>
        {children}
      </select>
    </div>
  )
}

export default ShopSelect