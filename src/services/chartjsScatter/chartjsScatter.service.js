import { axiosHack } from "@/http";
export const chartjsScatterService = {
  findAll,
  findByName
};
function findAll() {
  return (
    axiosHack

      //.get("/timelaps/")
      .get("/scatterDemo/")
      .then(res => {
        var data = res.data ? res.data : {};
        //console.log(data);
        return data;
      })
      .catch(err => {
        throw err;
      })
  );
}
function findByName(name) {
  return (
    axiosHack

      //.get("/timelaps?dataname=" + name)
      .get("/scatterDemo?dataname=" + name)
      .then(res => {
        var data = res.data ? res.data : {};
        console.log(data);
        return data;
      })
      .catch(err => {
        throw err;
      })
  );
}
