import { useRef, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function VerificationScreen({ onVerify, onGoBack }) {
  const [code, setCode] = useState(['', '', '', '']);
  const [error, setError] = useState('');
  const inputRefs = useRef([]);

  const handleChange = (text, index) => {
    if (text.length > 1) {
      return; // Prevent more than one character per box
    }

    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    // Move to next input box if a number is entered
    if (text && index < 3) {
      inputRefs.current[index + 1].focus();
    }

    // Move to previous input box if deleted
    if (!text && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleVerification = () => {
    const enteredCode = code.join('');
    if (enteredCode.length !== 4) {
      setError('Please enter a valid 4-digit code.');
      return;
    }
    setError('');
    console.log('Verification successful');
    onVerify(); // Navigate to ResetPasswordScreen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify Your Account</Text>
      <Text style={styles.label}>Enter the 4-digit code sent to your email:</Text>

      <View style={styles.codeContainer}>
        {code.map((digit, index) => (
          <TextInput
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            style={styles.input}
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
            keyboardType="numeric"
            maxLength={1}
          />
        ))}
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleVerification}>
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onGoBack}>
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#f5f5f5' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  label: { fontSize: 16, marginBottom: 10, textAlign: 'center' },
  codeContainer: { flexDirection: 'row', justifyContent: 'center', marginBottom: 15 },
  input: { 
    width: 50, 
    height: 50, 
    borderColor: 'gray', 
    borderWidth: 1, 
    borderRadius: 5, 
    textAlign: 'center', 
    fontSize: 20, 
    fontWeight: 'bold', 
    backgroundColor: 'white', 
    marginHorizontal: 5 
  },
  button: { backgroundColor: '#002D62', padding: 10, borderRadius: 5, alignItems: 'center', marginTop: 10 },
  buttonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  backText: { textAlign: 'center', marginTop: 15, fontSize: 14, color: '#002D62', fontWeight: 'bold' },
  errorText: { color: 'red', fontSize: 14, textAlign: 'center', marginTop: 5 },
});
