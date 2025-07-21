"use client"
import { useUser } from '@/app/provider'
import React from 'react'

function WelcomeContainer() {
    const {user} = useUser();
    return (
        
        <div className = "bg-white  p-5 rounded-2xl flex-justify-between item-center">
            <div>
                <h2 className='text-lg font-bold'> Welcome Back, {user?.name || "Guest"}</h2>
                <h2 className='text-gray-500'>AI-Driven Interviews, Hassle-Free Hiring</h2>
            </div>
            {user && <Image src={user?.picture} alt = 'userAvatar' width = {50} height = {50} />}
        </div>
    )
}

export default WelcomeContainer