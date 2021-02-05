import { axiosHack } from "@/http";
export const chartVisjsService = {
  findAll,
  findById
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

function findById(id) {
  return axiosHack
    .get("/visjsData/" + id)
    .then(res => {
      var data = res.data ? res.data : {};
      //console.log(data);
      return data;
    })
    .catch(err => {
      throw err;
    });
}
