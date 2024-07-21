import { Button, SvgIcon, Icon } from '@mui/material';
import InputPassword from './InputPassword';
import InputText from './InputText';
import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from "framer-motion";
import { LoginApi, LoginWithGoogle, RegisterApi } from '../../api/ApiLogin';
import { useNavigate, useLocation } from 'react-router-dom';
import InputPasswordConfirmation from './InputPasswordConfirmation';
import GoogleIcon from '../../assets/icon/google.png';
import { toast } from 'react-toastify';

function Login() {
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';
    const ClickSave = ()=>{
        localStorage.setItem("moveNext",from);
    }
    let [isToggle, setIsToggle] = useState(false);

    const [formData, setFormData] = useState({
        username: "", password:"",
    });

    const callGoogleLogin = async (code)=>{
        const role = await LoginWithGoogle(code);
        console.log(role);
        if(role!=null){
            var moveNext = localStorage.getItem("moveNext")!=null? localStorage.getItem("moveNext"): from;
            localStorage.removeItem("moveNext");
           navigate(moveNext, { replace: true })
        }
    }
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const code = searchParams.get('code');
        // Gửi mã xác thực đến API bằng cách sử dụng fetch hoặc axios
        console.log(JSON.stringify({code}));
        if (code) {
            callGoogleLogin(code);
        }
      }, [location.search]);
    
    useEffect(()=>{ 
        if(!isToggle){
            setFormData({ username: "", password:""});
        }else{
            setFormData({ username: "", email:"" ,password:"",passwordConfirm:""});
        }
    },[isToggle]);
    console.log(formData); 
    const HandleSubmitLogin = async (e)=>{
        e.preventDefault();
        //reset cac field trong form
        const form = e.target;
        var data = new FormData(form);
        const listState ={};
        await Object.entries(formData).forEach(([key, value]) => {
            listState[key] =data.get(key);
        });
        var htmlCollection =[...e.target];
        htmlCollection.forEach((element, index)=>{
            if(element.tagName === "INPUT"){
                element.value = "";
                element.blur();
            }
        })
        
        const { role } = await LoginApi(listState);
        if(role!==null){
            navigate(from, { replace: true })
        }
    }
    const HandleSubmitRegister = async (e)=>{
        e.preventDefault();
        //reset cac field trong form
        const form = e.target;
        if(localStorage.getItem('expiryTime')!=null){
            localStorage.removeItem('expiryTime');
        }
        if(localStorage.getItem('currentUser')!=null){
            localStorage.removeItem('currentUser');
        }
        var data = new FormData(form);
        const listState ={};
        let output = true;
        await Object.entries(formData).forEach(([key, value]) => {
            if(data.get(key)=="" && output){
                toast.error("The field "+key+" cannot be empty");
                output = false;
               }
            listState[key] =data.get(key);
        });
        if(output){
            var htmlCollection =[...e.target];
            htmlCollection.forEach((element, index)=>{
                if(element.tagName === "INPUT"){
                    element.value = "";
                    element.blur();
                }
            })
            
            const check = await RegisterApi(listState);
            if(check){
                const email = listState.email;
                const username = listState.username;
                const password = listState.password;
                const passwordConfirm = listState.passwordConfirm;
                navigate("/confirmation-account",{ state: { email, username, password, passwordConfirm} });
            }
        }
    }
   
    return (
        <div className="relative bg-[#FFF2D7] w-full h-screen flex items-center justify-center flex-col">
            <div className="bg-[#fff] rounded-[30px] shadow-[0_5px_15px_rgba(0,0,0,0.35)] relative overflow-hidden w-[768px] max-w-[100%] min-h-[480px]">

                <motion.div
                    animate={{
                        x: isToggle ? '100%' : 0,
                        opacity: isToggle ? [0, 1] : 0,
                        zIndex: isToggle ? 3 : 1
                    }}
                    transition={{
                        duration: 0.6,
                        ease: 'linear'
                    }}
                    className='absolute h-[100%] top-0 left-0 w-[50%] z-1 opacity-0'
                >
                    <form method='POST' onSubmit={(e)=>HandleSubmitRegister(e)} className='bg-[#fff] flex items-center justify-center flex-col h-[100%] px-[40px]' name='register'>
                        <h1 className='font-bold text-[35px]'>Create Account</h1>

                        <InputText label='username' type='text'></InputText>
                        <InputText label='email' type='email' pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"></InputText>
                        <InputPasswordConfirmation label='password' inputCase='register'></InputPasswordConfirmation>
                        <div className='mb-3'></div>
                        <Button variant="contained" type='submit' className='mt-3'>Sign Up</Button>
                    </form>
                </motion.div>

                {/* ------------------------------------------------------------ */}

                <motion.div
                    animate={{
                        x: isToggle ? '100%' : 0,
                        zIndex: isToggle ? 2 : 3
                    }}
                    transition={{
                        duration: 0.6,
                        ease: 'linear'
                    }}
                    className='absolute h-[100%] top-0 left-0 w-[50%] z-2'
                >
                    <form method='POST' onSubmit={HandleSubmitLogin} className='bg-[#fff] flex items-center justify-center flex-col h-[100%] px-[40px]' name='login'>
                        <h1 className='font-bold text-[35px]'>Sign In</h1>
                        <div className='my-[10px]'>
                            <motion.a whileHover={{ scale: 1.2 }} onClick={ClickSave} href='https://accounts.google.com/o/oauth2/auth?scope=openid%20email%20profile&redirect_uri=https://fpt-jewelry-production.netlify.app/login&response_type=code
    &client_id=528761239720-ac1sb7qru7cnvmmbddpsi8plsgsqrrg4.apps.googleusercontent.com&approval_prompt=force' className='border-[2px] border-solid border-[#ccc] rounded-[20%] inline-flex justify-center items-center mx-[4px] w-[40px] h-[40px]'>
                                <img className='p-[5px]' src={GoogleIcon} />
                            </motion.a>
                        </div>
                        <span className="text-[13px]">or use your username password</span>

                        {/* <InputText label='Username' type='text' handleChild={debouncedOnChange} ></InputText>
                        <InputPassword label='Password' handleChild={debouncedOnChange}></InputPassword> */}
                        <InputText label='username' type='text' ></InputText>
                        <InputPassword label='password' ></InputPassword>
                        <Button variant="contained" type='submit'>Sign In</Button>
                    </form>
                </motion.div>
                {/* ------------------------------------------------------------ */}

                <motion.div
                    animate={{
                        x: isToggle ? '-100%' : 0,
                        borderRadius: isToggle ? ['0 150px 100px 0'] : ['150px 0 0 100px'],
                        zIndex: isToggle ? 1000 : 1000
                    }}
                    transition={{
                        duration: 0.6,
                        ease: 'linear'
                    }}
                    className='absolute top-0 left-[50%] w-[50%] h-[100%] overflow-hidden rounded-tl-[150px] rounded-bl-[100px] z-1000'>
                    <motion.div
                        animate={{ x: isToggle ? '50%' : 0 }}
                        transition={{ duration: 0.6, ease: 'linear' }}
                        className='bg-[#512da8] h-[100%] text-[#fff] relative left-[-100%] w-[200%] translate-x-0 bg-gradient-to-r from-[#FFE0B5] to-[#D8AE7E]'
                    >
                        <motion.div
                            animate={{ x: isToggle ? 0 : '-200%' }}
                            transition={{ duration: 0.6, ease: 'linear' }}
                            className='absolute w-[50%] h-[100%] flex items-center justify-center flex-col px-[30px] text-center top-0 translate-x-0 translate-x-[-200%]'
                        >
                            <h1 className='font-bold text-[35px]'>Welcome Back!</h1>
                            <p className="text-[15px] leading-[20px] tracking-[0.3px] my-[20px]">
                                Enter your personal details to use all of site features
                            </p>
                            <Button onClick={() => { setIsToggle(!isToggle) }} className='bg-transparent border-[#fff]' variant="contained">Sign In</Button>
                        </motion.div>

                        <motion.div
                            animate={{ x: isToggle ? '200%' : 0 }}
                            transition={{ duration: 0.6, ease: 'linear' }}
                            className='absolute w-[50%] h-[100%] flex items-center justify-center flex-col px-[30px] text-center top-0 translate-x-0 right-0 '
                        >
                            <h1 className='font-bold text-[35px]'>Hello, Friend!</h1>
                            <p className="text-[15px] leading-[20px] tracking-[0.3px] my-[20px]">
                                Register with your personal details to use all of site features
                            </p>
                            <Button onClick={() => { setIsToggle(!isToggle) }} className='bg-transparent border-[#fff]' variant="contained">Sign Up</Button>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    )
}

export default Login