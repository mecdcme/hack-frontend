import { axiosHack } from "@/http";
export const graphVisjsService = {
  findAll
};
function findAll(n) {
  return axiosHack
    .get("/visjsData" + n)
    .then(res => {
      var data = res.data ? res.data : {};
      //console.log(data);
      return data;
    })
    .catch(err => {
      throw err;
    });
}
