import '../../App.css'
import sb from "../../../Private/SupabaseClient"
import { ContentContext } from '../ContentProvider';
import { useContext } from 'react';

export function SignInForm({mode, setLogged}){
    const content = useContext(ContentContext);

    function handleSubmit(e){
        e.preventDefault();
        const user = e.target.username.value;
        const pass = e.target.password.value;

        const login = async () => {
            let { data, error } = await sb
            .from('Users')
            .select('*')
            .eq('username', user)
            .eq('password', pass)
            .select()

            if (error){
                content.showAlert(error.message);
                //alert(error.hint);
            }

            else if (data){
                return data;
            }
        }
        login()
        .then((res) => {
            
            if (res.length == 0){
                content.showAlert("Username or password are incorrect, or acount does not exists");
                return
            }

            const user = res[0];

            if (e.target.remember.checked){
                localStorage.setItem('user', JSON.stringify(user));   
            }

            setLogged(user);
        })
    }

    return (
        <form onSubmit={handleSubmit} 
            className={!mode ? 'userForm column sign hide' : 'userForm column sign show'}
        >
            <h1> Sign In</h1>
            <label htmlFor="username">Username:</label>
            <input type="text" name="username" />
            <label htmlFor="password">Password:</label>
            <input type="password" name="password" />
            <div>
                <label htmlFor="remember">Remember user:</label>
                <input type="checkbox" name='remember' />
            </div>
            <input className='btn' type="submit" value="Sign In" />
        </form>
    )
}

