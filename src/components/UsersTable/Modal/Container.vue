<script>
export default {
  name: 'Container',
  props: {
    isVisible: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    close () {
      this.$emit('close')
    },
    preventScroll () {
      document.body.style.overflow = 'hidden'
    },
    allowScroll () {
      document.body.style.overflow = ''
    }
  },
  watch: {
    isVisible: {
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
  beforeDestroy () {
    this.allowScroll()
  }
}
</script>

<template>
  <div v-if="isVisible">
    <div class="overlay" @click="close" />

    <div class="modal" role="dialog">
      <button
        class="button-close"
        type="button"
        aria-label="Close modal"
        @click="close"
      >
        <img
          class="close-img"
          src="../../../assets/images/close-button.svg"
          alt="close"
        />
      </button>

      <slot />
    </div>
  </div>
</template>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

.modal {
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #feffd2;
  border-radius: 16px;
  max-width: 500px;
  width: 70vw;
  min-width: 300px;
  height: fit-content;
  padding: 40px;
  box-shadow: 0 3px 5px 3px rgba(0, 0, 0, 0.25);
  z-index: 1000;
  gap: 40px;
}

.button-close {
  position: absolute;
  top: 15px;
  right: 10px;
  border: none;
  cursor: pointer;
  font-weight: bold;
  color: black;
  background: transparent;
}

.close-img {
  width: 20px;
  height: 20px;
}
</style>
