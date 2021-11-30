// pages/show/show.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    list : [ ]
  },
  write:function(){
    wx.navigateTo({
      url: '/pages/test/test',
    })
  },
})