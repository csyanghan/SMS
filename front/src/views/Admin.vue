<template>
  <div>
    <div>
      <h2>{{ checked ? '关闭' : '开启' }}选课系统</h2>
      <a-switch :checked="checked" @change="onChange"/>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'name',
  data() {
    return {
      checked: true
    }
  },
  computed: {
    ...mapGetters(['adminTab'])
  },
  methods: {
    onChange(checked) {
      this.checked = checked;
    }
  },
}
</script>

