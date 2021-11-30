Page({
  data: {
    artlist:[
      { imag: '/icon/hashmap.jpg', text: "HashMap 是一个用于存储 Key-Value 键值对的集合,每一个键值对也叫做...", id:"1" },
      { imag: '/icon/docker.jpg', text: "Docker基础学习笔记", id:"2" },
      { imag: '/icon/plus.jpg', text: "MyBatisPlus（个人笔记）", id:"3" },
      { imag: '/icon/springboot.jpg', text: "Spring Boot 2.6.0正式发布：默认禁止循环依赖、增强Docker镜像构建...", id:"4"},
      { imag: '/icon/huoqu.jpg', text: "Java如何快速获取网站图片", id:"5"},
      { imag: '/icon/house.jpg', text: "北上广深杭房价高压下，这也许是程序员扎根的唯一出路...", id:"6" },
      { imag: '/icon/code.jpg', text: "C++学习笔记（3）：数组和函数", id:"7" },
      { imag: '/icon/java.jpg', text: "你以为我在玩游戏？其实我在学 Java", id:"8" }
    ]
  },
  gotoPage:function(event){
    var number = event.currentTarget.dataset.id;
    var url = "/pages/arti/arti"+number;
    wx.navigateTo({
      url: url,
    })
  }
})