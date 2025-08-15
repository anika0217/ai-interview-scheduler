"use client"
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import React, { useEffect, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { InterviewType } from '@/services/Constants'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

function FormContainer({onHandleInputChange , GoToNext}) {
    const [interviewType, setInterviewType] = useState([]);

    useEffect( () => {
        if(interviewType){
            onHandleInputChange('type',interviewType)
        }
    },[interviewType])

    const AddInterviewType = (type) => {
        const data = interviewType.includes(type);
        if(!data) {
            setInterviewType (prev => [...prev, type])
        }
        else {
            const result = interviewType.filter(item => item!=type);
            setInterviewType(result);
        }
    }

    return (
        <div className='p-5 bg-white rounded-2xl'>
            <div>
                <h2 className='text-sm font-medium'>Job Position</h2>
                <Input placeholder="e.g. Full Stack Developer" 
                className='mt-2'
                onChange = {(event) => onHandleInputChange('jobPosition',event.target.value)}
                />

            </div>
            <div className='mt-5'>
                <h2 className='text-sm font-medium'>Job Description</h2>
                <Textarea placeholder="Enter details job description" className='h-[200px] mt-2'
                onChange = {(event) => onHandleInputChange('jobDescription',event.target.value)}
                />
                
            </div>
            <div className='mt-5'>
                <h2 className='text-sm font-medium'>Interview Duration</h2>  
                <Select onValueChange = {(value) =>  onHandleInputChange('duration',value)}>
                    <SelectTrigger className="w-full mt-2">
                        <SelectValue placeholder="Duration" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="5">5 mins</SelectItem>
                        <SelectItem value="15">15 mins</SelectItem>
                        <SelectItem value="30">30 mins</SelectItem>
                        <SelectItem value="45">45 mins</SelectItem>
                        <SelectItem value="60">60 mins</SelectItem>
                    </SelectContent>
                </Select>
                <div className='mt-5'>
                    <h2 className='text-sm font-medium'>Interview Type</h2>
                    <div className='flex gap-3 flex-wrap mt-2'>
                        {InterviewType.map((type,index) => (
                            <div key={index} className={`flex items-center cursor-pointer gap-2 p-1 px-2 bg-white border border-gray-300 
                            hover:bg-secondary rounded-2xl
                            ${interviewType.includes(type.title) && 'bg-blue-100 text-primary'}`}

                             onClick = {() => AddInterviewType(type.title)}>
                                <type.icon className='w-4 h-4'/>
                                <span>{type.title}</span>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
            <div className='mt-7 flex-justify-end' onClick={() => GoToNext()}>
            <Button> Generate Question <ArrowRight /></Button>
            </div>
        </div>
    )
}

export default FormContainer