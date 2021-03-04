export const timeStep = ["T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8", "T9"];
export const chartType = ["tend", "pred_tp", "pred_tp_c"];
export const forecastType = ["tend", "forecast"];

export function getCoordinates(dataArray) {
  const dataMap = [];
  dataArray.forEach((element, index) => {
    dataMap.push({
      x: index,
      y: element
    });
  });
  return dataMap;
}
export function buildCharts(dataR) {
  var timeLapse = [];
  timeStep.forEach(step => {
    const rawData = dataR[step];
    var chartDataArray = [];
    chartType.forEach(type => {
      chartDataArray.push({
        dataName: type,
        data: getCoordinates(rawData[type])
      });
    });
    timeLapse.push({
      time: step,
      charts: chartDataArray
    });
  });
  return timeLapse;
}
