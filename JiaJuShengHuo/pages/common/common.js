// pages/common/common.js

// 获取加载HTML字符串的.js文件
var WxParse = require('../../wxParse/wxParse.js');

// 获取小程序实例
var app = getApp();
// 本页数据请求URL
var requestGlobalDataURL ='https://m.yidoutang.com/apiv3/case/detail?id=';

// 本页具体数据
var detail = {};
// 评论数据
var comments = [];
// 匹配数据
var matchs = [];
// 搭配数据
var related = [];

Page({
  /**
   * 页面的初始数据
   */
  data: {
    detailObj:{},
    comments:[],
    matches:[]
  },


// 进行数据请求
  requestGlobalData:function (requestURL) {
    var that = this;
    app.showLoadingToast('加载中...');
    wx.request({
  url:requestURL,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {
       app.hideLoadingToast();
        console.log(res);
         that.detail = res.data;
         console.log(that.detail);
         var article = that.detail.data.case.content;
        //  console.log(article);
         WxParse.wxParse('article', 'html', article, that, 5);
         that.setData({
           detailObj:that.detail.data.case,
           comments: that.detail.data.comments,
           matches: that.detail.data.matches
         })
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
        var requestURL = requestGlobalDataURL + options.id;
        console.log(requestURL);
    this.requestGlobalData(requestURL);
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
  
  }
})