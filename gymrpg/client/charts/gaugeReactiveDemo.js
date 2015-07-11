var chart;
/*
 * Function to draw the gauge
 */
function builtGaugeReactive() {
    
    var data = new Array();
    
    data[0] = 80;
    
    // if(Session.get('reactive') !== undefined)
    // {
    //     data[0] = Session.get('reactive');
    // }

    var x = UserConfigs.findOne({userId: Meteor.userId()});
    data[0] = x.exp;
    
    chart = $('#container-gauge-reactive').highcharts({
        
        chart: {
            type: 'solidgauge'
        },

        title: null,

        pane: {
            center: ['50%', '85%'],
            size: '140%',
            startAngle: -90,
            endAngle: 90,
            background: {
                backgroundColor: '#EEE',
                innerRadius: '60%',
                outerRadius: '100%',
                shape: 'arc'
            }
        },

        tooltip: {
            enabled: false
        },
        
        yAxis: {
            stops: [
                [0.1, '#55BF3B'], // green
                [0.5, '#DDDF0D'], // yellow
                [0.9, '#DF5353'] // red
            ],
            lineWidth: 0,
            minorTickInterval: null,
            tickPixelInterval: 400,
            tickWidth: 0,
            title: {
                y: -70
            },
            labels: {
                y: 16
            },
            min: 0,
            max: 100,
            title: {
                text: 'XP'
            }
        },
        
        plotOptions: {
            solidgauge: {
                dataLabels: {
                    y: 5,
                    borderWidth: 0,
                    useHTML: true
                }
            }
        },
        
        credits: {
            enabled: false
        },

        series: [{
            name: 'XP',
            data: data,
            dataLabels: {
                format: '<div style="text-align:center"><span style="font-size:25px;color:black">{y}</span><br/>' +
                       '<span style="font-size:12px;color:silver">Until Level Up</span></div>'
            },
            tooltip: {
                valueSuffix: ' Until Level Up'
            }
        }]
    });
}


/*
 * Call the function to built the chart when the template is rendered
 */
Template.gaugeReactiveDemo.rendered = function () {
    Tracker.autorun(function () {
       builtGaugeReactive();
    });
}

/*
 * Template events
 */
Template.gaugeReactiveDemo.events = {
    
    'change #reactive': function (event, template) {
        var newValue = $(event.target).val();
        Session.set('reactive', parseInt(newValue));
    },
}

Template.gaugeReactiveDemo.helpers({
    currentConfig: function() {
        var x = UserConfigs.findOne({userId: Meteor.userId()});
        console.log(x.exp);
        return x;
    },
    experienceToLevelUp: function() {
        var x = UserConfigs.findOne({userId: Meteor.userId()});
        console.log(100 - x.exp);
        return 100 - x.exp;
    },

    addXP: function() {
        var x = UserConfigs.findOne({userId: Meteor.userId()});
        x.exp = x.exp + 20;
    }
})