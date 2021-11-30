Page({
  data: {
      friends: [{
          id: 1,
          name: "老八",
          photo: "/../icon/eight.jpeg",
          group: 1
      }, {
          id: 2,
          name: "小八",
          photo: "/../icon/eight.jpeg",
          group: 1
      }, {
          id: 3,
          name: "栋妹",
          photo: "/../icon/dong.jpg",
          group: 2
      }, {
          id: 4,
          name: "超人",
          photo: "/../icon/superman.jpg",
          group: 3
      }, {
          id: 5,
          name: "奥特曼", 
          photo: "/../icon/aoteman.webp",
          group: 3
      }, {
          id: 6,
          name: "帅仔",
          photo: "/../icon/aoteman1.jpg",
          group: 3
      }
      ],
      groups: [{
          id: 1,
          name: "代码大佬",
          hidden: true,
          count: 2
      }, {
          id: 2,
          name: "零栋",
          hidden: true,
          count: 1
      }, {
          id: 3,
          name: "划水怪",
          hidden: true,
          count: 3
      }],
      expanded: false,
  },
  groupclick: function (e) {
      var id = e.currentTarget.id, groups = this.data.groups;
      for (var i = 0, len = groups.length; i < len; ++i) {
          if (groups[i].id == id) {
              groups[i].hidden = !groups[i].hidden;
          }
      }
      this.setData({
          groups: groups
      });
  }
})