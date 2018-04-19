(function() {
    setInterval(function(){
        // document.getElementById("denyut").innerHTML = Math.floor(Math.random()*99)+40;
        document.getElementById("waktu").innerHTML = (new Date()).toLocaleTimeString('en-ID', { hour12: false });
    }, 1000);
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

    ecgRef.orderByKey().startAt((Math.floor((new Date).getTime()/1000)).toString()).on('child_added', (childSnapshot, prevChildKey) => {
        childSnapshot.val().forEach(signalValue => {
            signalData.unshift(signalValue);
        });
    });

    bpmRef.orderByKey().startAt((Math.floor((new Date).getTime()/1000) - 5).toString()).on('child_added', (childSnapshot, prevChildKey) => {
        var bpm = childSnapshot.val();
        document.getElementById("denyut").innerHTML = bpm;
        if ((bpm < 40) || (bpm > 110)) {
            document.getElementById("denyut").style.color = '#f44336';
            document.getElementById("kondisi").style.color = "#f44336";
            document.getElementById("kondisi").innerHTML = '<h1 class="card-title" style="margin: 0;"><i class="now-ui-icons health_ambulance"></i></h1>';
            document.getElementById("kondisiStatus").innerHTML = '<i class="now-ui-icons ui-1_simple-remove"></i> Meninggal';
        } else {
            document.getElementById("denyut").style.color = '#4caf50';
            document.getElementById("kondisi").style.color = "#4caf50";
            document.getElementById("kondisi").innerHTML = '<h1 class="card-title" style="margin: 0;"><i class="now-ui-icons emoticons_satisfied"></i></h1>';
            document.getElementById("kondisiStatus").innerHTML = '<i class="now-ui-icons ui-2_like"></i> Normal';
        }
    });

    ////////////////////////////////////////////////////////////////////////// setup graph
    var ctx = document.getElementById('myChart').getContext('2d');
    var gradientFill = ctx.createLinearGradient(0, 200, 0, 50);
    gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
    gradientFill.addColorStop(1, "rgba(255, 255, 255, 0.24)");

    var chart = new Chart(ctx, {
        type: 'line',
        data: {
            datasets: [{
                label: "Heart Signal",
                borderColor: "#FFFFFF",
                borderWidth: 2,
                fill: true,
                backgroundColor: gradientFill,
                radius: 0,
                data: []
            }]
        },
        options: {
            layout: {
                padding: {
                    left: 0
                }
            },
            maintainAspectRatio: false,
            legend: {
                display: false
            },
            scales: {
                yAxes: [{
                    display: false
                }],
                xAxes: [{
                    gridLines: {display: false},
                    ticks: {
                        padding: 10,
                        fontColor: "rgba(255,255,255,0.4)",
                        fontStyle: "bold"
                    },
                    type: 'realtime'
                }]
            },
            plugins: {
                streaming: {
                    refresh: 50,
                    duration: 10000,
                    frameRate: 30,
                    delay: 100,
                    onRefresh: function(chart) {
                        chart.data.datasets[0].data.push({
                            x: Date.now(),
                            // y: Math.random()
                            y: signalData.pop()
                        });
                    }
                }
            }
        }
    });
}())