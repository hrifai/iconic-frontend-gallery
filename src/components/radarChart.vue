<template>
  <div class="radarChart"></div>
</template>

<script>
import axios from "axios";
import { RadarChart } from "./radarChart.js";

export default {
  mounted() {
    var margin = { top: 100, right: 100, bottom: 100, left: 100 },
      width = Math.min(630, window.innerWidth - 10) - margin.left - margin.right,
      height = Math.min(width, window.innerHeight - margin.top - margin.bottom - 20);

    var color = d3.scale
      .ordinal()
      .range([
        "#EDC951",
        "#51ed53",
        "#5178ed",
        "#ed659c",
        "#CC333F",
        "#00A0B0"
      ]);

    var radarChartOptions = {
      w: width,
      h: height,
      margin: margin,
      maxValue: 0.5,
      wrapWidth: 60,
      levels: 5,
      legendPosition: {x: 20, y: 525},
      roundStrokes: true,
      color: color,
      axisName: "reason",
      areaName: "Maturity State",
      value: "value"
    };

    var vm = this;

    axios.get(
        "http://ec2-54-252-185-149.ap-southeast-2.compute.amazonaws.com:7555/selectResults/" +
          window.v.orgId
      )
      .then(response => {

        var isData = false;

        for(var i=0;i<response.data.length;i++){
          if(response.data[i].length !== 0){
            isData = true;
            break;
          }
        }

        console.log(isData);

        if(isData){
          console.log('Data');
          document.getElementsByClassName("noDataNote")[0].style.display = 'none';
          RadarChart(".radarChart", response.data, radarChartOptions)
        var elements = document.getElementsByClassName("radarArea");


        while (elements[0]) {
          elements[0].parentNode.removeChild(elements[0]);
        }
      } else {
          console.log('noData');
          // var node = document.createElement("H1");
          // var textnode = document.createTextNode("No data available, you are the first one completing this questionnaire.");         // Create a text node
          // node.appendChild(textnode);
          // document.getElementsByClassName("noDataNote")[0].removeChild(node).appendChild(node)
          document.getElementsByClassName("noDataNote")[0].style.display = 'block';
    }})
  },
  data(){
    return {
      // componentKey: null
    }
  }
};
</script>

<style scoped>
#holder {
  overflow: hidden;
}

.piechart {
  border: 1px solid black;
}
</style>
