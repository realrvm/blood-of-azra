import { definePreset } from '@primeng/themes'
// eslint-disable-next-line
import Lara from '@primeng/themes/lara'

export const preset = definePreset(Lara, {
  components: {
    drawer: {
      background: 'var(--font-black)',
      borderColor: 'var(--font-black)',
    },
    inputtext: {
      background: 'var(--font-black)',
      borderColor: 'var(--font-black)',
      focusBorderColor: 'var(--font-black)',
      hoverBorderColor: 'var(--font-black)',
      focusRingShadow: 'none',
      paddingY: '5px',
    },
  },
})
