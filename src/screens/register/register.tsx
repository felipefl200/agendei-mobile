import { Link, useRouter } from 'expo-router'
import { useState } from 'react'
import { Image, Pressable, Text, View } from 'react-native'
import {
  KeyboardAwareScrollView,
  KeyboardToolbar,
} from 'react-native-keyboard-controller'
import Button from '@/components/button/button'
import Icon from '@/components/icon/icon'
import Input from '@/components/input/input'
import { COLORS } from '@/constants/theme'
import { useRegister } from '@/hooks/useRegister'
import { getAuthErrorMessage } from '@/utils/getAuthErrorMessage'
import logo from '@/assets/logo.png'
import { styles } from './register.styles'

function Register() {
  const router = useRouter()
  const registerMutation = useRegister()
  const [hasAcceptedTerms, setHasAcceptedTerms] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [formError, setFormError] = useState<string | null>(null)
  const isSubmitting = registerMutation.isPending

  async function handleRegister() {
    if (!name.trim() || !email.trim() || !password) {
      setFormError('Informe nome, e-mail e senha para criar sua conta.')
      return
    }

    if (password !== passwordConfirmation) {
      setFormError('As senhas não conferem.')
      return
    }

    if (!hasAcceptedTerms) {
      setFormError('Aceite os termos para continuar.')
      return
    }

    setFormError(null)

    try {
      const digitsOnlyPhone = phone.replace(/\D/g, '')

      await registerMutation.mutateAsync({
        name,
        email,
        password,
        ...(digitsOnlyPhone ? { phone: digitsOnlyPhone } : {}),
      })
      router.replace('/dashboard')
    } catch (error) {
      setFormError(getAuthErrorMessage(error))
    }
  }

  return (
    <>
      <KeyboardAwareScrollView
        bottomOffset={62}
        bounces={false}
        contentContainerStyle={styles.content}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        style={styles.container}
      >
        <View style={styles.backgroundCircleTop} />
        <View style={styles.backgroundCircleBottom} />

        <View style={styles.header}>
          <Image source={logo} style={styles.logo} />
          <Text style={styles.subtitle}>
            Crie sua conta e cuide da sua saúde com mais praticidade.
          </Text>
        </View>

        <View style={styles.illustration}>
          <View style={styles.plant}>
            <View style={styles.leafTall} />
            <View style={styles.leafSmall} />
          </View>
          <View style={styles.doctorAvatar}>
            <View style={styles.doctorHead} />
            <View style={styles.doctorBody}>
              <Icon color={COLORS.primary} name="stethoscope" size="lg" />
            </View>
          </View>
          <View style={styles.tablet}>
            <View style={styles.tabletLine} />
            <View style={styles.tabletLineShort} />
          </View>
          <View style={styles.plusBadge}>
            <Text style={styles.plusBadgeText}>+</Text>
          </View>
        </View>

        <View style={styles.form}>
          <Input
            autoCapitalize="words"
            editable={!isSubmitting}
            leftIcon={<Icon color={COLORS.primaryDark} name="user" size="md" />}
            onChangeText={setName}
            placeholder="Nome completo"
            textContentType="name"
            value={name}
          />
          <Input
            autoCapitalize="none"
            autoComplete="email"
            editable={!isSubmitting}
            keyboardType="email-address"
            leftIcon={<Icon color={COLORS.primaryDark} name="mail" size="md" />}
            onChangeText={setEmail}
            placeholder="E-mail"
            textContentType="emailAddress"
            value={email}
          />
          <Input
            editable={!isSubmitting}
            keyboardType="phone-pad"
            leftIcon={<Icon color={COLORS.primaryDark} name="phone" size="md" />}
            onChangeText={setPhone}
            placeholder="Telefone"
            rightElement={<Text style={styles.phoneMask}>(11) 99999-9999</Text>}
            textContentType="telephoneNumber"
            value={phone}
          />
          <Input
            editable={!isSubmitting}
            leftIcon={<Icon color={COLORS.primaryDark} name="lockKeyhole" size="md" />}
            onChangeText={setPassword}
            placeholder="Senha"
            secureTextEntry
            textContentType="newPassword"
            value={password}
          />
          <Input
            editable={!isSubmitting}
            leftIcon={<Icon color={COLORS.primaryDark} name="lockKeyhole" size="md" />}
            onChangeText={setPasswordConfirmation}
            onSubmitEditing={handleRegister}
            placeholder="Confirmar senha"
            returnKeyType="go"
            secureTextEntry
            textContentType="newPassword"
            value={passwordConfirmation}
          />
        </View>

        <Pressable
          accessibilityRole="checkbox"
          accessibilityState={{ checked: hasAcceptedTerms }}
          onPress={() => setHasAcceptedTerms((currentValue) => !currentValue)}
          style={styles.termsRow}
        >
          <View
            style={[styles.checkbox, hasAcceptedTerms ? styles.checkboxChecked : null]}
          >
            {hasAcceptedTerms ? (
              <Icon color={COLORS.white} name="check" size="xs" strokeWidth={3} />
            ) : null}
          </View>
          <Text style={styles.termsText}>
            Li e aceito os <Text style={styles.termsLink}>termos de uso</Text> e a{' '}
            <Text style={styles.termsLink}>política de privacidade</Text>
          </Text>
        </Pressable>

        {formError ? <Text style={styles.formError}>{formError}</Text> : null}

        <Button
          disabled={!hasAcceptedTerms || isSubmitting}
          onPress={handleRegister}
          style={!hasAcceptedTerms || isSubmitting ? styles.buttonDisabled : null}
        >
          {isSubmitting ? 'Criando conta...' : 'Criar conta'}
        </Button>

        <View style={styles.dividerRow}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>ou continue com</Text>
          <View style={styles.divider} />
        </View>

        <View style={styles.socialRow}>
          <Pressable style={styles.socialButton}>
            <Text style={styles.googleMark}>G</Text>
            <Text style={styles.socialText}>Google</Text>
          </Pressable>
          <Pressable style={styles.socialButton}>
            <Text style={styles.appleMark}>A</Text>
            <Text style={styles.socialText}>Apple</Text>
          </Pressable>
        </View>

        <Text style={styles.footerText}>
          Já tem uma conta?{' '}
          <Link href="/" style={styles.footerLink}>
            Entrar
          </Link>
        </Text>
      </KeyboardAwareScrollView>
      <KeyboardToolbar />
    </>
  )
}

export default Register
