import Vue from 'vue'
// 先に作ったAPIモジュールを使う
import api from '@/api/member'
// lodashの特定のメソッドだけ使う
import orderBy from 'lodash/orderBy'
import findIndex from 'lodash/findIndex'
import find from 'lodash/find'

const member = {
  // ネームスペースを利用する
  namespaced: true,
  state: {
    members: [],
    error: null
  },
  getters: {
    // エラーメッセージを返す
    error: (state) => state.error,
    // メンバーリストを引数の項目でソートして返す
    orderList: (state) => (field) =>
      orderBy(state.members, field, 'asc'),
    // メンバーリストのメンバーIDから配列インデックスを返す
    findIndexById: (state) => (id) =>
      findIndex(state.members, o => o.id === id),
    // メンバーリストのメンバーIDからメンバー内容を返す
    findMemberById: (state) => (id) =>
      find(state.members, o => o.id === id)
  },
  mutations: {
    // メンバーリストを更新
    update (state, payload) {
      const idx = findIndex(state.members, o => o.id === payload.id)
      Vue.set(state.members, idx, payload)
    },
    // メンバーリストをセット
    setList (state, members) {
      state.members = members
    },
    // メンバーリストに追加
    add (state, payload) {
      state.members.push(payload)
    },
    // エラーメッセージをセット
    setError (state, msg) {
      state.error = msg
    },
    // エラーメッセージをリセット
    resetError (state) {
      state.error = null
    },
    // メンバーリストを破棄
    destroy (state) {
      state.members = []
    }
  },
  actions: {
    // 全メンバーを読み込む
    load ({ commit }) {
      return api.getMembers().then(entry => {
        commit('setList', entry)
        console.log('- load getmembers - ')
      })
    },
    // メンバーを保存
    save ({ commit }, member) {
      // IDが-1なら追加
      const type = member.id === -1 ? api.postMember : api.putMember
      return type(member.id, member).then(entry => {
        // サーバー側で成功したらフロント側のデータを更新
        if (member.id === -1) {
          commit('add', entry)
          console.log('- add - ')
          console.log(member)
          console.log(entry)
        } else {
          commit('update', entry)
          console.log('- update - ')
          console.log(entry)
        }
      }).catch(error => {
        // サーバー側で失敗したらエラーをセット
        commit('setError', error)
      })
    }
  }
}
export default member
