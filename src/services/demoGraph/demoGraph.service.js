import { axiosHack } from "@/http";
import { axiosGraph } from "@/http";

export const demoGraphService = {
  findAll,
  findByName
};
/*
function findAll() {
  return axiosHack
    .get("/demograph/")
    .then(res => {
      var data = res.data ? res.data : {};
      //console.log(data);
      return data;
    })
    .catch(err => {
      throw err;
    });
},
*/
function findAll() {
  return axiosHack
    .get("/visdata")
    .then(res => {
      var data = res.data ? res.data : {};
      //console.log(data);
      return data;
    })
    .catch(err => {
      throw err;
    });
}

function findByName(name) {
  return axiosGraph
    .get("/search?country=" + name + "&polygon_geojson=1&format=geojson")
    .then(res => {
      var data = res.data ? res.data : {};
      console.log(data);
      return data;
    })
    .catch(err => {
      throw err;
    });
}
