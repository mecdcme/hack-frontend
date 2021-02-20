import { axiosHack } from "@/http";
export const graphVisjsService = {
  findAll,
  findById
};
function findAll() {
  return axiosHack
    .get("/visjsData/")
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
