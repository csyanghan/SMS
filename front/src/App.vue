<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import api from '@/api';
export default {
  name: 'app',
  mounted() {
    api.getTerms().then(res => {
      const terms = res.data.res;
      this.$store.commit('initTerm', {
        terms,
        nowTerm: terms[terms.length-1]
      });
    });
    if (sessionStorage.getItem('accessToken')) {
      api.login({
        userName: sessionStorage.getItem('accessToken')
      }).then(res => {
        const { role, userInfo } = res.data.res;
        this.$store.commit('setUserInfo', {
          userInfo,
          role
        });
      });
    }
  }
}
</script>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
  height: 100%;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

</style>
