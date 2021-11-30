Page({
  submitEvent(event){
    // console.log(event)
  // 获取当前输入框的内容
    let value = event.detail.value.content;
    // 获取前一个页面
    // getCurrentPages()
    // console.log(getCurrentPages())
    let pages = getCurrentPages()
    // 获取前一个页面的list数组
    let lists = pages[0].data.list;
    // 将数据添加到新数组lists
    lists.push(value)
    // console.log(list)
    pages[0].setData({
      // 更新list
      list : lists,
      // value : list
    })
    // 返回上一个页面
    wx.navigateBack({
      url:"/pages/show/show",
    })
    },  
});