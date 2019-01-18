<template lang="pug">
div
    input(ref='input')
    button(@click='search=$refs.input.value') 搜索
    ul
        li(v-for='i in list') {{i}}
    mongo-search(src='/test' ref='ms' v-model='list' :search='search')
    button(@click='$refs.ms.getNext()') 下一页   
</template>
<script>
export default {
  data() {
    return {
      list: [],
      search: ""
    };
  },
  mounted() {
    this.$refs.ms.getLast();
  }
};
</script>
