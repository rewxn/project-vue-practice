<template>
  <div>
    <comment-box :id="this.$route.params.id"></comment-box>
  </div>
</template>

<script>
import comment from '../subcomponents/Comment.vue'

export default {
  components: {
    "comment-box": comment 
  }
}
</script>

<style lang="scss" scope>

</style>