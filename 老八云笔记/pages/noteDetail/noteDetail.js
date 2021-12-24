// pages/noteDetailCommunity.js
var app=getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        currentNoteId:"",
        noteDetail:"",
        isInCommunity:'',
        
        dialogShow:'',
        buttons: [{text: '取消'}, {text: '确认'}],
        isLogin:false,
        notLoginShow:'',
        oneButton:[{text: '返回'}],
        subSuccess:'',
        hasSub:'',
        isEdit:'',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var noteId=options.noteId;
        var isInCommunity=options.isInCommunity;
        console.log(noteId);
        console.log(isInCommunity);
        this.setData({
            currentNoteId:noteId,
            isInCommunity:options.isInCommunity,
           
        })
       
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.getNoteDetail()
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },
    getNoteDetail:function(){
        let that=this;
        wx.request({
            method: 'POST',
            url: 'http://120.55.41.172:8081/api/v1/note/showDetail', //communityPage
            data:{
              noteId:this.data.currentNoteId
            },
            header:{
              "content-type": "application/json",
              "token": app.globalData.token
            },
            success: (res)=> {
              let result = res.data;
              if(result.code == 200) {
                that.setData({
                  noteDetail: result.data
              })
              console.log(result.data)
              }
            }
        })
    },
    openConfirm:function (e) {
      let that=this;
      wx.request({
        url: 'http://120.55.41.172:8081/api/v1/note/verify',
        method: 'get',
        header: {
          'content-type': 'application/json;charset=UTF-8',
          "token": app.globalData.token
        },
        success(res) {
          let result = res.data
          if(result.code == 200) {
              that.setData({
                notLoginShow:false,
                dialogShow: true
              })
          }
          else if(result.code==400){
            that.setData({
              notLoginShow:true
            })
          }
          
        }
      })
      

  },
  tapDialogButton(e) {
    
    console.log(this.data.currentNoteId)
    this.setData({
      dialogShow: false,

    })

    if(e.detail.item.text=='确认'){
      let that=this;
      wx.request({
        url: 'http://120.55.41.172:8081/api/v1/subscription/add',  //120.55.41.172
        method: 'post',
        data: {
          noteId:this.data.currentNoteId
        },
        header: {
          'content-type': 'application/json;charset=UTF-8',
          "token": app.globalData.token
        },
        success(res) {
          let result = res.data
          if(result.code == 200) {
              console.log(result.data)
              that.setData({
                subSuccess:true
              })
          }
          else if(result.code==400){
            that.setData({
              hasSub:true
            })
          }
          
        }
      })
    }
   
    
  },
  tapNotLoginButton:function(e){
    this.setData({
      notLoginShow: false,

    })
  },
  tapSuccessButton:function(){
    this.setData({
      subSuccess:false
    })
  },
  tapHasSubButton:function(){
    this.setData({
      hasSub:false
    })
  }
})