import { axiosR } from "@/http";
export const mobilityService = {
  findAll,
  findByName,
  chartsByName
};
function findAll(classification) {
  return axiosR
    .get("/" + classification)
    .then(res => {
      var data = res.data ? res.data : {};
      //console.log(data);
      return data;
    })
    .catch(err => {
      throw err;
    });
}
function findByName(filter) {
  return axiosR
    .get(
      "/desc-summary?region=" + filter.region + "&subregion=" + filter.subregion
    )
    .then(res => {
      var data = res.data ? res.data : {};
      console.log(data);
      return data;
    })
    .catch(err => {
      throw err;
    });
}

function chartsByName(filter) {
  return axiosR
    .get(
      "/mobility-components?region=" +
        filter.region +
        "&subregion=" +
        filter.subregion
    )
    .then(res => {
      var data = res.data ? res.data : {};
      console.log(data);
      return data;
    })
    .catch(err => {
      throw err;
    });
}
