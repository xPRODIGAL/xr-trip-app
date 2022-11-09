import { onDeactivated, onMounted, onUnmounted, ref } from 'vue';
import { throttle } from 'underscore'


export default function useScroll(reachBottomCB) {
  const scrollListenerHandler = throttle(() => {
    const clientHeight = document.documentElement.clientHeight
    const scrollTop = document.documentElement.scrollTop
    const scrollHeight = document.documentElement.scrollHeight
    // console.log("-------")
    if (clientHeight + scrollTop >= scrollHeight) {
      console.log("滚动到底部了")
      if (reachBottomCB) reachBottomCB()
    }
  },100)
  
  onMounted(() => {
    window.addEventListener("scroll", scrollListenerHandler)
  })
  
  onUnmounted(() => {
    window.removeEventListener("scroll", scrollListenerHandler)
  })
}

