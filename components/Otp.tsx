import React, { useState } from 'react';
import { View, TextInput, StyleSheet, useColorScheme } from 'react-native';

interface OtpProps {
  numberOfDigits: number;
  onComplete: (otp: string) => void;
}

const Otp: React.FC<OtpProps> = ({ onComplete }) => {
  const [otp, setOtp] = useState<string[]>(Array(4).fill(''));
  const theme = useColorScheme();
  const styles = theme === 'dark' ? darkStyles : lightStyles;

  const handleChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    if (newOtp.every(digit => digit !== '')) {
      onComplete(newOtp.join(''));
    }
  };

  return (
    <View style={styles.otpContainer}>
      {otp.map((digit, index) => (
        <TextInput
          key={index}
          style={styles.otpInput}
          keyboardType="numeric"
          maxLength={1}
          onChangeText={text => handleChange(text, index)}
          value={digit}
        />
      ))}
    </View>
  );
};

const lightStyles = StyleSheet.create({
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
    gap: 10,
  },
  otpInput: {
    width: 40,
    height: 50,
    borderWidth: 1,
    borderColor: 'gray',
    textAlign: 'center',
    fontSize: 20,
    borderRadius: 5,
    backgroundColor: 'white',
    color: 'black',
  },
});

const darkStyles = StyleSheet.create({
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
    gap: 10,
  },
  otpInput: {
    width: 40,
    height: 50,
    borderWidth: 1,
    borderColor: 'lightgray',
    textAlign: 'center',
    fontSize: 20,
    borderRadius: 5,
    backgroundColor: 'black',
    color: 'white',
  },
});

export default Otp;
