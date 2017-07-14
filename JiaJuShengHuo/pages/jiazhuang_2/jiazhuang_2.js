// pages/jiazhuang_2/jiazhuang_2.js

var app = getApp();

// 获取加载HTML字符串的.js文件
var WxParse = require('../../wxParse/wxParse.js');
// 数据请求URL
const requestGlobalDataURL = 'https://m.yidoutang.com/apiv3/community/detailHtml?tid=';

var whole_data = {};
var tid = {};
var main_obj = {};

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cover:'',
    html:'',
    posts:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.tid = options.tid;
    this.requestGlobalDataMethod();
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
  requestGlobalDataMethod:function() {
    app.showLoadingToast('加载中...');
    var that = this;
    var url_str = requestGlobalDataURL + that.tid;
    console.log(url_str);
    wx.request({
      url: requestGlobalDataURL + that.tid,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {
        
        // console.log(res);
        that.whole_data = res.data.data;
        // console.log(that.whole_data);
        that.main_obj = that.whole_data.posts[0];
        
        var article = that.main_obj.message_div;
        //  console.log(article);
        WxParse.wxParse('article', 'html', article, that, 0);
        that.setData({
          cover:that.whole_data.cover,
          html:that.whole_data.html,
          posts:that.whole_data.posts
        });
        app.hideLoadingToast();
      },
    })
  }
})