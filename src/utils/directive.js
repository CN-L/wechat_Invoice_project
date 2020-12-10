import Vue from 'vue'
// 下载第三方图片和文件
Vue.directive('down', {
  inserted: (el, binding) => {
    el.style.cssText = 'cursor: pointer;color:write;'
    el.addEventListener('click', () => {
      const link = document.createElement('a')
      const url = binding.value
      // 这里是将url转成blob地址，
      fetch(url).then(res => res.blob()).then(blob => { // 将链接地址字符内容转变成blob地址
        link.href = URL.createObjectURL(blob)
        link.download = ''
        document.body.appendChild(link)
        link.click()
      })
    })
  }
})
