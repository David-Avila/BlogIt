import '../../App.css'
import { useContext, useState } from 'react'
import { ContentContext } from '../ContentProvider'
import { UserBlogs } from './UserBlogs';
import sb from '../../../Private/SupabaseClient'

export function UserConfig(){
    const content = useContext(ContentContext);
    const [changeUser, setChangeUser] = useState(false);
    const [changePass, setChangePass] = useState(false);

    function logOut(){
        localStorage.removeItem('user');
        content.setUser(null);
        content.setMode("Home");
    }

    function setNewUser(e){
        e.preventDefault();
        const newUser = e.target.newuser.value;

        const check = async () => {
            const {data, error} = await sb
            .from("Users")
            .select("*")
            .eq("username", newUser)

            if (error){
                content.showAlert(error.message);
            } else if (data){
                return data
            }
        }

        check()
        .then(res => {
            if (res.length > 0){
                content.showAlert("Username not available");
            } else {
                const save = async () => {
                    const {data, error} = await sb
                    .from("Users")
                    .update({username: newUser})
                    .eq("username", content.currentUser.username)
                    .select()

                    if (error){
                        content.showAlert(error.message);
                    }
                    if (data){
                        return data
                    }
                }

                save()
                .then((res) => {
                    setChangeUser(false);
                    content.setUser(res[0]);
                    if (localStorage.getItem('user') != null){
                        localStorage.setItem('user', res[0]);
                    }
                })
            }
        })
    }

    function setNewPass(e){
        e.preventDefault();
        const newPass = e.target.newpass.value;
        const oldPass = e.target.oldpass.value;

        const save = async () => {
            const {data, error} = await sb
            .from("Users")
            .update({password: newPass})
            .eq("username", content.currentUser.username)
            .eq("password", oldPass)
            .select()

            if (error){
                content.showAlert(error.message);
            }
            if (data){
                return data
            }
        }

        save()
        .then((res) => {
            if (res.length == 0){
                content.showAlert("Something went wrong, make sure the old password is correct");
                return;
            }

            setChangePass(false);
            content.setUser(res[0]);
            if (localStorage.getItem('user') != null){
                localStorage.setItem('user', res[0]);
            }
        })
    }

    return (
        <div className='userConfig'>
            <h2>Hi {content.currentUser.username}. Here you
                can configurate your profile.
            </h2>

            <div className='flex column'>
                <button onClick={logOut}>Log Out</button>
                <button onClick={() => {
                    setChangeUser(true);
                    window.scrollTo(0, 0);
                    document.body.style.overflow = 'hidden';
                }}>Change Username</button>
                <button onClick={() => {
                    setChangePass(true)
                    window.scrollTo(0, 0);
                    document.body.style.overflow = 'hidden';
                }}>Change Password</button>
            </div>

            <form 
            onSubmit={setNewPass}
            className={changePass ? "configUser showConfig" : "configUser hideConfig"}>
                <h2>Change Password</h2>
                <label htmlFor="oldpass">Old Password</label>
                <input type="text" name='oldpass'/>
                <label htmlFor="newpass">New Password</label>
                <input type="password" name='newpass'/>
                <input className='btn' type="submit" value="Save" />
                <button onClick={(e) => {
                    e.preventDefault();
                    document.body.style.overflow = 'auto';
                    setChangePass(false);
                }}>Cancel</button>
            </form>

            <form 
            onSubmit={setNewUser}
            className={(changeUser ? "configUser showConfig" : "configUser hideConfig")}>
                <h2>Change Username</h2>
                <label htmlFor="oldpass">Current username: {content.currentUser.username}</label>
                <label htmlFor="newpass">New username</label>
                <input type="text" name='newuser'/>
                <input className='btn' type="submit" value="Save" />
                <button onClick={(e) => {
                    e.preventDefault();
                    document.body.style.overflow = 'auto';
                    setChangeUser(false);
                }}>Cancel</button>
            </form>

            <UserBlogs />
            
        </div>
    )
}