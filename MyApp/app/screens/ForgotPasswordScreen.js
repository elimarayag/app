import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function ForgotPasswordScreen({ onGoBack, onVerify }) { // onVerify prop added
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!email) {
      setError('Please enter your email.');
      return;
    }

    console.log(`Verification code sent to: ${email}`);
    setError('');
    onVerify(); // Navigate to VerificationScreen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Password</Text>
      <Text style={styles.label}>Enter your email address to reset your password:</Text>
      
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        placeholder="Enter your email"
      />

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onGoBack}>
        <Text style={styles.backText}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#f5f5f5' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  label: { fontSize: 16, marginBottom: 10, textAlign: 'center' },
  input: { height: 40, borderColor: 'gray', borderWidth: 1, borderRadius: 5, paddingHorizontal: 10, backgroundColor: 'white' },
  button: { backgroundColor: '#002D62', padding: 10, borderRadius: 5, alignItems: 'center', marginTop: 10 },
  buttonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  backText: { textAlign: 'center', marginTop: 15, fontSize: 14, color: '#002D62', fontWeight: 'bold' },
  errorText: { color: 'red', fontSize: 14, textAlign: 'center', marginTop: 5 },
});
