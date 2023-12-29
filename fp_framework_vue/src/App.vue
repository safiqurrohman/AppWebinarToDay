<!-- App.vue -->
<template>
  <div>
    <Header v-if="currentRoute.meta.showHeader" />
    <router-view />
    <Footer v-if="currentRoute.meta.showFooter" />
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

export default {
  components: {
    Header,
    Footer,
  },
  computed: {
    currentRoute() {
      return this.$route;
    },
  },
}
</script>

<style scoped>
/* Tambahkan gaya khusus komponen Template di sini jika diperlukan */
</style>
