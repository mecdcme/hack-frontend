export const config = {
  style: [
    {
      selector: "node",
      style: {
        label: "data(name)",
        "background-color": "green"
      }
    },
    {
      selector: "edge",
      style: {
        width: 1,
        "curve-style": "bezier",
        "line-color": "blue",
        "target-arrow-shape": "triangle",
        "target-arrow-color": "red"
      }
    },
    {
      selector: "node:selected",
      style: {
        "background-color": "blue"
      }
    },
    {
      selector: "edge:selected",
      style: {
        "line-color": "yellow"
      }
    }
  ],
  layout: {
    animate: true,
    animationDuration: 500,
    animationEasing: undefined,
    name: "grid",
    rows: 1
  }
};
