// pages/jiazhuang_1/jiazhuang_1.js
// 获取小程序实例
var app = getApp();
// 请求的URL
const requestAllPageDataURL = 'https://m.yidoutang.com/apiv3/community/guide?&type=91%2C92&page=';

// 请求得到的数据
var data = {};

// 下拉刷新数据
var guides_temp = [];
var isFirst = true;

// 页面详情数据
var pagination = {};

Page({

  /**
   * 页面的初始数据
   */
  data: {
    info:{},
    guides:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.requestGlobalData(1);
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
    console.log('显示页面的啦');
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

  /**
   * 请求数据
   */
  requestGlobalData:function (pageNumber) {
    app.showLoadingToast('加载中...');
    var that = this;
    wx.request({
      url: requestAllPageDataURL + pageNumber,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {
        console.log(res);
        that.data = res.data.data;
        that.pagination = that.data.pagination;
        // console.log(that.pagination);
        if(isFirst) {
          that.guides_temp = that.data.guides;
        } else {
          that.guides_temp = that.guides_temp.concat(that.data.guides);
        }
        // console.log(that.data);
        // console.log(that.data);
        // console.log(that.guides_temp);
        // console.log(that.data.guides);
        that.setData({
          info:that.data.info,
          guides: that.guides_temp
        });
        wx.stopPullDownRefresh();
        app.hideLoadingToast();
      },
    })
  },

  /**
   * 下拉刷新
   */
  onPullDownRefresh: function () {
    console.log('使用下拉刷新了！！！！');
    isFirst = true;
    this.onLoad();
  },
  /**
   * 上拉加载更多
   */
  onReachBottom: function () {
    console.log('使用了上拉加载更多啦！！！！！');
    // console.log(this.pagination);
    if (this.pagination.next == this.pagination.last) {
      return;
    } else {
      isFirst = false;
      this.requestGlobalData(this.pagination.next);
    }
  }
})