import axios from 'axios';
import { Loader, Loader2Icon } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';

function QuestionList({formData}) {

    const [loading,setLoading] = useState(true);
    const [questionList,setQuestionList] = useState();


    useEffect (() => {
        if(formData) {
            GenerateQuestionList();
        }
    },[formData]) 

    const GenerateQuestionList = async()  => {
        setLoading(true);
        try{
        const result = await axios.post('/api/ai-model',{
            ...formData
        })
        console.log(result.data);
        console.log(result.data.content);
        const Content = JSON.parse(result.data.content);
        setQuestionList(Content);
        setLoading(false);
    
        }
        catch(e) {
            toast('Server Error, Try Again!')
            setLoading(false);
        }
    }
    return (
        <div>
            {loading&&
            <div className='p-5 bg-blue-50 rounded-xl border border-primary flex-gap-5 itens-center'>
                <Loader2Icon className='animate-spin' />
                <div>
                    <h2 className='font-meduim'>Generating Interview Questions</h2>
                    <p className='text-primary'>Our AI is crafting personalised question baed on your job</p>
                </div>
            </div>
            }
        </div>
    ) 
    
}

export default QuestionList