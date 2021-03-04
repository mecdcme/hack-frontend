import { axiosR } from "@/http";
export const mobilityService = {
  findAll,
  findByName
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
  //desc-summary-j?region=Italy&subregion=Italy

  const endpoint = "desc-summary-j";

  return axiosR
    .get(
      "/" +
        endpoint +
        "?" +
        "region=" +
        filter.name +
        "&subregion=" +
        filter.name
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
