var util = require('../../utils/utils.js');
var app=getApp();
Page({
  data: {
    isLogin:false,
    noteList:[]
  },
  onShow:function(){
    this.showPersonalNote();
  },
  gotoPage:function(event){
    var number = event.currentTarget.dataset.id;
    var url = "/pages/arti/arti"+number;
    wx.navigateTo({
      url: url,
    })
  },
  
  write:function(){
    wx.navigateTo({
      url: '/pages/test/test',
    })
  },
  showPersonalNote(){
    let that=this;
    wx.request({
      method: 'Get',
      url: 'http://120.55.41.172:8081/api/v1/note/show', //实际应为服务器的地址
      header: {
        "content-type": "application/json",
        "token": app.globalData.token
      },
      success: (res)=> {
        let result = res.data;
        if(result.code == 200) {
          that.setData({
            isLogin:true,
            noteList: result.data
        })
        console.log(result.data)
        }
        else if(result.code==400){
          this.setData({
            isLogin:false
          })
           console.log(result.message)
        }
        
      }
  }
)},
openNote:function(e){
  
  wx.navigateTo({
    url: '/pages/personalNoteDetail/personalNoteDetail?noteId='+e.currentTarget.dataset.noteid,
  })
}
})