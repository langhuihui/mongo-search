export default {
    install(Vue, opt) {
        Vue.component('mongo-search', {
            render(h) {
                if (typeof this.$scopedSlots.default == 'function')
                    return this.$scopedSlots.default(this.value)
                else h()
            },
            props: {
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
            },
            watch: {
                range(v) {
                    this.$axios.$get(this.src, this.createParams()).then(x => this.addDatas(x))
                },
                src(v) {
                    this.$axios.$get(v).then(x => this.addDatas(x))
                }
            },
            computed: {
                first() {
                    return this.value[0]
                },
                last() {
                    return this.value.length ? this.value[this.value.length - 1] : null
                }
            },
            methods: {
                createParams(args) {
                    const { pageSize, range } = this
                    return { params: { pageSize, range, ...args, ...this.params } }
                },
                addDatas(datas) {
                    if (this.desc) this.value.unshift.apply(this.value, datas)
                    else this.value.push.apply(this.value, datas)
                },
                getData() {
                    this.$axios.$get(this.src).then(x => this.addDatas(x))
                },
                changeValue(v) {
                    this.$emit('input', v)
                },
                getMore(next) {
                    const firstOrLast = ['last', 'first'][this.desc ^ next]
                    const beforeOrAfter = next ? 'before' : 'after'
                    if (this[firstOrLast]) {
                        this.$axios.$get(this.src, this.createParams({ [beforeOrAfter]: this[firstOrLast]._id })).then(x => this.addDatas(x))
                    } else {
                        this.getData()
                    }
                },
                getNext() {
                    this.getMore(true)
                },
                getLast() {
                    this.getMore(false)
                }
            }
        })
    }
}