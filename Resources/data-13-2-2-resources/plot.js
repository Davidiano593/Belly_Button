console.log(cityGrowths);

var sortedCities = cityGrowths.sort((a,b) =>
a.Increase_from_2016 - b.Increase_from_2016).reverse(); 

var topFiveCity = sortedCities.slice(0,7);

var topFiveCityNames = topFiveCity.map(city => city.City);
var topFiveCityGrowths = topFiveCity.map(city => parseInt(city.Increase_from_2016));

var trace = {
    x: topFiveCityNames,
    y: topFiveCityGrowths,
    type: "bar"
  };
  var data = [trace];
  var layout = {
    title: "Most Rapidly Growing Cities",
    xaxis: {title: "City" },
    yaxis: {title: "Population Growth, 2016-2017"}
  };
  Plotly.newPlot("bar-plot", data, layout);