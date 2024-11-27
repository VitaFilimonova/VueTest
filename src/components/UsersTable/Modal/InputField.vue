<script>
export default {
  name: 'InputField',
  props: {
    label: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: true
    },
    error: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: ''
    }
  },
  methods: {
    handleInput (event) {
      this.$emit('input', event.target.value)
    }
  }
}
</script>

<template>
  <div class="input-container">
    <div class="input-field">
      <label class="label">{{ label }}</label>
      <input
        @input="handleInput"
        :value="value"
        class="input"
        :type="type"
        :placeholder="placeholder"
      />
    </div>

    <span v-if="error" class="error-message">{{ error }}</span>
  </div>
</template>

<style scoped>
.input-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.input-field {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
}

.error-message {
  display: flex;
  margin-top: 15px;
  font-size: 12px;
  width: 100%;
  justify-content: end;
  color: red;
}
</style>
