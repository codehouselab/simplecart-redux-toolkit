import React from 'react'

function Layout({ children }) {
    return (
        <div>
            <p className='text-2xl text-center border-b-2 mt-5'>
                Simple Shopping Cart - React with Redux/Toolkit
            </p>
            <div>{children}</div>
        </div>

    )
}

export default Layout