<template>
  <div id="control-member-list" class="body">
    <h1>vuejsフォーム</h1>
    <ul>
      <li class="title_list">
        <div class="name">名前</div>
        <div class="workid">ID</div>
        <div class="update_date">日付</div>
        <div class="record_number">選択</div>
        <div class="update_date">複数選択</div>
        <div class="update_date">ラジオボタン</div>
        <div class="update_date">チェックボックス</div>
        <div class="control"></div>
      </li>
      <li v-for="val in orderList('sort')" :key="val.id">
        <div class="name">{{ val.name }}</div>
        <div class="workid">{{ val.work_id }}</div>
        <div class="update_date">{{ val.update_date }}</div>
        <div class="record_number">{{ val.single_select }}</div>
        <div class="update_date">{{ val.multi_selects.toString() }}</div>
        <div class="update_date">{{ val.radio_btn }}</div>
        <div class="update_date">
          <span v-for="c in val.checkboxes">
            <span v-if="c.checked">{{c.label}}</span><br>
          </span>
        </div>
        <div class="control">
          <button @click="editid=val.id">編集</button>
        </div>
      </li>
      <li class="loading" v-if="loading">loading</li>
    </ul>
    <div class="add">
      <button @click="editid=-1">新規追加</button>
      <br><br>
    </div>
    <control-member-modal :editid="editid" @close="editid=null" v-if="editid!=null"></control-member-modal>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import ControlMemberModal from './MemberModal'
  export default {
    name: 'control-member-list',
    data () {
      return {
        loading: true,
        editid: null
      }
    },
    computed: {
      ...mapGetters('member', [
        'orderList'
      ])
    },
    created () {
      // 作成時にメンバーリストを取得
      this.$store.dispatch('member/load').then(() => {
        this.loading = false
        console.log('取得完了/MemberList.vue/created')
      }).catch(e => {
        console.log(e)
      })
    },
    destroyed () {
      this.$store.dispatch('member/destroy')
    },
    components: { ControlMemberModal }
  }
</script>
<style scoped>
  #control-member-list {
    margin: auto;
    max-width: 90%;
  }
  h1 {
    font-family: 'ヒラギノ角ゴ Pro W3';
  }
  .loading {
    display: block;
    background: #666;
    text-align: center;
  }
  ul {
    position: relative;
    overflow: hidden;
    margin: 0;
    padding: 0;
    border: 2px solid #ddd;
    border-radius: 4px;
    list-style: none;
  }
  li {
    display: flex;
    padding: 10px;
    justify-content: space-between;
    align-items: left;
  }
  li:hover {
    background: #ccc;
  }
  li:not(:first-child) {
    border-top: 1px solid #ddd;
  }
  .title_list{
    background:#9acd32;
  }
  .title_list:hover {
    background:#9acd32;
  }
  .name {
    width: 40px;
    flex: 1;
    font-size: 12px;
  }
  .record_number {
    width: 70px;
    font-size: 12px;
  }
  .workid{
    width: 60px;
    font-size: 12px;
  }
  .tooth_formula{
    width: 40px;
    font-size: 11px;
  }
  .diseases{
    width: 240px;
    font-size: 11px;
  }
  .outcome{
    width: 50px;
    font-size: 11px;
  }
  .update_date {
    width: 120px;
    font-size: 12px;
  }
  .control {
    width: 100px;
    text-align: right;
  }
  .add {
    margin-top: 10px;
  }
  .body {
    background: #ccc;
    color: #333;
  }
</style>
