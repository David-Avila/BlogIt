import '../../App.css'
import supabase from '../../../Private/SupabaseClient'

export function LoginForm(){

    function handleSubmit(e){
        e.preventDefault();
        const user = e.target.username.value;
        const pass = e.target.password.value;

        const logIn = async () => {

        }
    }

    return (
        <form onSubmit={handleSubmit} className='userForm'>
            <label htmlFor="username">Username:</label>
            <input type="text" name="username" />
            <label htmlFor="password">Password:</label>
            <input type="password" name="password" />
            <input className='btn' type="submit" value="Log in" />
        </form>
    )
}

