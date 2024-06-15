import '../../App.css'
import supabase from '../../../Private/SupabaseClient'

export function SignInForm({mode}){

    function handleSubmit(e){
        e.preventDefault();
        const user = e.target.username.value;
        const pass = e.target.password.value;

        const logIn = async () => {

        }
    }

    return (
        <form onSubmit={handleSubmit} 
            className={!mode ? 'userForm sign hide' : 'userForm sign show'}
        >
            <h1> Sign In</h1>
            <label htmlFor="username">Username:</label>
            <input type="text" name="username" />
            <label htmlFor="password">Password:</label>
            <input type="password" name="password" />
            <input className='btn' type="submit" value="Sign In" />
        </form>
    )
}

