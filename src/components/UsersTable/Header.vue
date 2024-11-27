<script>
import SortArrow from './SortArrow.vue'

export default {
  name: 'Header',
  components: { SortArrow },
  props: {
    columnsList: {
      type: Array,
      required: true
    },
    sort: {
      type: Object,
      required: true
    }
  }
}
</script>

<template>
  <div class="table-header">
    <div
      v-for="column in columnsList"
      :key="column.key"
      class="header-cell"
      :class="{ active: sort.field === column.key }"
      @click="$emit('sort', column.key)"
    >
      {{ column.label }}
      <SortArrow
        :isActive="sort.field === column.key"
        :isDescending="sort.direction === -1"
      />
    </div>
  </div>
</template>

<style scoped>
.table-header {
  display: flex;
}

.header-cell {
  padding: 8px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  border: 1px solid black;

  &:first-child {
    border-right: 1px solid black;
  }

  &:hover {
    background-color: #feffd2;
  }
}

.header-cell.active {
  background-color: #ff7d29;
}
</style>
