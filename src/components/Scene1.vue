<template>
  <div class="scene1">
    <control-member-list></control-member-list>
  </div>

</template>

<script>
  import ControlMemberList from './Control/MemberList'
  export default {
    name: 'Scene1',
    data () {
      return {}
    },
    components: {
      ControlMemberList
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .scene1{
    font-size: 1.2rem;
    text-align: center;
    a div p{
      display: block;
      margin: 0 auto;
      height:30pt;
    }
  }
</style>
