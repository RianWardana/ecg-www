(function() {
     // $('#datetimepicker5').datetimepicker();
     // $('#datetimepicker4').datetimepicker();
    ////////////////////////////////////////////////////////////////////////// setup database
    var config = {
        apiKey: "AIzaSyBJS638LrDtlTwbRC8BZexAA4MUXR9E-hU",
        authDomain: "hart-ecg.firebaseapp.com",
        databaseURL: "https://hart-ecg.firebaseio.com",
        projectId: "hart-ecg",
        storageBucket: "hart-ecg.appspot.com",
        messagingSenderId: "522285262446"
    };
    firebase.initializeApp(config);
    var database = firebase.database();
    var ecgRef = database.ref('ecg');
    var bpmRef = database.ref('bpm');

    var signalData = [];


    ////////////////////////////////////////////////////////////////////////// setup graph
    var ctx = document.getElementById("myChart").getContext('2d');

    var gradientFill = ctx.createLinearGradient(0,0,0,170);
    gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
    gradientFill.addColorStop(1, "rgba(249, 99, 59, 0.10)");

    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            datasets: [{
                label: 'Heart Signal',
                data: [12, 19, 3, 5, 2, 3],
                borderColor: "#f96332",
                borderWidth: 2,
                backgroundColor: gradientFill,
                radius: 0,
                // borderColor: '#1A385B',

            }]
        },
        options: {
            layout:{
                padding:{left:0,right:0,top:15,bottom:15}
            },
            scales: {
                yAxes: [{
                    display:0,
                    gridLines:0,
                    ticks: {
                        display: false
                    },
                    gridLines: {
                        zeroLineColor: "transparent",
                        drawTicks: false,
                        display: false,
                        drawBorder: false
                    }
                }],
                xAxes: [{
                    display: 0,
                    gridLines: 0,
                    ticks: {
                        display: false
                    }
                }]
            },
            legend: {
                display: false
            }
        }
    });
}())