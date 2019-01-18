# mongo-search
Utils for mongodb search and display

# install
npm i mongo-search

# usage

## vue component

```js
import vue from 'mongo-search/vue'
import Vue from 'vue'
Vue.use(vue)
```
```html
<mongo-search src='/users' v-model='users' :search='search'></mongo-search>
```
###props
```js
{
 src: { type: String, required: true },
    params: { type: Object },
    range: { type: String, default: '' },
    pageSize: { type: Number },
    value: {
        type: Array,
        default: () => []
    },
    desc: {
        type: Boolean,
        default: true
    },
    search: {
        type: String
    }
}
```
###methods
getLast、getNext

## koa middleware

```js
const { MongoClient } = require('mongodb');
const searchM = require('mongo-search')
MongoClient.connect("mongodb://127.0.0.1:27017"), { useNewUrlParser: true }).then(x => {
    let db = x.db('test')
    router.get('/user',async ctx=>ctx.body=await searchM(db.collection('user')))
}
```