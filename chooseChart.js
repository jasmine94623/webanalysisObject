//change sensor
function changeSensor(event){
    var choose4 = event.currentTarget;
    console.log(choose4.innerText);
    if(status[0]=="分析生長狀態" && choose4.innerText=="植物高度")  return;
    if(choose4.innerText == status[4]) return;
    status[4] = choose4.innerText;
    //先處理CSS
    var othchooses = document.querySelectorAll('#sel_sen p');
    for(var othchoose of othchooses){
        if((status[0] == "分析生長狀態") && (othchoose.innerText=="植物高度")) continue;            
        othchoose.style.backgroundColor="#fff";
        othchoose.style.color="black";
    }
    choose4.style.backgroundColor="#59be57";
    choose4.style.color="#fff";

    switch(status[0]){
      case '生長狀態':
        if(status[4]=='植物高度' && myChart.data.datasets.length == 2) myChart.data.datasets.pop();
        if(status[4]!='植物高度' && myChart.data.datasets.length == 1)
            myChart.data.datasets.push({
            type:'line',
            label: '臨界值'+sensorDatas[status[4]].dataLabel,
            yAxisID: 'y-axis-1',
            backgroundColor: '#fc4757',
            borderColor: '#fc4757',
            fill: false,
            data: sensorDatas[status[4]].time[status[3]].topVal,
            pointStyle: 'dash',
            beginAtZero: true,
            });
        myChart.data.datasets[0].data = sensorDatas[status[4]].time[status[3]].genVal;
        console.log(status[4]);
        console.log(sensorDatas[status[4]].time[status[3]].genVal);
        if(status[4]!='植物高度') myChart.data.datasets[1].data = sensorDatas[status[4]].time[status[3]].topVal;
        myChart.options.title.text = sensorDatas[status[4]].time[status[3]].opTitle;
        break;
      case '分析生長狀態':
        myChart.data.datasets[0].data = sensorDatas[status[4]].time[status[3]].genVal;
        myChart.data.datasets[1].data = sensorDatas[status[4]].time[status[3]].topVal;
        myChart.data.datasets[2].data = sensorDatas['植物高度'].time[status[3]].genVal;
        myChart.options.title.text = sensorDatas[status[4]].ana_opTitle;
    }
    myChart.data.datasets[0].label = status[4];
    if(status[4]!='植物高度') myChart.data.datasets[1].label = '臨界值'+status[4];
    myChart.options.scales.yAxes[0].ticks.max = sensorDatas[status[4]].opYxesTick.max;
    myChart.options.scales.yAxes[0].ticks.stepSize = sensorDatas[status[4]].opYxesTick.stepSize;
    console.log(sensorDatas[status[4]].opLabel);
    myChart.options.scales.yAxes[0].scaleLabel.labelString = sensorDatas[status[4]].opLabel;
    console.log(myChart.options.scales.yAxes[0].scaleLabel.labelString);
    myChart.update();
  }
//change time
function changeTime(event){
    var choose3 = event.currentTarget;
    console.log(choose3.innerText);
    if(choose3.innerText == status[3]) return;
    status[3] = choose3.innerText;
    //先處理CSS
    var othchooses = document.querySelectorAll('#sel_time p');
    for(var othchoose of othchooses){
        othchoose.style.backgroundColor="#fff";
        othchoose.style.color="black";
    }
    choose3.style.backgroundColor="#79ADDD";
    choose3.style.color="#fff";

    switch(status[0]){
      case '生長狀態':
        myChart.data.datasets[0].data = sensorDatas[status[4]].time[status[3]].genVal;
        if(status[4]!='植物高度') myChart.data.datasets[1].data = sensorDatas[status[4]].time[status[3]].topVal;
        myChart.options.title.text = sensorDatas[status[4]].time[status[3]].opTitle;
        break;
      case '分析生長狀態':
        myChart.data.datasets[0].data = sensorDatas[status[4]].time[status[3]].genVal;
        myChart.data.datasets[1].data = sensorDatas[status[4]].time[status[3]].topVal;
        myChart.data.datasets[2].data = sensorDatas['植物高度'].time[status[3]].genVal;
        myChart.options.title.text = sensorDatas[status[4]].ana_opTitle;
    }
    if(status[3]=='上月') myChart.data.labels = mon_label;
    else myChart.data.labels = week_label;
    myChart.update();
}
//change anaOrNot
function anaOrNot(event){
    var choose0 = event.currentTarget;
    console.log(choose0.innerText);
    if(choose0.innerText == status[0]) return;
    status[0] = choose0.innerText;
    //處理CSS
    var othchooses = document.querySelectorAll('#charType p');
    for(var othchoose of othchooses){
        othchoose.style.backgroundColor="#fff";
        othchoose.style.color="black";
    }
    choose0.style.backgroundColor="#FF8370";
    choose0.style.color="#fff";
    //分析 必兩個
    if(status[0] =="分析生長狀態"){
        if(status[4] == "植物高度"){
            status[4] == "環境溫度";
            var chooseTemp = document.querySelector('#sel_sen #temp');
            chooseTemp.style.backgroundColor="#59be57";
            chooseTemp.style.color="#fff";
        }
        else{
            var chooseHeig = document.querySelector('#sel_sen #height');
            chooseHeig.style.backgroundColor="#59be57";
            chooseHeig.style.color="#fff";
        }
    }
    else{
        var chooseHeig = document.querySelector('#sel_sen #height');
        chooseHeig.style.backgroundColor="#fff";
        chooseHeig.style.color="black";
    }
    //例外：高度不分析
    if(status[0]=='分析生長狀態' && status[4] == '植物高度'){
    //初始化
      myChart.destroy();
      newChart = new initialChart();
      myChart = new Chart(ctx, newChart);
      status[4] = '環境溫度';
    //判斷時間改data
      if(status[3] == '上月') myChart.data.labels = mon_label;
      else myChart.data.labels = week_label;
      console.log(myChart.data.datasets);
      myChart.data.datasets[0].data = sensorDatas[status[4]].time[status[3]].genVal;
      myChart.data.datasets[1].data = sensorDatas[status[4]].time[status[3]].topVal;
      myChart.data.datasets[2].data = sensorDatas['植物高度'].time[status[3]].genVal;
      myChart.update();
      return;
    }
    switch(status[0]){
      case '生長狀態':
        console.log(myChart);
        myChart.data.datasets.pop();
        if(status[4] == '植物高度') myChart.data.datasets[2].pop();
        myChart.options.title.text = sensorDatas[status[4]].time[status[3]].opTitle;
        myChart.options.scales.yAxes[1].display = false;
        break;
      case '分析生長狀態':
        myChart.data.datasets.push({
        type:'bar',
        label: '植物高度',
        yAxisID: 'y-axis-2',
        backgroundColor: 'green',
        borderColor: 'green',
        fill: false,
        data: sensorDatas['植物高度'].time[status[3]].genVal
        });
        myChart.options.title.text = sensorDatas[status[4]].ana_opTitle;
        myChart.options.scales.yAxes[1].display = true;
    }
    myChart.update();
}
let status = ['分析生長狀態','已採收','1號_小白菜','上週','環境溫度'];

var choose1s = document.querySelectorAll('#charType p');
for(var choose1 of choose1s){
    choose1.addEventListener('click',anaOrNot);
}
var choose3s = document.querySelectorAll('#sel_time p');
for(var choose3 of choose3s){
    choose3.addEventListener('click',changeTime);
}
var choose4s = document.querySelectorAll('#sel_sen p');
for(var choose4 of choose4s){
    choose4.addEventListener('click',changeSensor);
}