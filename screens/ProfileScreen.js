import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons, FontAwesome, AntDesign } from '@expo/vector-icons';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    console.log('Login com:', email, password);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
    

        {/* Título */}
        <View style={styles.header}>
          <Text style={styles.title}>Log into your Mindly account</Text>
        </View>

        {/* Formulário */}
        <View style={styles.formContainer}>
          {/* Campo de Email */}
          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={20} color="#A78BFA" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#A78BFA"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Campo de Palavra-passe */}
          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={20} color="#A78BFA" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#A78BFA"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons
                name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                size={20}
                color="#A78BFA"
              />
            </TouchableOpacity>
          </View>

          {/* Esqueci a palavra-passe */}
          <TouchableOpacity style={styles.forgotContainer}>
            <Text style={styles.forgotText}>Forgot password?</Text>
          </TouchableOpacity>
        </View>

        {/* Divisor OR */}
        <View style={styles.dividerContainer}>
          <View style={styles.line} />
          <Text style={styles.dividerText}>OR</Text>
          <View style={styles.line} />
        </View>

        {/* Botões Sociais */}
        <View style={styles.socialContainer}>
          {/* Facebook */}
          <TouchableOpacity style={styles.socialButton}>
            <FontAwesome name="facebook" size={18} color="#1877F2" style={styles.socialIcon} />
            <Text style={styles.socialButtonText}>Sign in with Facebook</Text>
          </TouchableOpacity>

          {/* Apple */}
          <TouchableOpacity style={styles.socialButton}>
            <AntDesign name="apple1" size={18} color="#000000" style={styles.socialIcon} />
            <Text style={styles.socialButtonText}>Sign in with Apple</Text>
          </TouchableOpacity>

          {/* Google */}
          <TouchableOpacity style={styles.socialButton}>
            <AntDesign name="google" size={18} color="#EA4335" style={styles.socialIcon} />
            <Text style={styles.socialButtonText}>Sign in with Google</Text>
          </TouchableOpacity>
        </View>

        {/* Rodapé / Termos */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Your use of Mindly is subject to our{' '}
            <Text style={styles.linkText}>Terms</Text> and{' '}
            <Text style={styles.linkText}>Privacy Policy</Text>
          </Text>
          <TouchableOpacity style={styles.signupContainer}>
            <Text style={styles.signupPrompt}>Need an account? </Text>
            <Text style={styles.signupText}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#581C87', // Tom roxo escuro predominante na imagem
  },
  keyboardView: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  header: {
    marginBottom: 24,
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 14,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 15,
  },
  forgotContainer: {
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  forgotText: {
    color: '#E9D5FF',
    fontSize: 13,
    fontWeight: '500',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  dividerText: {
    color: '#E9D5FF',
    fontSize: 12,
    fontWeight: '600',
    marginHorizontal: 12,
  },
  socialContainer: {
    width: '100%',
    gap: 10,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    paddingVertical: 14,
    paddingHorizontal: 20,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  socialIcon: {
    marginRight: 12,
  },
  socialButtonText: {
    color: '#1F2937',
    fontSize: 15,
    fontWeight: '600',
  },
  footer: {
    marginTop: 24,
    alignItems: 'center',
  },
  footerText: {
    color: '#D8B4FE',
    fontSize: 11,
    textAlign: 'center',
    marginBottom: 12,
    paddingHorizontal: 10,
  },
  linkText: {
    textDecorationLine: 'underline',
    fontWeight: '600',
  },
  signupContainer: {
    flexDirection: 'row',
  },
  signupPrompt: {
    color: '#D8B4FE',
    fontSize: 13,
  },
  signupText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
});