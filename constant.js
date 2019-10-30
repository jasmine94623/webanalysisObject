//日期
const week_label = ['10/27','10/28','10/29','10/30','10/31','11/1','11/2'];
const mon_label = ['10/1','10/2','10/3','10/4','10/5','10/6','10/7','10/8','10/9','10/10',
'10/11','10/12','10/13','10/14','10/15','10/16','10/17','10/18','10/19','10/20',
'10/21','10/22','10/23','10/24','10/25','10/26','10/27','10/28','10/29','10/30','10/31'];
function getRandom(min,max){
    return Math.floor(Math.random()*(max-min+1))+min;
};

var sensorDatas = {
    "環境溫度":{
        randomMin:24,
        randomMax:33,
        topVal:26,
        dataOpLabel:'環境溫度',
        opLabel:'溫度 (℃)',
        ana_opTitle:'溫度與高度比較圖',
        opYxesTick:{
            max:40,
            stepSize:5
        },
        time:{
            "上週": {
                genVal:[],
                topVal:[],
                opTitle:'上週環境溫度',
            },
            "上月": {
                genVal:[],
                topVal:[],
                opTitle:'上月環境溫度',
            }
        }
    },
    "環境濕度":{
        randomMin:40,
        randomMax:70,
        topVal:60,
        dataOpLabel:'環境濕度',
        opLabel:'濕度 (%)',
        ana_opTitle:'濕度與高度比較圖',
        opYxesTick:{
            max:100,
            stepSize:10
        },
        time:{
            "上週": {
                genVal:[],
                topVal:[],
                opTitle:'上週環境濕度',
            },
            "上月": {
                genVal:[],
                topVal:[],
                opTitle:'上月環境濕度',
            }
        }
    },
    "土壤濕度":{
        randomMin:10,
        randomMax:50,
        topVal:60,
        dataOpLabel:'土壤濕度',
        opLabel:'濕度 (%)',
        ana_opTitle:'土壤濕度與高度比較圖',
        opYxesTick:{
            max:100,
            stepSize:10
        },
        time:{
            "上週": {
                genVal:[],
                topVal:[],
                opTitle:'上週土壤濕度',
            },
            "上月": {
                genVal:[],
                topVal:[],
                opTitle:'上月土壤濕度',
            }
        }
    },
    "環境亮度":{
        randomMin:400,
        randomMax:900,
        topVal:800,
        dataOpLabel:'環境亮度',
        opLabel:'照度 (lux)',
        ana_opTitle:'亮度與高度比較圖',
        opYxesTick:{
            max:1000,
            stepSize:100
        },
        time:{
            "上週": {
                genVal:[],
                topVal:[],
                opTitle:'上週環境溫度',
            },
            "上月": {
                genVal:[],
                topVal:[],
                opTitle:'上月環境溫度',
            }
        }
    },
    "植物高度":{
        dataOpLabel:'植物高度',
        opLabel:'公分 (cm)',
        opYxesTick:{
            max:30,
            stepSize:5
        },
        time:{
            "上週": {
                genVal:[],
                opTitle:'上週植物高度',
            },
            "上月": {
                genVal:[],
                opTitle:'上月植物高度',
            }
        }
    }
};
var ptrheight = 5;
for( var key in sensorDatas ) {
    if(key == "植物高度"){
        for(i = 0; i < 7;i++){
            if(getRandom(0,10) > 8) ptrheight+=1;
            sensorDatas[key].time["上週"].genVal.push(ptrheight);
            sensorDatas[key].time["上月"].genVal.push(ptrheight);
        }
        for(i = 7; i < 31;i++){
            if(getRandom(0,10) > 8) ptrheight+=1;
            sensorDatas[key].time["上月"].genVal.push(ptrheight);
        }
        console.log(key);
        console.log(sensorDatas[key].time["上週"].genVal);
        console.log(sensorDatas[key].time["上週"].genVal);    
        continue;
    }
    for(i = 0; i < 7;i++){
        sensorDatas[key].time["上週"].genVal.push(getRandom(sensorDatas[key].randomMin, sensorDatas[key].randomMax));
        sensorDatas[key].time["上週"].topVal.push(sensorDatas[key].topVal);
    }
    for(i = 0; i < 31;i++){
        sensorDatas[key].time["上月"].genVal.push(getRandom(sensorDatas[key].randomMin, sensorDatas[key].randomMax));
        sensorDatas[key].time["上月"].topVal.push(sensorDatas[key].topVal);
    }
    console.log(key);
    console.log(sensorDatas[key].time["上週"].genVal);
    console.log(sensorDatas[key].time["上週"].genVal);
}