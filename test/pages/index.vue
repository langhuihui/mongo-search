<template lang="pug">
div
    ul
        li(v-for='i in list') {{i}}
    mongo-search(src='/test' ref='ms' v-model='list')
    button(@click='$refs.ms.getNext()') 下一页   
</template>
<script>
export default {
  data() {
    return {
      list: []
    };
  },
  mounted() {
    this.$refs.ms.getLast();
  }
};
</script>
