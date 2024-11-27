<script>
import { LocalStorageService } from '../../../utils/users'
import { validateName, validatePhone } from '../../../utils/validation'
import InputField from './InputField.vue'
import HeadSelect from './HeadSelect.vue'
import Container from './Container.vue'

export default {
  name: 'Modal',
  components: {
    InputField,
    HeadSelect,
    Container
  },
  props: {
    isVisible: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      name: '',
      phone: '',
      boss: null,

      users: [],

      errors: {
        name: '',
        phone: ''
      }
    }
  },
  methods: {
    handleInput (field, value) {
      if (field === 'name') {
        this.name = value
        this.errors.name = validateName(value)
      } else if (field === 'phone') {
        const sanitizedValue = value.startsWith('+') ? value.slice(1) : value
        const finalValue = sanitizedValue.replace(/[^\d-]/g, '')
        this.errors.phone = validatePhone(value)
        if ((value.startsWith('+') && value === '+') || value === '') {
          this.phone = ''
        } else {
          this.phone = `+${finalValue}`
        }
      }
    },
    handleSaveUser () {
      const newUser = {
        id: this.users.length + 1,
        name: this.name,
        phone: this.phone,
        boss: this.boss
      }
      this.users = LocalStorageService.saveUser(newUser)
      this.resetForm()
    },
    resetForm () {
      this.name = ''
      this.phone = ''
      this.boss = null
      this.errors = { name: '', phone: '' }
    }
  },
  watch: {
    visible: {
      immediate: true,
      handler (newValue) {
        if (newValue) {
          this.preventScroll()
        } else {
          this.allowScroll()
        }
      }
    }
  },
  mounted () {
    this.users = LocalStorageService.getUsers()
  }
}
</script>

<template>
    <Container :isVisible="isVisible" @close="$emit('close')">

      <form class="form">
        <InputField
          @input="(value) => handleInput('name', value)"
          :value="name"
          :error="errors.name"
          label="Имя:"
          placeholder="Введите имя"
        />

        <InputField
          @input="(value) => handleInput('phone', value)"
          :value="phone"
          :error="errors.phone"
          label="Телефон:"
          type="tel"
          placeholder="Введите номер телефона"
        />

        <HeadSelect v-model="boss" :users="users" />
      </form>

      <button
        class="button"
        :disabled="!name || !phone || errors.phone !== '' || errors.name !== ''"
        type="button"
        @click="handleSaveUser"
      >
        Сохранить
      </button>
    </Container>
</template>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 30px;
  flex: 1;
}
</style>
