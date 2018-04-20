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

    document.getElementById("terapkan").onclick = function() {
        document.getElementById("elektrokardiogram").style.display = "block";
        document.getElementById("cardBpm").style.display = "block";
        document.getElementById("cardKondisi").style.display = "block";
        var a = 15000; //untuk 5 menit
        while (a>0) {
            var random = Math.floor(Math.random()*99);
            myChart.data.labels.push(Date.now());
            myChart.data.datasets[0].data.push(random);
            a--;
        }
        myChart.update(0);
    }




    ////////////////////////////////////////////////////////////////////////// setup graph
    var ctx = document.getElementById("myChart").getContext('2d');

    var gradientFill = ctx.createLinearGradient(0,0,0,200);
    gradientFill.addColorStop(0, "rgba(241, 241, 241, 0)");
    gradientFill.addColorStop(1, "rgba(22, 160, 133, 0.10)");

    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                data: [],
                borderColor: "#16a085",
                borderWidth: 2,
                backgroundColor: gradientFill,
                radius: 0
            }]
        },
        options: {
            layout:{
                padding:{left:0,right:0,top:0,bottom:0}
            },
            maintainAspectRatio: false,
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