var app=getApp();
Page({
  data: {
    noteList:[]
  },
  
  onShow:function(){
    this.getConmmunityNoteList();
  },
  
  getConmmunityNoteList: function(){
    let that=this;
    wx.request({
      method: 'POST',
      url: 'http://120.55.41.172:8081/api/v1/note/communityPage', //communityPage
      data:{
        currentPage:1,  //这次填的是页数
        size:50          //这次填的是一页展示几条笔记
      },
      header:{
        "content-type": "application/json",
        "token": app.globalData.token
      },
      success: (res)=> {
        let result = res.data;
        if(result.code == 200) {
          that.setData({
            noteList: result.data
        })
        console.log(result.data)
        }
      }
  })
  },
  openNote:function(e){
    console.log("是否在社区："+e.currentTarget.dataset.isincommunity)
    wx.navigateTo({
      url: '/pages/noteDetail/noteDetail?noteId='+e.currentTarget.dataset.noteid+'&isInCommunity='+e.currentTarget.dataset.isincommunity,
    })
  }
})