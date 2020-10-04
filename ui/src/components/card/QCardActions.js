import { h, defineComponent } from 'vue'

import AlignMixin from '../../mixins/align.js'

import { hSlot } from '../../utils/render.js'

export default defineComponent({
  name: 'QCardActions',

  mixins: [ AlignMixin ],

  props: {
    vertical: Boolean
  },

  computed: {
    classes () {
      return 'q-card__actions' +
        ` q-card__actions--${this.vertical === true ? 'vert column' : 'horiz row'}` +
        ` ${this.alignClass}`
    }
  },

  render () {
    return h('div', { class: this.classes }, hSlot(this, 'default'))
  }
})
