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
}
export function buildCharts(data) {
  var timeLapse = [];
  timeStep.forEach(step => {
    const rawData = data[step];
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
  //Manage forecast
  var forecastArray = [];
  var forecastRaw = data["Forecast"];
  forecastType.forEach(type => {
    forecastArray.push({
      dataName: type,
      data: getCoordinates(forecastRaw[type])
    });
  });
  timeLapse.push({
    time: "Forecast",
    charts: forecastArray
  });
}
