<template>
  <img
    v-if="isActive"
    class="sort-arrow"
    :class="{ rotated }"
    :src="src"
    alt="Sort arrow"
  />
</template>

<script>
import arrowIcon from '../../assets/images/arrow.svg'

export default {
  name: 'SortArrow',
  props: {
    src: {
      type: String,
      default: arrowIcon
    },
    isActive: {
      type: Boolean,
      required: true
    },
    isDescending: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    rotated () {
      return this.isDescending
    }
  }
}
</script>

<style scoped>
.sort-arrow {
  width: 15px;
  height: 15px;
  transition: transform 0.2s;
}

.rotated {
  transform: rotate(180deg);
}
</style>
