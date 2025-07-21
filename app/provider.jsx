"use client";
import { useEffect, useState, useContext } from 'react'; // ✅ includes useContext
import { UserDetailContext } from '@/context/UserDetailContext';
import { supabase } from '@/services/supabaseClient';


function Provider({ children }) {

    const [user,setUser] = useState();

    useEffect(() => {
        CreateNewUser();
    }, []);

    const CreateNewUser = async () => {
        supabase.auth.getUser().then(async ({ data : {user} } ) => {
        let { data: Users } = await supabase
            .from('Users')
            .select('*')
            .eq('email', user.email);

        console.log(Users);

        if (Users?.length === 0) {
            const { data } = await supabase.from("Users").insert([
            {
                name: user?.user_metadata?.name,
                email: user?.email,
                picture: user?.user_metadata?.picture,
            }
            ]);
            console.log(data);
            setUser(data);
            return ;
        }
    
        setUser(Users[0]);
        })
    }


        return (
        <UserDetailContext.Provider value={{user, setUser}}>
            <div>
            {children}
            </div>
        </UserDetailContext.Provider>
        )
   

 
}

export default Provider;

export const useUser = () => {
    const context = useContext(UserDetailContext);
    if(!context) {
        return {user : null, setUser : () => {} };
    }
    return context;
}