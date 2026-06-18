import { Modal, Pressable, Switch, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Button from '@/components/button/button'
import Icon from '@/components/icon/icon'
import Input from '@/components/input/input'
import ProfileHeaderCard from '@/components/profile/profile-header-card'
import ProfileRow from '@/components/profile/profile-row'
import ProfileSection from '@/components/profile/profile-section'
import { ScrollScreen } from '@/components/screen'
import { COLORS, SPACING } from '@/constants/theme'
import { useProfileViewModel } from '@/features/profile/view-models/useProfileViewModel'
import { styles } from './ProfileScreen.styles'

function ProfileScreen() {
  const vm = useProfileViewModel()
  const insets = useSafeAreaInsets()
  const modalBackdropStyle = [
    styles.modalBackdrop,
    { paddingBottom: Math.max(insets.bottom, SPACING[4]) },
  ]

  return (
    <ScrollScreen contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View style={styles.menuButton}>
          <Icon color={COLORS.primaryDark} name="menu" size="md" />
        </View>
        <Text style={styles.headerTitle}>Meu perfil</Text>
        <View style={styles.headerSpacer} />
      </View>

      {vm.isLoading ? (
        <Text style={styles.stateText}>Carregando perfil...</Text>
      ) : vm.profileError ? (
        <View style={styles.errorBox}>
          <Text style={styles.stateText}>{vm.profileError}</Text>
          <Button onPress={vm.refetchProfile} style={styles.retryButton}>Tentar novamente</Button>
        </View>
      ) : (
        <View style={styles.body}>
          <ProfileHeaderCard
            avatarInitials={vm.avatarInitials}
            avatarUrl={vm.avatarUrl}
            email={vm.email}
            isUploadingAvatar={vm.isUploadingAvatar}
            name={vm.name}
            onAvatarPress={vm.openAvatarOptions}
            onEditPress={vm.openMainForm}
          />
          {vm.avatarError ? <Text style={styles.formError}>{vm.avatarError}</Text> : null}

          <ProfileSection title="Dados pessoais">
            <ProfileRow icon="user" label="Nome completo" onPress={() => vm.openFieldForm('name')} value={vm.name} />
            <ProfileRow icon="creditCard" label="CPF" onPress={() => vm.openFieldForm('document')} value={vm.values.document} />
            <ProfileRow icon="calendarDays" label="Data de nascimento" onPress={() => vm.openFieldForm('birthDate')} value={vm.values.birthDate} />
            <ProfileRow icon="phone" label="Telefone" onPress={() => vm.openFieldForm('phone')} value={vm.values.phone} />
          </ProfileSection>

          <ProfileSection title="Saude">
            <ProfileRow icon="shieldCheck" label="Convenio" onPress={() => vm.openFieldForm('healthInsuranceName')} value={vm.values.healthInsuranceName} />
            <ProfileRow icon="creditCard" label="Carteirinha" onPress={() => vm.openFieldForm('healthInsuranceCard')} value={vm.values.healthInsuranceCard} />
            <ProfileRow icon="droplet" label="Tipo sanguineo" onPress={() => vm.openFieldForm('bloodType')} value={vm.values.bloodType} />
            <ProfileRow icon="triangleAlert" label="Alergias" onPress={() => vm.openFieldForm('allergies')} value={vm.values.allergies} />
          </ProfileSection>

          <ProfileSection title="Preferencias">
            <ProfileRow
              icon="bell"
              label="Receber notificacoes"
              rightElement={
                <Switch
                  onValueChange={(value) => vm.updatePreference({ receiveNotifications: value })}
                  value={vm.receiveNotifications}
                />
              }
            />
            <ProfileRow
              icon="calendarDays"
              label="Lembretes de consultas"
              rightElement={
                <Switch
                  onValueChange={(value) => vm.updatePreference({ appointmentReminders: value })}
                  value={vm.appointmentReminders}
                />
              }
            />
          </ProfileSection>

          <ProfileSection title="Seguranca">
            <ProfileRow icon="lock" label="Alterar senha" onPress={vm.openPasswordForm} value="" />
            <ProfileRow icon="shield" label="Privacidade" value="" />
          </ProfileSection>

          {vm.formError ? <Text style={styles.formError}>{vm.formError}</Text> : null}

          <Pressable
            accessibilityRole="button"
            disabled={vm.isLoggingOut}
            onPress={vm.handleLogout}
            style={styles.logoutButton}
          >
            <Icon color={COLORS.accent} name="logOut" size="md" />
            <Text style={styles.logoutText}>
              {vm.isLoggingOut ? 'Saindo...' : 'Sair da conta'}
            </Text>
          </Pressable>
        </View>
      )}

      <Modal animationType="slide" transparent visible={vm.isMainFormVisible}>
        <View style={modalBackdropStyle}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Editar perfil</Text>
            <Input
              editable={!vm.isSaving}
              onChangeText={(name) => vm.setMainForm((form) => ({ ...form, name }))}
              placeholder="Nome completo"
              value={vm.mainForm.name}
            />
            <Input
              autoCapitalize="none"
              editable={!vm.isSaving}
              keyboardType="email-address"
              onChangeText={(email) => vm.setMainForm((form) => ({ ...form, email }))}
              placeholder="E-mail"
              value={vm.mainForm.email}
            />
            <Input
              editable={!vm.isSaving}
              keyboardType="number-pad"
              onChangeText={(document) => vm.setMainForm((form) => ({ ...form, document }))}
              placeholder="CPF"
              value={vm.mainForm.document}
            />
            <Input
              editable={!vm.isSaving}
              keyboardType="number-pad"
              onChangeText={(birthDate) => vm.setMainForm((form) => ({ ...form, birthDate }))}
              placeholder="Data de nascimento"
              value={vm.mainForm.birthDate}
            />
            <Input
              editable={!vm.isSaving}
              keyboardType="phone-pad"
              onChangeText={(phone) => vm.setMainForm((form) => ({ ...form, phone }))}
              placeholder="Telefone"
              value={vm.mainForm.phone}
            />
            {vm.formError ? <Text style={styles.formError}>{vm.formError}</Text> : null}
            <View style={styles.modalActions}>
              <Pressable onPress={vm.closeForms} style={styles.secondaryButton}>
                <Text style={styles.secondaryButtonText}>Cancelar</Text>
              </Pressable>
              <Button disabled={vm.isSaving} onPress={vm.saveMainForm} style={styles.modalButton}>
                {vm.isSaving ? 'Salvando...' : 'Salvar'}
              </Button>
            </View>
          </View>
        </View>
      </Modal>

      <Modal animationType="slide" transparent visible={Boolean(vm.editingField)}>
        <View style={modalBackdropStyle}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>{vm.fieldLabel}</Text>
            <Input
              editable={!vm.isSaving}
              onChangeText={vm.setFieldValue}
              placeholder={vm.fieldLabel}
              value={vm.fieldValue}
            />
            {vm.formError ? <Text style={styles.formError}>{vm.formError}</Text> : null}
            <View style={styles.modalActions}>
              <Pressable onPress={vm.closeForms} style={styles.secondaryButton}>
                <Text style={styles.secondaryButtonText}>Cancelar</Text>
              </Pressable>
              <Button disabled={vm.isSaving} onPress={vm.saveField} style={styles.modalButton}>
                {vm.isSaving ? 'Salvando...' : 'Salvar'}
              </Button>
            </View>
          </View>
        </View>
      </Modal>

      <Modal animationType="slide" transparent visible={vm.isPasswordFormVisible}>
        <View style={modalBackdropStyle}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Alterar senha</Text>
            <Input
              editable={!vm.isSaving}
              onChangeText={vm.setCurrentPassword}
              placeholder="Senha atual"
              secureTextEntry
              value={vm.currentPassword}
            />
            <Input
              editable={!vm.isSaving}
              onChangeText={vm.setNewPassword}
              placeholder="Nova senha"
              secureTextEntry
              value={vm.newPassword}
            />
            <Input
              editable={!vm.isSaving}
              onChangeText={vm.setPasswordConfirmation}
              placeholder="Confirmar nova senha"
              secureTextEntry
              value={vm.passwordConfirmation}
            />
            {vm.formError ? <Text style={styles.formError}>{vm.formError}</Text> : null}
            <View style={styles.modalActions}>
              <Pressable onPress={vm.closeForms} style={styles.secondaryButton}>
                <Text style={styles.secondaryButtonText}>Cancelar</Text>
              </Pressable>
              <Button disabled={vm.isSaving} onPress={vm.savePassword} style={styles.modalButton}>
                {vm.isSaving ? 'Salvando...' : 'Salvar'}
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollScreen>
  )
}

export default ProfileScreen
