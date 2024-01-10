import { resolve } from 'path'

export default {
  base: '/graduation-work-gazuy/',
  build: {
    rollupOptions: {
      input: {
        // @ts-ignore
        main: resolve(__dirname, 'index.html'),
        // @ts-ignore
        puzzle: resolve(__dirname, 'the_tag_puzzle.html')
      }
    }
  }
}