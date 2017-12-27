<template>
  <transition name="modal">
    <div class="modal" @click.self="$emit('close')">
      <div class="body">
        <h1>{{ title }}</h1>
        <button type="submit" style="display:none"></button>
        <transition name="modal">
          <div v-if="error" class="error" @click.self="$store.commit('member/resetError')">{{ error }}</div>
        </transition>
        <dl>
          <dt>名前</dt>
          <dd>
            <input v-model="intarnal.name">
          </dd>
          <dt>ID</dt>
          <dd>
            <input v-model.number="intarnal.work_id" size="10">
          </dd>
          <dt>日付</dt>
          <dd>
            <input type="date" v-model.date="intarnal.update_date" size="14">
          </dd>
          <dt>選択</dt>
          <dd>
            <select v-model.number="intarnal.single_select">
              <option v-for="single in single_select" v-bind:value="single.value">
                {{ single.text }}
              </option>
            </select>
          </dd>
          <dt>複数選択</dt>
          <dd>
            <select multiple v-model="intarnal.multi_selects">
              <option v-for="select_val in multi_selects" v-bind:value="select_val.value">
                {{ select_val.value }}
              </option>
            </select>
          </dd>
           <dt>ラジオボタン</dt>
           <dd>
              <label v-for="r in radioOptions">
                <input type="radio" v-model="intarnal.radio_btn" :value="r.value"/>
                <span class="tex1"> {{ r.label }}</span>
              </label>
           </dd>
           <dt>チェックボックス</dt>
           <dd>
             <label v-for="c in intarnal.checkboxes">
               <input v-model="c.checked" type="checkbox"/>
               <span class="tex1">{{ c.label }}</span>
             </label>
           </dd>
        </dl>
        <br>
        <footer>
          <div class="left">
            <button type="button" @click="$emit('close')">閉じる</button>
          </div>
          <div class="right">
            <button type="button" @click="onSaveMember">保存する</button>
          </div>
        </footer>
      </div>
    </div>
  </transition>
</template>
<script>
  import { mapGetters } from 'vuex'
  import cloneDeep from 'lodash/cloneDeep'
//  import { DateFormatter } from '/utils/format/DateFormatter'
  export default {
    name: 'control-member-modal',
    props: { editid: Number },
    data () {
      var nowDate = new Date()
      var initDate = this.getDateFormat(nowDate)
      return {
        intarnal: {
          id: -1,
          name: '',
          single_select: '',
          work_id: '10',
          record_number: 10,
          radio_btn: '',
          update_date: initDate,
          multi_selects: [],
          checkboxes: [
            { label: 'チェック1', value: 'check1', checked: false },
            { label: 'チェック2', value: 'check2', checked: false },
            { label: 'チェック3', value: 'check3', checked: false }
          ]
        },
        single_select: [
          {text: '選択1', value: '1'},
          {text: '選択2', value: '2'},
          {text: '選択3', value: '3'},
          {text: '選択4', value: '4'},
          {text: '選択5', value: '5'},
          {text: '選択6', value: '6'}
        ],
        multi_selects: [
          {value: '選択1'},
          {value: '選択2'},
          {value: '選択3'},
          {value: '選択4'},
          {value: '選択5'},
          {value: 'その他'}
        ],
        radioOptions: [
          { label: 'ラジオ1', value: '1' },
          { label: 'ラジオ2', value: '2' },
          { label: 'ラジオ3', value: '3' }
        ],
        checkboxes: [
          { label: 'チェック1', value: 'check1', checked: false },
          { label: 'チェック2', value: 'check2', checked: false },
          { label: 'チェック3', value: 'check3', checked: true }
        ]
      }
    },
    computed: {
      title () {
        return this.editid === -1 ? '追加' : '編集'
      },
      ...mapGetters('member', ['findMemberById', 'error'])
    },
    methods: {
      // 保存ボタン＆サブミットで内部データをストアに送る
      onSaveMember () {
        this.$store.dispatch('member/save', this.intarnal).then(() => {
          // 結果にエラーが無ければウィンドウを閉じる
          // エラーがあればメッセージとして表示
          if (!this.error) this.$emit('close')
        })
      },
      getDateFormat (nowDate) {
        var year = this.toTargetDigits(nowDate.getFullYear(), 4)
        var month = this.toTargetDigits(nowDate.getMonth() + 1, 2)
        var day = this.toTargetDigits(nowDate.getDate())
        return year + '-' + month + '-' + day
      },
      toTargetDigits: (num, digits) => {
        num += ''
        while (num.length < digits) {
          num = '0' + num
        }
        return num
      }
    },
    created () {
      if (this.editid > 0) {
        this.intarnal = cloneDeep(this.findMemberById(this.editid))
      }
    }
  }
</script>
<style scoped>
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    justify-content: center;
    align-items: center;
  }
  h1 {
    margin: 0;
    padding: 5px 10px;
    background: #e2f1f3;
    font-size: 14px;
  }
  footer {
    display: flex;
    margin: 0;
    padding: 10px;
    background: #f5f5f5;
    justify-content: space-between;
  }
  dl {
    margin: 0;
  }
  dl::after {
    display: table;
    clear: both;
    content: ' ';
  }
  dt {
    float: left;
    clear: left;
    margin: 0;
    padding: 5px;
    width: 20%;
    font-size: 12px;
  }
  dd {
    float: left;
    margin: 0;
    padding: 5px;
  }
  .error {
    padding: 6px 10px;
    border-radius: 2px;
    background: #ffe4e4;
    color: #d40000;
  }
  .body {
    width: 550px;
    background: #ccc;
    color: #006400
  }
  form {
    padding: 10px;
  }
  .tex1{
    font-size: 12px;
  }
  .modal-enter-active,
  .modal-leave-active {
    transition: opacity 0.4s;
  }
  .modal-enter,
  .modal-leave-to {
    opacity: 0;
  }
  .modal-enter-active .body,
  .modal-leave-active .body {
    transition: opacity 0.3s ease, transform 0.4s ease;
  }
  .modal-enter .body,
  .modal-leave-to .body {
    opacity: 0;
    transform: translateY(-120px);
  }
</style>
