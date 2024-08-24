<template>
    <AuthComponent
      @registrationCompleteEvent="changeTab"
      v-if="currentTab == 'auth-tab'"></AuthComponent>
    <MainComponent 
      @exitEvent="changeTab"
      v-if="currentTab == 'main-tab'"></MainComponent>
    <BannerComponent v-if="currentTab == 'banner'"></BannerComponent>
</template>

<script>
import AuthComponent from '@/components/Auth/AuthComponent.vue';
import MainComponent from '@/components/MainBlock/MainComponent.vue';
import BannerComponent from '@/components/MainBlock/BannerComponent.vue';
import Cookie from './assets/js/cookie.js';
export default {
  name: 'App',
  data() {
    return {
      currentTab: 'main-tab'
    }
  },
  created() {
    const cookie = new Cookie();
    if (!cookie.get('community_id') || !cookie.get('community_type') || !cookie.get('community_value')) {
      this.currentTab = 'auth-tab'
    }
    if (window.innerWidth > 500) {
      this.currentTab = 'banner'
      let appEl = document.getElementById('app')
      if (this.currentTab == 'banner') {
        appEl.style.backgroundImage = 'none'
      } else {
        appEl.style.backgroundImage = "url('/src/assets/img/screen2.jpeg')"
      }
    }
  },
  methods: {
    changeTab(data) {
      this.currentTab = data;
    }
  },
  components: {
    AuthComponent, MainComponent, BannerComponent
  }
}
</script>

<style>
@import url('/src/assets/css/index.css');
#app {
  background: url('/src/assets/img/screen2.jpeg') no-repeat center center;
  background-size: cover;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  display: flex;
  flex-direction: column;
}
</style>
