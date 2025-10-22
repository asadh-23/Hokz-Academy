import { Routes, Route } from 'react-router-dom'
import UserRegister from '../pages/user/auth/UserRegister'
import UserLogin from '../pages/user/auth/UserLogin'
import OtpVerify from '../pages/common/OtpVerify'
import ForgotPassword from '../pages/common/ForgotPassword'
import ResetPassword from '../pages/common/ResetPassword'

export default function UserRoutes() {
  return (
    <Routes>
      <Route path='/register' element={<UserRegister />} />
      <Route path='/login' element={<UserLogin />} />
      <Route path='/verify-otp' element={<OtpVerify />} />
      <Route path='/forgot-password' element={<ForgotPassword />} />
      <Route path='/reset-password/:token' element={<ResetPassword />} />
    </Routes>
    
  )
}
