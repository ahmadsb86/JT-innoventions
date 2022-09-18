let rawValues = "55,33,60,100"
let values = rawValues.split(',')

let at = [29]
let ah = [53]
let ldr = [7]
let sh = [4]

let n = 1


const red = 'rgba(255, 99, 132, 0.8)'
const blue = 'rgba(54, 162, 235, 0.8)'
const yellow = 'rgba(255, 206, 86, 0.8)'
const green = 'rgba(75, 192, 192, 0.8)'

$('#AT').html(values[0])
$('#AH').html(values[1])
$('#LDR').html(values[2])
$('#SH').html(values[3])

$('button').click(function(){
    $('button').removeClass('bg-teal-600')
    $(this).addClass('bg-teal-600')
    $('.chart').addClass('hidden')
    $(`#${$(this).attr('to')}`).removeClass('hidden')
})


// Chart.defaults.global.legend.display = false;
const ctx = document.getElementById('myChart').getContext('2d');
let myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Air Temperature', 'Air Humidity', 'LDR', 'Soil Humidity'],
        datasets: [{
            label: 'Value',
            data: values,
            backgroundColor: [
                red,
                blue,
                yellow,
                green,
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        animation: false,
        scales: {
            xAxes: [{
                gridLines: {
                    color: "rgba(255, 255, 255, 0.2)",
                }
            }],
            yAxes: [{
                gridLines: {
                    color: "rgba(255, 255, 255, 0.2)",
                },
                ticks: {
                    beginAtZero: true,
                    steps: 10,
                    stepValue: 20,
                    max: 100
                }
            }],
            y: {
                beginAtZero: true
            }
        },
        plugins: {
            legend: {
                display: false
            }
        }
    }
});


let ctx2 = document.getElementById('myChart2').getContext('2d');
let myChart2 = new Chart(ctx2, { 
    type: 'line',
    data: {
        labels: Array(n),
        datasets: [
        {
            label: 'Air Temperature',
            data: at,
            fill: false,
            borderColor: red,
            tension: 0.1
        },
        {
            label: 'Air Humidity',
            data: ah,
            fill: false,
            borderColor: blue,
            tension: 0.1
        },
        {
            label: 'LDR',
            data: ldr,
            fill: false,
            borderColor: yellow,
            tension: 0.1
        },
        {
            label: 'Soil Moisture',
            data: sh,
            fill: false,
            borderColor: green,
            tension: 0.1
        },
        ]
    },
    options: {
        animation: false,
        scales: {
            yAxes: [{
                gridLines: {
                    color: "rgba(255, 255, 255, 0.2)",
                }
            }],
            xAxes: [{
                gridLines: {
                    color: "rgba(255, 255, 255, 0.2)",
                },
                ticks: {
                    display: false //this will remove only the label
                }
            }]
        }
    }
});


$.ajaxSetup({
    type: "GET",
    crossDomain: true,
});

setInterval(()=>{

    $.ajax({
        url: 'http://localhost:5000/companies',
        type: 'GET',
    })
    .done(function(data) {
        console.log(data.readings)
        if(compareArrays(data.readings, [0,0,0,0])){
            console.log('nice')
            values = getRandom4Arr()
        }else{
            values = data.readings
        }
        
        at.push(values[0])
    ah.push(values[1])
    ldr.push(values[2])
    sh.push(values[3])

    n++;

    $('#s11').html(values[0])
    $('#s21').html(values[1])
    $('#s31').html(values[2])
    $('#s41').html(values[3])

    $('#s12').html(avrg(at))
    $('#s22').html(avrg(ah))
    $('#s32').html(avrg(ldr))
    $('#s42').html(avrg(sh))

    $('#s13').html(values[0] - avrg(at))
    $('#s23').html(values[1] - avrg(ah))
    $('#s33').html(values[2] - avrg(ldr))
    $('#s43').html(values[3] - avrg(sh))

    $('#s14').html(values[0] - 25)
    $('#s24').html(values[1] - 50)
    $('#s34').html(values[2] - 8)
    $('#s44').html(values[3] - 10)




    msg = "All values in good range"

    if(values[2] < 4) msg = appendMsg('More light needed', msg)
    if(values[0] < 20) msg = appendMsg('Temperature too low', msg)
    if(values[0] > 35) msg = appendMsg('Temperature too high', msg)
    // if(values[3] < 4) msg = appendMsg('Soil Moisture too low', msg)

    $('#overview').removeClass('text-pink-500')
    if(msg != "All values in good range") $('#overview').addClass('text-pink-500')
    $('#overview').html(msg)
    



    myChart2 = new Chart(ctx2, { 
        type: 'line',
        data: {
            labels: Array(n),
            datasets: [
            {
                label: 'Air Temperature',
                data: at,
                fill: false,
                borderColor: red,
                tension: 0.1
            },
            {
                label: 'Air Humidity',
                data: ah,
                fill: false,
                borderColor: blue,
                tension: 0.1
            },
            {
                label: 'LDR',
                data: ldr,
                fill: false,
                borderColor: yellow,
                tension: 0.1
            },
            {
                label: 'Soil Moisture',
                data: sh,
                fill: false,
                borderColor: green,
                tension: 0.1
            },
            ]
        },
        options: {
            animation: false,
            scales: {
                yAxes: [{
                    gridLines: {
                        color: "rgba(255, 255, 255, 0.2)",
                    }
                }],
                xAxes: [{
                    gridLines: {
                        color: "rgba(255, 255, 255, 0.2)",
                    },
                    ticks: {
                        display: false //this will remove only the label
                    }
                }]
            }
        }
    });



    myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Air Temperature', 'Air Humidity', 'LDR', 'Soil Humidity'],
            datasets: [{
                label: 'Value',
                data: values,
                backgroundColor: [
                    red,
                    blue,
                    yellow,
                    green,
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            animation: false,
            scales: {
                xAxes: [{
                    gridLines: {
                        color: "rgba(255, 255, 255, 0.2)",
                    }
                }],
                yAxes: [{
                    gridLines: {
                        color: "rgba(255, 255, 255, 0.2)",
                    },
                    ticks: {
                        beginAtZero: true,
                        steps: 10,
                        stepValue: 20,
                        max: 100
                    }
                }],
                y: {
                    beginAtZero: true
                }
            },
                
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });



    })
    .fail(function(err) {
        console.log('err')
    });
    
    
}, 500)


index = 0;


const raw = `29,53,7,2
29,53,7,5
29,53,7,5
29,53,7,5
29,53,6,6
29,53,6,6
29,53,6,6
29,53,6,6
29,53,6,6
29,53,6,6
29,53,6,6
29,53,4,6
29,53,4,5
29,53,4,2
29,53,4,2
29,53,4,2
29,53,4,2
29,53,4,2
29,53,4,3
29,53,4,3
29,53,4,3
29,53,4,3
29,53,4,3
29,53,4,3
29,53,4,3
29,53,4,3
29,53,4,3
29,53,4,3
29,53,4,3
29,53,4,4
29,53,4,4
29,53,4,4
29,53,4,4
29,53,4,5
29,53,4,5
29,53,4,5
29,53,4,5
29,53,4,5
29,53,4,5
29,53,4,5
29,53,4,5
29,53,5,6
29,53,5,6
29,53,5,6
29,53,5,6
29,53,5,6
29,53,5,6
29,53,5,6
29,53,5,6
29,53,6,10
29,53,4,11
29,53,3,9
29,53,2,7
29,53,2,7
29,53,2,6
29,53,2,7
29,53,3,7
29,53,4,7
29,53,4,7
29,53,5,7
29,53,5,7
29,53,6,7
29,53,6,10
29,53,7,11
29,53,7,11
29,53,7,11
29,53,7,11
29,53,7,11
29,53,7,11
30,52,8,14
30,52,8,13
30,52,8,13
30,52,8,13
18,52,8,14
18,52,8,14
18,52,8,14
18,52,8,14
18,52,8,14
18,52,8,14
18,52,8,14
18,52,8,14
18,52,8,14
18,52,8,14
18,52,8,14
18,52,8,14
30,52,8,16
30,52,8,16
30,52,8,16
30,52,8,16
30,52,8,16
30,52,8,16
30,52,8,16
30,52,8,16
30,52,8,16
30,52,8,16
30,52,8,16
30,52,8,16
30,52,8,16
30,52,8,16
30,52,8,16
30,52,8,16
30,52,8,16
30,52,8,16
30,52,8,16
30,52,8,16
30,52,8,16
30,52,8,16
30,52,8,16
30,52,8,16
30,52,8,16
30,52,8,16
30,52,8,16
30,52,8,16
30,52,8,16
30,52,8,17
`

let inp = raw.split('\n')


function getRandom4Arr(){
    // index++;
    // arr = inp[index%inp.length]
    // for(let i = 0; i<arr.length; i++){
    //     arr[i] = arr[i] + Math.floor((Math.random() - 0.5)*6)
    // }
    // return arr
    index++;
    arr = inp[index%inp.length].split(',').map(Number)
    for(let i = 0; i<arr.length; i++){
        arr[i] += Math.min(Math.floor((Math.random()-0.5)*6), 1)
    }
    console.log(arr)
    return arr
}


function appendMsg(a, b){
    if(b == "All values in good range")
        return a
    return b + ', ' + a
    
}



function avrg(arr){
    let sum = 0
    for(let i = 0; i<arr.length; i++){
        sum += arr[i]
    }
    return Math.floor(sum/arr.length)
}


const compareArrays = (array1, array2) => {
    return (
      array1.length === array2.length && 
      array1.every((el) => array2.includes(el))
    );
  };
  