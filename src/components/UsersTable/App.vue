<script>
import { groupUsers, LocalStorageService, sortData } from '../../utils/users'
import Modal from './Modal/App.vue'
import Row from './Row.vue'
import Header from './Header.vue'

export default {
  name: 'UsersTable',
  components: {
    Modal,
    Row,
    Header
  },
  data () {
    return {
      columnsList: [
        { key: 'name', label: 'Имя' },
        { key: 'phone', label: 'Телефон' }
      ],
      isModalVisible: false,
      users: [],
      sort: {
        field: null,
        direction: 1
      }
    }
  },
  mounted () {
    this.users = LocalStorageService.getUsers()
  },
  computed: {
    groupedUsers () {
      const grouped = groupUsers(this.users)

      return sortData(grouped, this.sort.field, this.sort.direction)
    }
  },
  methods: {
    handleShowModal () {
      this.isModalVisible = true
    },
    handleCloseModal () {
      this.isModalVisible = false
      this.users = LocalStorageService.getUsers()
    },
    handleSortUsers (field) {
      console.log(field)
      console.log(this.sort.field)
      if (this.sort.field === field) {
        if (this.sort.direction === 1) {
          this.sort.direction = -1
        } else {
          this.sort.field = null
          this.sort.direction = 1
        }
      } else {
        this.sort.field = field
        this.sort.direction = 1
      }
    }
  }
}
</script>

<template>
  <div class="container">
    <div class="header">
      <h1>Таблица пользователей</h1>
      <button class="button add-button" type="button" @click="handleShowModal">
        Добавить пользователя
      </button>
    </div>

    <div v-if="users.length > 0" class="table">
      <Header :columnsList="columnsList" :sort="sort" @sort="handleSortUsers" />
      <Row v-for="user in groupedUsers" :key="user.id" :user="user" />
    </div>

    <h5 v-else class="description">
      Пока что здесь ничего нет, добавьте пользователей
    </h5>

    <Modal
      v-if="isModalVisible"
      :isVisible="isModalVisible"
      @close="handleCloseModal"
    />
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  padding: 30px 20px;
  height: 100%;
}

.header {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  position: relative;

  @media (max-width: 988px) {
    flex-direction: column;
  }
}

.description {
  font-size: 20px;
  opacity: 0.8;
}

.add-button {
  position: absolute;
  top: 20px;
  right: 20px;

  @media (max-width: 988px) {
    position: static;
  }
}

.table {
  background-color: #ffeea9;
  border-collapse: collapse;
  overflow: auto;
  table-layout: auto;
}
</style>
