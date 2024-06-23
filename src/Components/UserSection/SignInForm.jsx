import '../../App.css'
import sb from "../../../Private/SupabaseClient"


export function SignInForm({mode, setLogged}){

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
                alert(error.message);
            }

            if (data){
                return data;
            }
        }
        login()
        .then((res) => {
            const user = res[0];
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
            <input className='btn' type="submit" value="Sign In" />
        </form>
    )
}

