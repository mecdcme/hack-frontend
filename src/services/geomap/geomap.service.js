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
/*
function findByName(name) {
  var obj = [];
  var data = {};
  var geojson = {
    licence: "",
    type: "",
    features: []
  };
  for (var i = 0; i < name.length; i++) {
    return axiosMap
      .get("/search?country=" + name[i] + "&polygon_geojson=1&format=geojson")
      .then(res => {
        data = res.data;
        if (i = 0) {
        geojson.licence = data.licence;
        geojson.type = data.type;
        }
        obj.push(data.features);
      });
  }

  geojson.features = obj;
  geojson = JSON.stringify(geojson);
  console.log(data);
  console.log(geojson);

  return geojson;

  /*
  var data = {};
  for (var i = 0; i < name.length; i++) {
    return axiosMap
      .get("/search?country=" + name[i] + "&polygon_geojson=1&format=geojson")
      .then(res => {
        if (i === 0) {
          data = res.data;
        } else {
          data.push(data.features);
        }
      });
  }
  console.log(data);
  return data;
  
}
*/
