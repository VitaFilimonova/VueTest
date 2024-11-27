<template>
  <div id="app">
    <UsersTable />
    <Modal />
  </div>
</template>

<script>
import UsersTable from './components/UsersTable/App.vue'
import Modal from './components/UsersTable/Modal/App.vue'
import './assets/styles/global.css'

export default {
  name: 'App',
  components: {
    UsersTable,
    Modal
  }
}
</script>

<style></style>
