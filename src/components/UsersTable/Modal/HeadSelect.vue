<script>
export default {
  name: 'HeadSelect',
  props: {
    users: {
      type: Array,
      required: true
    },
    value: {
      type: [String, Number, null],
      required: true
    }
  },
  methods: {
    handleChange (event) {
      this.$emit('input', event.target.value)
    }
  }
}
</script>

<template>
  <div class="select">
    <label class="label">Начальник:</label>
    <select
      :value="value"
      class="input"
      :disabled="users.length === 0"
      @change="handleChange"
    >
      <option value={null}>Не выбрано</option>
      <option v-for="(user, index) in users" :key="index" :value="user.id">
        {{ user.name }} , {{ user.phone }}
      </option>
    </select>
  </div>
</template>

<style scoped>
.select {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
}
</style>
