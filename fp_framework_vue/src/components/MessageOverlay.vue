<!-- MessageOverlay.vue -->
<template>
  <div v-if="isVisible" class="message-overlay">
    <div :class="{ 'text-success': status === 'success', 'text-danger': status === 'error' }">
      {{ message }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    status: String,
    message: String,
  },
  data() {
    return {
      isVisible: false,
    };
  },
  watch: {
    isVisible(value) {
      if (value) {
        // Auto-hide after 5 seconds
        setTimeout(() => {
          this.hideOverlay();
        }, 5000);
      }
    },
  },
  methods: {
    showOverlay() {
      this.isVisible = true;
    },
    hideOverlay() {
      this.isVisible = false;
    },
  },
};
</script>

<style scoped>
/* Add styles for the message overlay */
</style>
