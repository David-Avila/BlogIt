/* eslint-disable react/prop-types */
import '../../App.css'
import sb from '../../../Private/SupabaseClient'
import {v4 as uuidv4} from 'uuid';

export function SignUpForm({mode, setLogged}){

    function handleSubmit(e){
        e.preventDefault();
        
        const user = {
            username: e.target.username.value,
            password: e.target.password.value,
            user_id: uuidv4(),
            profile_pic: null,
            email: "",
            about: "",
        }

        const check = async () => {
            const {data, error} = await sb
            .from("Users")
            .select("*")
            .eq("username", user.username)

            if (error){
                alert(error.hint);
            } else if (data){
                return data
            }
        }
        check()
        .then(res => {
            if (res.length > 0){
                alert("Username not available");
                return;
            }

            const register = async () => {
                const { data, error } = await sb
                .from('Users')
                .insert([{ 
                    user_id: user.user_id,
                    username: user.username,
                    password: user.password,
                }])
                .select()
            
                if (error){
                    alert(error.hint);
                }

                if (data){
                    return data;
                }
            }

            register()
            .then((res) => {
                console.log(res)
                //const user = res[0];
                //setLogged(user);
            })
        })
    }   
    
    return (
        <form onSubmit={handleSubmit} 
            className={mode ? 'userForm column sign hide' : 'userForm column sign show'}
        >
            <h1>Create Acount</h1>
            <label htmlFor="username">Username:</label>
            <input type="text" name="username" required/>
            <label htmlFor="password">Password:</label>
            <input type="password" name="password" required/>
            <div>
                <label htmlFor="remember">Remember user:</label>
                <input type="checkbox" name='remember' />
            </div>
            <input className='btn' type="submit" value="Sign Up" />
        </form>
    )
}

