import { h, defineComponent } from 'vue'

import DarkMixin from '../../mixins/dark.js'

import { hSlot } from '../../utils/render.js'

export const skeletonTypes = [
  'text', 'rect', 'circle',
  'QBtn', 'QBadge', 'QChip', 'QToolbar',
  'QCheckbox', 'QRadio', 'QToggle',
  'QSlider', 'QRange', 'QInput',
  'QAvatar'
]

export const skeletonAnimations = [
  'wave', 'pulse', 'pulse-x', 'pulse-y', 'fade', 'blink', 'none'
]

export default defineComponent({
  name: 'QSkeleton',

  mixins: [ DarkMixin ],

  props: {
    tag: {
      type: String,
      default: 'div'
    },

    type: {
      type: String,
      validator: v => skeletonTypes.includes(v),
      default: 'rect'
    },

    animation: {
      type: String,
      validator: v => skeletonAnimations.includes(v),
      default: 'wave'
    },

    square: Boolean,
    bordered: Boolean,

    size: String,
    width: String,
    height: String
  },

  computed: {
    style () {
      return this.size !== void 0
        ? { width: this.size, height: this.size }
        : { width: this.width, height: this.height }
    },

    classes () {
      return `q-skeleton q-skeleton--${this.isDark === true ? 'dark' : 'light'} q-skeleton--type-${this.type}` +
        (this.animation !== 'none' ? ` q-skeleton--anim q-skeleton--anim-${this.animation}` : '') +
        (this.square === true ? ' q-skeleton--square' : '') +
        (this.bordered === true ? ' q-skeleton--bordered' : '')
    }
  },

  render () {
    return h(this.tag, {
      class: this.classes,
      style: this.style
    }, hSlot(this, 'default'))
  }
})
