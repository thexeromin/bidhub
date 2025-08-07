'use client'
import { signOut } from 'next-auth/react'

const Dashboard = () => {
    return (
        <div className="">
            <h1>Hello from dashbaoard</h1>
            <button onClick={() => signOut()}>Sign out</button>
        </div>
    )
}

export default Dashboard
