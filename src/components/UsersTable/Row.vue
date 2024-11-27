<script>
export default {
  name: 'Row',
  props: {
    user: {
      type: Object,
      required: true
    },
    parentOffset: {
      type: Number,
      required: false,
      default: 0
    }
  },
  data () {
    return {
      isExpanded: false
    }
  },
  computed: {
    computedPadding () {
      const offset = this.parentOffset + this.user.level * 25
      return offset === 0 ? '10px' : `${offset}px`
    }
  },
  methods: {
    handleToggle () {
      this.isExpanded = !this.isExpanded
    }
  }
}
</script>

<template>
  <div class="row-container">
    <div
      class="row"
      :class="{ 'row-head': user.subordinates.length > 0 }"
      @click="handleToggle"
    >
      <div class="row-cell name-cell" :style="{ paddingLeft: computedPadding }">
        {{ user.name }}
        <span v-if="user.subordinates.length > 0" class="toggle-indicator">
          {{ isExpanded ? "▲" : "▼" }}
        </span>
      </div>
      <div class="row-cell phone-cell">
        {{ user.phone }}
      </div>
    </div>

    <div v-if="isExpanded">
      <Row
        v-for="sub in user.subordinates"
        :key="sub.id"
        :user="sub"
        :parentOffset="parentOffset + 25"
      />
    </div>
  </div>
</template>

<style scoped>
.row-container {
  display: flex;
  flex-direction: column;
}

.row {
  display: grid;
  grid-template-columns: auto minmax(160px, 1fr);
  align-items: center;
  border: 1px solid black;
  cursor: pointer;
  gap: 10px;
}

.row-cell {
  padding: 10px;
  white-space: nowrap;
  overflow: hidden;
}

.name-cell {
  text-align: left;
}

.phone-cell {
  text-align: right;
}

.row-head {
  background-color: #ff7d29;
  color: white;
}

.toggle-indicator {
  margin-left: 10px;
  font-weight: bold;
  font-size: 12px;
}
</style>
