import { Link } from 'expo-router'
import { Image, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller'
import Button from '@/components/button/button'
import Icon from '@/components/icon/icon'
import Input from '@/components/input/input'
import { COLORS } from '@/constants/theme'
import { useLoginViewModel } from '@/features/auth/view-models/useLoginViewModel'
import logo from '@/assets/logo.png'
import { styles } from './LoginScreen.styles'

function LoginScreen() {
  const vm = useLoginViewModel()

  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.container}>
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
              editable={!vm.loading}
              keyboardType="email-address"
              leftIcon={<Icon color={COLORS.primaryDark} name="mail" size="md" />}
              onChangeText={vm.setEmail}
              placeholder="seu@email.com"
              textContentType="emailAddress"
              value={vm.email}
            />
            <Input
              editable={!vm.loading}
              leftIcon={<Icon color={COLORS.primaryDark} name="lockKeyhole" size="md" />}
              onChangeText={vm.setPassword}
              onSubmitEditing={vm.handleLogin}
              placeholder="Senha"
              returnKeyType="go"
              secureTextEntry
              textContentType="password"
              value={vm.password}
            />
            {vm.error ? <Text style={styles.formError}>{vm.error}</Text> : null}
            <Text style={styles.forgotPassword}>Esqueceu a senha?</Text>
            <Button
              disabled={vm.loading}
              onPress={vm.handleLogin}
              style={vm.loading ? styles.buttonDisabled : null}
            >
              {vm.loading ? 'Entrando...' : 'Entrar'}
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
    </SafeAreaView>
  )
}

export default LoginScreen
