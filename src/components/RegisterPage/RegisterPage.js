import React, {useRef, useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import { useForm } from 'react-hook-form'; 
import {getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, getDatabase, ref, set} from '../../firebase'
import md5 from 'md5';

function RegisterPage() {

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [ errorFromSubmit, setErrorFromSubmit] = useState('');
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data) => {
        try {
            const auth = getAuth();
            const db = getDatabase();

            setLoading(true);
            let createUser = await createUserWithEmailAndPassword(auth, data.email, data.password);
            await updateProfile(auth.currentUser, {
                displayName: data.name,
                photoURL: `http://gravatar.com/avatar/${md5(createUser.user.email)}?
                d=identicon`
            });

           await set(ref(db, 'users/' + createUser.user.uid), {
                name: createUser.user.displayName,
                image: createUser.user.photoURL,      
              });

           await signInWithEmailAndPassword(auth, data.email, data.password);

           // setLoading(false);
               
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            setLoading(false);
            setErrorFromSubmit(errorCode + errorMessage);   
        }
    };

    useEffect(() => {
        return () => setLoading(false); // cleanup function을 이용
      }, []);

    const password = useRef();
    password.current = watch('password');

    return (
        <div className="auth-wrapper">
            <div style={{textAlign: 'center'}}>
                <h3>Register</h3>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} > 
            <label>Email</label>
            <input name="email" type="email" 
            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
             />
              {errors.email && <span>This field is required</span>}
           

            <label>Name</label>
            <input name="name"
            {...register("name", { required: true, maxLength: 10 })} />
            {errors.name && errors.name.type === 'required' && <p>This name field is 
                required</p>}

            {errors.name && errors.name.type === 'maxLength' && <p>Your input exceed 
                maximum length</p>}

            <label>Password</label>
            <input name="password" type="password" 
            {...register("password", { required: true, minLength: 6 })} />

            {errors.password && errors.password.type === 'required' && <p>This password field is 
                required</p>}

            {errors.password && errors.password.type === 'minLength' && <p>Password must have at least 6 characters</p>}

            <label>Password Confirm</label>
            <input name="password_confirm" type="password"
            {...register("password_confirm", { required: true, 
            validate: (value) => 
            value === password.current
            })}
            />

            {errors.password_confirm && errors.password_confirm.type === 'required' && <p>This password_confirm field is 
                required</p>}

            {errors.password_confirm && errors.password_confirm.type === 'validate' && <p>The passwords do not match</p>}

            {errorFromSubmit && <p>{errorFromSubmit}</p>}

            <input type="submit" disabled={loading} />
            <Link style={{color:'gray', textDecoration: 'none'}}
            to="login">이미 아이디가 있다면...</Link>
            </form>
       
        </div>
    )
}

export default RegisterPage
