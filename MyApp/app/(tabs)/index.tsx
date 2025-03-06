import { useState } from 'react';
import { View } from 'react-native';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import VerificationScreen from '../screens/VerificationScreen'; // Import Verification Screen
import ResetPasswordScreen from '../screens/ResetPasswordScreen';

export default function App() {
  const [currentPage, setCurrentPage] = useState('login');

  return (
    <View style={{ flex: 1 }}>
      {currentPage === 'login' && (
        <LoginScreen 
          onNavigate={() => setCurrentPage('register')} 
          onForgotPassword={() => setCurrentPage('forgotPassword')}
        />
      )}
      {currentPage === 'register' && (
        <RegisterScreen onNavigate={() => setCurrentPage('login')} />
      )}
      {currentPage === 'forgotPassword' && (
        <ForgotPasswordScreen 
          onGoBack={() => setCurrentPage('login')} 
          onVerify={() => setCurrentPage('verification')} // Navigate to VerificationScreen
        />
      )}
      {currentPage === 'verification' && (
        <VerificationScreen 
          onGoBack={() => setCurrentPage('forgotPassword')} 
          onVerify={() => setCurrentPage('resetPassword')} // Navigate to ResetPasswordScreen
        />
      )}
      {currentPage === 'resetPassword' && (
        <ResetPasswordScreen onGoBack={() => setCurrentPage('login')} />
      )}
    </View>
  );
}
