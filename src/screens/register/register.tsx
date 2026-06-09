import { Link } from 'expo-router'
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
import logo from '@/assets/logo.png'
import { styles } from './register.styles'

function Register() {
  const [hasAcceptedTerms, setHasAcceptedTerms] = useState(false)

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
            leftIcon={<Icon color={COLORS.primaryDark} name="user" size="md" />}
            placeholder="Nome completo"
            textContentType="name"
          />
          <Input
            autoCapitalize="none"
            keyboardType="email-address"
            leftIcon={<Icon color={COLORS.primaryDark} name="mail" size="md" />}
            placeholder="E-mail"
            textContentType="emailAddress"
          />
          <Input
            keyboardType="phone-pad"
            leftIcon={<Icon color={COLORS.primaryDark} name="phone" size="md" />}
            placeholder="Telefone"
            rightElement={<Text style={styles.phoneMask}>(11) 99999-9999</Text>}
            textContentType="telephoneNumber"
          />
          <Input
            leftIcon={<Icon color={COLORS.primaryDark} name="lockKeyhole" size="md" />}
            placeholder="Senha"
            secureTextEntry
            textContentType="newPassword"
          />
          <Input
            leftIcon={<Icon color={COLORS.primaryDark} name="lockKeyhole" size="md" />}
            placeholder="Confirmar senha"
            secureTextEntry
            textContentType="newPassword"
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

        <Button
          disabled={!hasAcceptedTerms}
          style={!hasAcceptedTerms ? styles.buttonDisabled : null}
        >
          Criar conta
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
