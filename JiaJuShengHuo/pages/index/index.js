//index.js
var app = getApp();

// 轮播图URL
var requestCycleIamgesURL = 'https://m.yidoutang.com/apiv3/recommend/homepage3700?page=1';

// 全屋记分类标签URL
var requestSelectLabelSURL = 'https://m.yidoutang.com/apiv3/case/tags';
// 全屋记数据URL
var requestBodyDataURL = 'https://m.yidoutang.com/apiv3/case/list?page=';

var firstData = {};
var banners = [];
var isFirst = true;
var tagsArr = [];

// 当前页面详情
var bodyData = {};
// 页面详情
var pagination = {};
// 标签详情数组
var casesArr = [];

Page({
  data: {
    scrollTop:0,
    indicatorDots:false,
    autoplay:true,
    circular:true,
    interval:3000,
    duration:500,
    // 轮播图对象数组
    bannerURLs:[],
    // 删选标签
    tags:[],
    // 下方子标签数据
    cases:[]
  },

  // 请求轮播图方法
  requestCycleImages: function () {
    app.showLoadingToast('加载中...');
    // 请求轮播图数据
    var that = this;
    // 数据请求内部实现函数
    function bannerDataRequest() {
      wx.request({
        url: requestCycleIamgesURL,
        method: 'GET',
        success: function (res) {
          // console.log(res);
        },
        fail: function (res) { },
        complete: function (res) {
          firstData = res.data;
          banners = firstData.data.banner;
          console.log(res);
          if (isFirst) {
          }
          that.setData({
            bannerURLs: banners,
          });
          // console.log(firstData);
        },
      })
    }
    bannerDataRequest();
  },

  // 数据标签请求
  requestLabels : function (){
    var that = this;
    wx.request({
      url: requestSelectLabelSURL,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {
        console.log(res);
        firstData = res.data;
        that.setData({
          tags: firstData.data.tags
        });
        // 隐藏Toast
        app.hideLoadingToast();
      },
    })
  },
  // 请求数据
  requestBodyData:function (pageNumber) {
    var that = this;
    app.showLoadingToast('加载中...');
    wx.request({
      url: requestBodyDataURL + pageNumber,
      dataType: '',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {
        console.log(res);

        that.bodyData = res.data;
        // console.log(that.bodyData);
        that.pagination = that.bodyData.data.pagination;
        // console.log(that.pagination);
        // casesArr.concat(that.bodyData.data.cases);
        if(isFirst) {
          that.casesArr = that.bodyData.data.cases;
        } else {
          that.casesArr = that.casesArr.concat(that.bodyData.data.cases);
        }
        that.setData({
          cases:that.casesArr
        });
        wx.stopPullDownRefresh();
        app.hideLoadingToast();
      },
    })
  },
  onLoad: function () {
    isFirst = true;
    // 请求轮播图数据
    this.requestCycleImages();
    // 请求筛选标签
    // this.requestLabels();

    // 请求数据
    this.requestBodyData(1);
  },
  // 下拉刷新
  onPullDownRefresh: function () {
    console.log('使用下拉刷新了！！！！');
    isFirst = true;
    this.onLoad();
  },
  // 上啦加载更多
  onReachBottom: function () {
    if (this.pagination.next == this.pagination.last) {
      return;
    }

    this.requestBodyData(this.pagination.next);
    isFirst = false;
    console.log('使用了上拉加载更多');
    console.log(this.casesArr);
  }
})
