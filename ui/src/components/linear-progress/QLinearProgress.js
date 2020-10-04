import { h, defineComponent } from 'vue'

import DarkMixin from '../../mixins/dark.js'
import { getSizeMixin } from '../../mixins/size.js'

import { hMergeSlot } from '../../utils/render.js'

function width (val, reverse) {
  return {
    transform: reverse === true
      ? `translateX(100%) scale3d(${-val},1,1)`
      : `scale3d(${val},1,1)`
  }
}

export default defineComponent({
  name: 'QLinearProgress',

  mixins: [
    DarkMixin,
    getSizeMixin({
      xs: 2,
      sm: 4,
      md: 6,
      lg: 10,
      xl: 14
    })
  ],

  props: {
    value: {
      type: Number,
      default: 0
    },
    buffer: Number,

    color: String,
    trackColor: String,

    reverse: Boolean,
    stripe: Boolean,
    indeterminate: Boolean,
    query: Boolean,
    rounded: Boolean,

    instantFeedback: Boolean
  },

  computed: {
    motion () {
      return this.indeterminate === true || this.query === true
    },

    classes () {
      return 'q-linear-progress' +
        (this.color !== void 0 ? ` text-${this.color}` : '') +
        (this.reverse === true || this.query === true ? ' q-linear-progress--reverse' : '') +
        (this.rounded === true ? ' rounded-borders' : '')
    },

    trackStyle () {
      return width(this.buffer !== void 0 ? this.buffer : 1, this.reverse)
    },

    trackClass () {
      return 'q-linear-progress__track absolute-full' +
        ` q-linear-progress__track--with${this.instantFeedback === true ? 'out' : ''}-transition` +
        ` q-linear-progress__track--${this.isDark === true ? 'dark' : 'light'}` +
        (this.trackColor !== void 0 ? ` bg-${this.trackColor}` : '')
    },

    modelStyle () {
      return width(this.motion === true ? 1 : this.value, this.reverse)
    },

    modelClasses () {
      return 'q-linear-progress__model absolute-full' +
        ` q-linear-progress__model--with${this.instantFeedback === true ? 'out' : ''}-transition` +
        ` q-linear-progress__model--${this.motion === true ? 'in' : ''}determinate`
    },

    stripeStyle () {
      return { width: `${this.value * 100}%` }
    }
  },

  render () {
    const child = [
      h('div', {
        class: this.trackClass,
        style: this.trackStyle
      }),

      h('div', {
        class: this.modelClasses,
        style: this.modelStyle
      })
    ]

    this.stripe === true && this.motion === false && child.push(
      h('div', {
        class: 'q-linear-progress__stripe absolute-full',
        style: this.stripeStyle
      })
    )

    return h('div', {
      class: this.classes,
      style: this.sizeStyle,
      role: 'progressbar',
      'aria-valuemin': 0,
      'aria-valuemax': 1,
      'aria-valuenow': this.indeterminate === true
        ? void 0
        : this.value
    }, hMergeSlot(child, this, 'default'))
  }
})
