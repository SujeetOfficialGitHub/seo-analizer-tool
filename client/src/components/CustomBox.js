import React from 'react'

const CustomBox = ({children, className}) => {
  return (
    <div 
        className={className} 
        style={{
            border: '1px solid black', 
            padding: '20px 5px', 
            borderRadius: '5px',
            fontSize: '20px',
            boxShadow: '5px 5px 15px 1px rgba(0, 0, 0, .5)'
        }}
    >
        {children}
    </div>
  )
}

export default CustomBox