import { Link, useRouter } from 'expo-router'
import { useState } from 'react'
import { Image, Text, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller'
import Button from '@/components/button/button'
import Icon from '@/components/icon/icon'
import Input from '@/components/input/input'
import { COLORS } from '@/constants/theme'
import { useLogin } from '@/hooks/useLogin'
import { getAuthErrorMessage } from '@/utils/getAuthErrorMessage'
import logo from '@/assets/logo.png'
import { styles } from './login.style'

function Login() {
  const router = useRouter()
  const loginMutation = useLogin()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [formError, setFormError] = useState<string | null>(null)
  const isSubmitting = loginMutation.isPending

  async function handleLogin() {
    if (!email.trim() || !password) {
      setFormError('Informe e-mail e senha para entrar.')
      return
    }

    setFormError(null)

    try {
      await loginMutation.mutateAsync({
        email,
        password,
      })
      router.replace('/dashboard')
    } catch (error) {
      setFormError(getAuthErrorMessage(error))
    }
  }

  return (
    <KeyboardAwareScrollView
      bottomOffset={20}
      bounces={false}
      contentContainerStyle={styles.content}
      keyboardDismissMode="on-drag"
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      style={styles.container}
    >
      <View style={styles.backgroundCircle} />

      <View style={styles.header}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.tagline}>Seu tempo, sua saude, nosso compromisso.</Text>
      </View>

      <View style={styles.welcomeCard}>
        <View style={styles.illustration}>
          <View style={styles.avatar}>
            <Text style={styles.avatarFace}>+</Text>
          </View>
          <View style={styles.clipboard}>
            <View style={styles.clipboardLine} />
            <View style={styles.clipboardLineShort} />
          </View>
          <View style={styles.healthBadge}>
            <Text style={styles.healthBadgeText}>24h</Text>
          </View>
        </View>

        <Text style={styles.title}>Cuidar de você nunca foi tão fácil.</Text>
        <Text style={styles.subtitle}>
          Acesse sua conta para agendar consultas, encontrar especialistas e acompanhar
          seus horarios.
        </Text>

        <View style={styles.form}>
          <Input
            autoCapitalize="none"
            autoComplete="email"
            editable={!isSubmitting}
            keyboardType="email-address"
            leftIcon={<Icon color={COLORS.primaryDark} name="mail" size="md" />}
            onChangeText={setEmail}
            placeholder="seu@email.com"
            textContentType="emailAddress"
            value={email}
          />
          <Input
            editable={!isSubmitting}
            leftIcon={<Icon color={COLORS.primaryDark} name="lockKeyhole" size="md" />}
            onChangeText={setPassword}
            onSubmitEditing={handleLogin}
            placeholder="Senha"
            returnKeyType="go"
            secureTextEntry
            textContentType="password"
            value={password}
          />
          {formError ? <Text style={styles.formError}>{formError}</Text> : null}
          <Text style={styles.forgotPassword}>Esqueceu a senha?</Text>
          <Button
            disabled={isSubmitting}
            onPress={handleLogin}
            style={isSubmitting ? styles.buttonDisabled : null}
          >
            {isSubmitting ? 'Entrando...' : 'Entrar'}
          </Button>
        </View>

        <View style={styles.dividerRow}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>ou continue com</Text>
          <View style={styles.divider} />
        </View>

        <View style={styles.socialRow}>
          <View style={styles.socialButton}>
            <Text style={styles.googleMark}>G</Text>
            <Text style={styles.socialText}>Google</Text>
          </View>
          <View style={styles.socialButton}>
            <Text style={styles.appleMark}>A</Text>
            <Text style={styles.socialText}>Apple</Text>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Não tem uma conta? </Text>
        <Link href="/register" style={styles.footerLink}>
          Criar conta
        </Link>
      </View>
    </KeyboardAwareScrollView>
  )
}

export default Login
