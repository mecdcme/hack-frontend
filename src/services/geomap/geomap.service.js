import { axiosHack } from "@/http";
import { axiosMap } from "@/http";

export const geomapService = {
  findAll,
  findByName
};

function findAll() {
  return axiosHack
    .get("/mondo/")
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
  return axiosMap
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
