import { Image, Text, TextInput, View } from 'react-native'
import Button from '@/components/button/button'
import logo from '@/assets/logo.png'
import { styles } from './login.style'

function Login() {
  return (
    <View style={styles.container}>
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

        <Text style={styles.title}>Cuidar de voce nunca foi tao facil.</Text>
        <Text style={styles.subtitle}>
          Acesse sua conta para agendar consultas, encontrar especialistas e acompanhar seus
          horarios.
        </Text>

        <View style={styles.form}>
          <TextInput
            autoCapitalize="none"
            keyboardType="email-address"
            placeholder="seu@email.com"
            placeholderTextColor="#8A98AA"
            style={styles.input}
          />
          <TextInput
            placeholder="Senha"
            placeholderTextColor="#8A98AA"
            secureTextEntry
            style={styles.input}
          />
          <Text style={styles.forgotPassword}>Esqueceu a senha?</Text>
          <Button>Entrar</Button>
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
        <Text style={styles.footerText}>Nao tem uma conta? </Text>
        <Text style={styles.footerLink}>Criar conta</Text>
      </View>
    </View>
  )
}

export default Login
