// pages/kantu_1/kantu_1.js

const requestGlobalDataURL = 'https://m.yidoutang.com/apiv3/case/album?order=3&page=';

// 获取小程序实例
var app = getApp();

var data = {};
var pics = [];
var pagination = {};
var isFirst = true;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pics:[],
    pagination:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 请求图片数据
    this.isFirst = true;
    this.requestImagesData(1);
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
  requestImagesData:function (pageNumber) {
    app.showLoadingToast('加载中...');
    var that = this;
    wx.request({
      url: requestGlobalDataURL + pageNumber,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {
        // console.log(res);
        that.data = res.data.data;
        // console.log(that.data);
        if (that.isFirst) {
          that.pics = that.data.pics;
        } else {
          that.pics = that.pics.concat(that.data.pics);
        }
        that.pagination = that.data.pagination;
        console.log(that.pics);
        // 进行赋值
        that.setData({
          pics:that.pics
        });
        wx.stopPullDownRefresh();
        app.hideLoadingToast();
      },
    })
  },

  // 下拉刷新
  onPullDownRefresh: function () {
    console.log('使用下拉刷新了！！！！');
    this.onLoad();
  },
  // 上啦加载更多
  onReachBottom: function () {
    console.log('触发了上拉加载啦');
    if (this.pagination.next == this.pagination.last) {
      return;
    }
    this.isFirst = false;
    this.requestImagesData(this.pagination.next);
  }
})