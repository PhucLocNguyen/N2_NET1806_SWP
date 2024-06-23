import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PageError from "../pageerror/PageError";
import InputText from "./InputText";
import { Button, SvgIcon, FormControl } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import { ResendCode, VerifyRegister } from "../../api/ApiLogin";
import { toast } from "react-toastify";

function ConfirmationAccount() {
    const location = useLocation();
    const [codeVerify, setCodeVerify] = useState(null);
    const [timeLeft, setTimeLeft] = useState(300); // 300 giây = 5 phút
    const [openResendCode, setOpenResendCode] = useState(false);
    const [valid, setValid] = useState(true);

    try {
        const { email, username } = location.state;
        const navigate = useNavigate();
        const submitCode = async (e) => {
            e.preventDefault();
            const data = e.target[0].value;
            // Gửi dữ liệu tới backend để kiểm tra
            const sendingCode = await VerifyRegister(data);
            console.log(sendingCode);
            if (sendingCode < 400) {
                localStorage.removeItem('expiryTime');
                localStorage.removeItem('currentUser');
                navigate("/login", { replace: true });
            } else {
                // Xử lý lỗi nếu cần thiết
            }
        };

        const resendCode = async () => {
            // Gửi lại mã tới email và cập nhật thời gian hết hạn
            // Nếu thành công gửi lại mã
            const newExpiryTime = Date.now() + 300000; // 300000ms = 5 phút
            const responseResend = await ResendCode();
            
            if(responseResend==200 ){
              localStorage.setItem('expiryTime', newExpiryTime);
              setTimeLeft(30); // Đặt lại thời gian đếm ngược
            }else{
              toast.info("Register again to verify the code");
              navigate("/login", { replace: true });
            }
        };

        useEffect(() => {
            // Lấy thời gian hết hạn từ localStorage
            if(localStorage.getItem("currentUser")==null){
              localStorage.setItem('currentUser', JSON.stringify({email: email, username: username }));
            }else{
              const dataCurrent = JSON.parse(localStorage.getItem("currentUser"));
              if(dataCurrent.email == email && dataCurrent.username == username){

              }else{
                localStorage.removeItem("expiryTime");
              }
            }
            const expiryTime = localStorage.getItem('expiryTime');

            if (expiryTime) {
                const currentTime = Date.now();
                const timeLeft = Math.max(0, Math.floor((expiryTime - currentTime) / 1000));
                setTimeLeft(timeLeft);
        
                // Nếu thời gian còn lại, thiết lập bộ đếm thời gian
                if (timeLeft > 0) {
                    const timer = setInterval(() => {
                        setTimeLeft(prevTime => {
                            if (prevTime <= 1) {
                                clearInterval(timer);
                                return 0;
                            }
                            return prevTime - 1;
                        });
                    }, 1000);

                    // Hủy bộ đếm khi component bị unmount
                    return () => clearInterval(timer);
                }
            } else {
                // Nếu không có thời gian hết hạn trong localStorage, thiết lập thời gian mới
                const newExpiryTime = Date.now() + 300*1000; // 300000ms = 5 phút
                localStorage.setItem('expiryTime', newExpiryTime);
                setTimeLeft(300); // 300 giây = 5 phút
            }
        }, []);

        useEffect(() => {
          if(timeLeft>0){
              let timer;
              if (timeLeft > 0) {
                  timer = setInterval(() => {
                      setTimeLeft(prevTime => {
                          if (prevTime <= 1) {
                              clearInterval(timer);
                              return 0;
                          }
                          return prevTime - 1;
                      });
                  }, 1000);
              }
      
              return () => clearInterval(timer);
          }
            if (timeLeft === 0) {
                setOpenResendCode(true);
            } else {
                setOpenResendCode(false);
            }
        }, [timeLeft]);

        const formatTime = (time) => {
            const minutes = Math.floor(time / 60);
            const seconds = time % 60;
            return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        };

        return (
            <>
                <div className="bg-[#c9d6ff] w-full h-screen bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center flex-col">
                    <div className="bg-[#fff] rounded-[30px] shadow-[0_5px_15px_rgba(0,0,0,0.35)] relative overflow-hidden w-[768px] max-w-[100%] min-h-[480px] py-6 px-3">
                        <div className="flex justify-center">
                            <SvgIcon sx={{ color: "rgb(198 173 138)", fontSize: "120px" }} className="border-[2px] rounded-full shadow-sm border-blue-500 p-3 mt-3">
                                <EmailIcon />
                            </SvgIcon>
                        </div>
                        <div className="px-6">
                            <h1 className="text-[30px] text-center mt-3 mb-3 font-bold">Please confirm your email</h1>
                            <h3 className="text-[20px]">Account username: {username}</h3>
                            <h3 className="text-[20px]">The code has been sent to <span className="underline">{email}</span>.</h3>
                            <h3 className="text-[20px] mb-3">Your code will expire in {formatTime(timeLeft)}</h3>
                            <form onSubmit={submitCode} className="mb-3">
                                <FormControl error={!valid} className="w-full">
                                    <InputText label='Verify code' type='text' />
                                </FormControl>
                                <Button variant="contained" type='submit' disabled={openResendCode} className='mt-3 w-full' sx={{ borderRadius: "30px" }}>Confirm the code</Button>
                            </form>
                            <Button variant="outlined" onClick={resendCode} disabled={!openResendCode} className='w-full' sx={{ borderRadius: "30px" }}>
                                {!openResendCode ? `Send the code again after ${formatTime(timeLeft)}` : "Send the code again"}
                            </Button>
                        </div>
                    </div>
                </div>
            </>
        );
    } catch (e) {
        return <><PageError /></>;
    }
}

export default ConfirmationAccount;
