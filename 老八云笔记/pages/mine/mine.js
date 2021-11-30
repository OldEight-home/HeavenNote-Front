var app=getApp()
Page({
  data: {
    //canIUse: wx.canIUse('button.open-type.getUserProfile')
    canIUseGetUserProfile: false,
    userInfo: {},
    hasUserInfo: false,
    avatarUrl: '/icon/defaultAvatar.jpg'
  },

  onLoad: function () {
    let that = this;
    if (wx.getUserProfile) {
      that.setData({
        canIUseGetUserProfile: true
      })
    }
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        that.setData({
          userInfo: JSON.parse(res.data),
          hasUserInfo: true
        })
      }
    })
  },

  handleAuth(e) {
    if (this.data.hasUserInfo) {
      this.logout(e)
    } else {
      this.wxLogin(e)
    }
  },

  wxGetUserProfile: function () {
    return new Promise((resolve, reject) => {
      wx.getUserProfile({
        lang: 'zh_CN',
        desc: '用户登录',
        success: (res) => {
          resolve(res)
        },
        // 失败回调
        fail: (err) => {
          reject(err)
        }
      })
    })
  },

  wxSilentLogin: function () {
    return new Promise((resolve, reject) => {
      wx.login({
        success(res) {
          console.log(res.code)
          resolve(res.code)
        },
        fail(err) {
          reject(err)
        }
      })
    })
  },

  wxLogin: function (e) {
    let that = this
    let p1 = this.wxSilentLogin()
    let p2 = this.wxGetUserProfile()
    p1.then(code => {
      return new Promise((resolve, reject) => {
        p2.then(res => {
          console.log(res)
          that.setData({
            userInfo: res.userInfo,
            avatarUrl: res.userInfo.avatarUrl,
            hasUserInfo: true
          })
          wx.setStorageSync("userInfo", JSON.stringify(res.userInfo))
          resolve({
            code,
            iv: res.iv,
            encryptedData: res.encryptedData
          })
        }).catch(err => {
          reject(err)
        })
      })
    }).then(res => {
      // 请求服务器
      wx.request({
        url: 'http://120.55.41.172:8081/api/v1/wx/session',
        method: 'post',
        data: {
          code: res.code,
          encrypted_data: res.encryptedData,
          iv: res.iv
        },
        header: {
          'content-type': 'application/json;charset=UTF-8'
        },
        success(res) {
          let result = res.data
          if(result.code == 200) {
            console.log("token:"+result.data.token)
            app.globalData.token = result.data.token
          }
        }
      })
    }).catch((err) => {
      console.log(err)
    })
  },

  logout(e) {
    this.setData({
      hasUserInfo: false,
      userInfo: {}
    })
    wx.removeStorage({
      key: 'userInfo',
    })
  },



  
  data: {
    navState: 0,//导航状态
  },
  //监听滑块
  bindchange(e) {
    // console.log(e.detail.current)
    let index = e.detail.current;
    this.setData({
      navState:index
    })
  },
  //点击导航
  navSwitch: function(e) {
    // console.log(e.currentTarget.dataset.index)
    let index = e.currentTarget.dataset.index;
    this.setData({
      navState:index
    })
  },

  data:{
    dialogShow: false,
    buttons: [{text: '签到了'}/*, {text: '确定'}*/],
  },
  openConfirm:function () {
        this.setData({
            dialogShow: true
        })
    },
  tapDialogButton(e) {
      console.log(e)
  this.setData({
      dialogShow: false,
      showOneButtonDialog: false
    })
  },
})
