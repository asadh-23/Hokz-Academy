import React from 'react'
import { Route, Routes } from 'react-router-dom'
import TutorRegister from '../pages/tutor/auth/TutorRegister'
import TutorLogin from '../pages/tutor/auth/TutorLogin'
import ForgotPassword from '../pages/common/ForgotPassword'
import OtpVerify from '../pages/common/OtpVerify'
import ResetPassword from '../pages/common/ResetPassword'

export default function TutorRoutes() {
  return (
    <Routes>
      <Route path='/register' element={<TutorRegister /> } />
      <Route path='/login' element={<TutorLogin /> } />
      <Route path='/verify-otp' element={<OtpVerify />} />
      <Route path='/forgot-password' element={<ForgotPassword />} />
      <Route path='/reset-password/:token' element={<ResetPassword /> } />
    </Routes>
  )
}
