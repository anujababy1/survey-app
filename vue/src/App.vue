<template>
  <hello-world></hello-world>
</template>
<script>
import { mapState } from 'vuex'
import HelloWorld from './components/HelloWorld.vue'

export default {
  components: { HelloWorld },
  computed : {
     ...mapState(['user'])
  },
}
</script>
<style scoped>

</style>
