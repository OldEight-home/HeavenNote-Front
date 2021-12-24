var app=getApp();
var url='';
Page({
  data: {
    focus: false,
    inputValue: '',
    dialogShow:'',
    buttons: [{text: '私有笔记'}, {text: '公有笔记'}],
    title:'',
    content:'',
    isPublic:'',
    isLogin:false,
    isTextAreaShow:true,
    isEdit:''
  },
  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  onLoad:function(options){
    var isEdit=options.isEdit;
    var content=options.content;
        console.log(isEdit)
        this.setData({
          isEdit:isEdit,
          content:content
        })
  },
  onShow:function(){
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
              isLogin:true
            })
        }
        else{
          that.setData({
            isLogin:false
          })
        }
        
      }
    })
  },
  bindReplaceInput: function (e) {
    var value = e.detail.value
    var pos = e.detail.cursor
    var left
    if (pos !== -1) {
      // 光标在中间
      left = e.detail.value.slice(0, pos)
      // 计算光标的位置
      pos = left.replace(/11/g, '2').length
    }

    // 直接返回对象，可以对输入进行过滤处理，同时可以控制光标的位置
    return {
      value: value.replace(/11/g, '2'),
      cursor: pos
    }

    // 或者直接返回字符串,光标在最后边
    // return value.replace(/11/g,'2'),
  },
  bindHideKeyboard: function (e) {
    if (e.detail.value === '123') {
      // 收起键盘
      wx.hideKeyboard()
    }
  },
  openConfirm:function (e) {
    this.setData({
        dialogShow: true
    })
},
bindClose:function(){
  console.log("xx")
  this.setData({
    isTextAreaShow:true
  })
},
tapDialogButton(e) {
  console.log(e)
  this.setData({
    dialogShow: false,
    showOneButtonDialog: false,
    isTextAreaShow:true
  })
  if(e.detail.item.text=='公有笔记'){
    this.setData({
        isPublic:true
    })
  }
  else if(e.detail.item.text=='私有笔记'){
    this.setData({
      isPublic:false
    })
  }
  console.log(this.data.isPublic)

  if(this.data.isEdit==0){
    url='http://120.55.41.172:8081/api/v1/note/add';
  }
  wx.request({
    url: url,  //120.55.41.172
    method: 'post',
    data: {
      content:this.data.content,
      title:this.data.title,
      isPublic:this.data.isPublic
    },
    header: {
      'content-type': 'application/json;charset=UTF-8',
      "token": app.globalData.token
    },
    success(res) {
      let result = res.data
      if(result.code == 200) {
          console.log(result.message)
      }
      
    }
  })
  wx.switchTab({
    url: '/pages/society/society',
  })
},
  onSubmit:function(e){

    this.setData({
      title:e.detail.value.title,
      content:e.detail.value.content,
      isTextAreaShow:false,
    })
    console.log(this.data.title)
    console.log(this.data.content)
  }
})