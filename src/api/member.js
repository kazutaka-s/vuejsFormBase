import axios from 'axios'
import find from 'lodash/find'
import maxBy from 'lodash/maxBy'
import remove from 'lodash/remove'

const DemoDatabase = [
  {
    'id': 1,
    'single_select': '6',
    'work_id': 222,
    'radio_btn': '3',
    'update_date': '2017-12-24',
    'name': '渡辺',
    'sort': 1,
    'multi_selects': ['選択1', '選択2'],
    'checkboxes': [
      { label: 'チェック1', value: 'check1', checked: true },
      { label: 'チェック2', value: 'check2', checked: true },
      { label: 'チェック3', value: 'check3', checked: true }
    ]
  },
  {
    'id': 2,
    'single_select': '2',
    'work_id': 10,
    'radio_btn': '2',
    'update_date': '2017-12-14',
    'name': '鈴木',
    'sort': 1,
    'multi_selects': ['選択3'],
    'checkboxes': [
      { label: 'チェック1', value: 'check1', checked: true },
      { label: 'チェック2', value: 'check2', checked: false },
      { label: 'チェック3', value: 'check3', checked: true }
    ]
  },
  {
    'id': 3,
    'single_select': '3',
    'work_id': 12,
    'radio_btn': '1',
    'update_date': '2017-12-13',
    'name': '伊藤',
    'sort': 1,
    'multi_selects': ['選択5'],
    'checkboxes': [
      { label: 'チェック1', value: 'check1', checked: true },
      { label: 'チェック2', value: 'check2', checked: false },
      { label: 'チェック3', value: 'check3', checked: true }
    ]
  }
]

let LastId = DemoDatabase.length
const gatewayUrl = ''

const demox = {
  get: (path, arg) => demoTimer().then(() => {
    if (path === '/vue-test/api/member/list') {
      return { data: { status: true, entry: DemoDatabase } }
    } else {
      return { data: { status: true, entry: find(DemoDatabase, o => o.id === arg.id) } }
    }
  }),
  put: (path, arg) => demoTimer().then(() => {
    console.log(arg.item)
    axios({
      method: 'put',
      data: JSON.stringify(arg.item),
      url: gatewayUrl
    })

    return { data: { status: true, entry: arg.item } }
  }),
  post: (path, arg) => demoTimer().then(() => {
    const maxSort = maxBy(DemoDatabase, 'sort')
    const newdata = Object.assign({}, arg.item, {
      // id: ++LastId,
      id: LastId + 1,
      sort: maxSort ? maxSort.sort + 1 : 0,
      name: arg.item.name === '' ? 'noname' : arg.item.name,
      single_select: arg.item.single_select === '' ? 0 : arg.item.single_select,
      work_id: arg.item.work_id === '' ? 0 : arg.item.work_id,
      radio_btn: arg.item.radio_btn === '' ? 0 : arg.item.radio_btn,
      multi_selects: arg.item.multi_selects === '' ? 0 : arg.item.multi_selects,
      checkboxes: arg.item.checkboxes === '' ? 0 : arg.item.checkboxes,
      update_date: arg.item.update_date === '' ? 0 : arg.item.update_date
      // lv: arg.item.lv === '' ? 10 : arg.item.lv
    })
    /*
    axios({
      method: 'post',
      data: JSON.stringify(newdata),
      url: gatewayUrl
    })
    */
    return { data: { status: true, entry: newdata } }
  }),
  delete: (path, arg) => demoTimer().then(() => {
    remove(DemoDatabase, o => o.id === arg.id)
    return { data: { status: true } }
  })
}

// 疑似遅延用タイマー
const demoTimer = () => {
  return new Promise((resolve) => setTimeout(resolve, 500))
}

// 通信成功
const apiSuccess = (response) => {
  if (response.data.status === true) {
    console.log('通信成功 true')
    return Promise.resolve(response.data.entry)
  } else if (response.status === 200) {
    console.log('通信成功　200')
    LastId = response.data.targetTable.length
    return Promise.resolve(response.data.targetTable)
  } else {
    return Promise.reject(new Error('APIによるエラー'))
  }
}

// 通信失敗
const apiError = (error) => Promise.reject(error.message || error || 'ERROR')

/*
GET    /member/list/:p  age   リスト取得 最大10件づつ
POST   /member              新規作成
GET    /member/:id          取得
PUT    /member/:id          更新
DELETE /member/:id          削除
*/
export default {
  getMembers: () =>
    demox.get('/vue-test/api/member/list').then(apiSuccess),
  postMember: (id, item) =>
    demox.post('/vue-test/api/member', { item: item }).then(apiSuccess).catch(apiError),
  getMember: (id) =>
    demox.get(`/vue-test/api/member/${id}`, { id: id }).then(apiSuccess).catch(apiError),
  putMember: (id, item) =>
    demox.put(`/vue-test/api/member/${id}`, { item: item }).then(apiSuccess).catch(apiError),
  deleteMember: (id) =>
    demox.delete(`/vue-test/api/member/${id}`, { id: id }).then(apiSuccess).catch(apiError)
}
