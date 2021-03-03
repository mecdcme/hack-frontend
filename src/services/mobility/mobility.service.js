import { axiosR } from "@/http";
export const mobilityService = {
  findAll
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
