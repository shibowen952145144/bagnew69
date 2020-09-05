$(function() {
        // 1. 获取总体统计数据
        $.ajax({
                type: 'get',
                url: BigNew.data_info,
                success: function(res) {
                    // console.log(res);
                    // 将数据渲染到页面当中
                    $('.spannel_list .scolor00 em').text(res.totalArticle)
                    $('.spannel_list .scolor01 em').text(res.dayArticle)
                    $('.spannel_list .scolor02 em').text(res.totalComment)
                    $('.spannel_list .scolor03 em').text(res.dayComment)
                }
            })
            // 日新增文章数据统计(折线图)
        $.ajax({
                type: 'get',
                url: BigNew.day_article,
                success: function(res) {
                    console.log(res)
                    if (res.code == 200) {
                        loadEchars(res)
                    }
                }
            })
            // 文章分类数据统计(环形图)
        $.ajax({
            type: 'get',
            url: BigNew.article_count,
            success: function(res) {
                console.log(res);
                if (res.code == 200) {
                    loadEchars3(res)
                }
            }
        })

    })
    // 用于渲染环形图
function loadEchars3(obj) {
    // 基于准备好的dom，初始化echarts实例
    var myChart1 = echarts.init(document.getElementById('pie_show'));

    var data1 = [] // 生成分类标题的
    var data2 = [] // 生成环形图的
    for (var i = 0; i < obj.date.length; i++) {
        data1.push(obj.date[i].name)
        data2.push({ value: obj.date[i].articles, name: obj.date[i].name })
    }

    option1 = {
        title: {
            left: 'center',
            text: '分类文章数量比',
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
            orient: 'horizontal',
            x: 'center',
            // data: ['爱生活', '趣美味', '爱旅行', '爱电影', '爱游泳'],
            data: data1,
            top: 30
        },
        color: ['#5885e8', '#13cfd5', '#00ce68', '#ff9565', '#20ff19'],
        series: [{
            name: '分类名称',
            type: 'pie',
            radius: ['30%', '50%'],
            avoidLabelOverlap: false,
            label: {
                emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: '30',
                        fontWeight: 'bold'
                    }
                }
            },
            // data: [
            //     { value: 335, name: '爱生活' },
            //     { value: 310, name: '趣美味' },
            //     { value: 234, name: '爱旅行' },
            //     { value: 135, name: '爱电影' },
            //     { value: 548, name: '爱游泳' }
            // ]
            data: data2 // 在这里添加数据
        }]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart1.setOption(option1);
}