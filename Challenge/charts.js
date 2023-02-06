function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
   
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// Deliverable 1: 1. Create the buildChart function.
function buildCharts(sample) {
  // Deliverable 1: 2. Use d3.json to load the samples.json file 
  d3.json("samples.json").then((data) => {
    console.log(data);

    // Deliverable 1: 3. Create a variable that holds the samples array. 
    var samplesArray = data.samples;

    // Deliverable 1: 4. Create a variable that filters the samples for the object with the desired sample number.
    var filtSample = samplesArray.filter(data => data.id == sample);
    //console.log(filtSample);
    // Deliverable 3: 1. Create a variable that filters the metadata array for the object with the desired sample number.
    var filtMetadata = data.metadata.filter(data => data.id == sample);
    //console.log(filtMetadata)
    // Deliverable 1: 5. Create a variable that holds the first sample in the array.
    var firstSample = filtSample[0]; 
    //console.log(firstSample)
    // Deliverable 3: 2. Create a variable that holds the first sample in the metadata array.
    var metaSample = filtMetadata[0];
    // Deliverable 1: 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    var ids = firstSample.otu_ids;
    var labels = firstSample.otu_labels;
    var values = firstSample.sample_values;
    // Deliverable 3: 3. Create a variable that holds the washing frequency.
    var washingFreq = metaSample.wfreq;
    // Deliverable 1: 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order 
    // so the otu_ids with the most bacteria are last. 
    var yticks = ids.slice(0, 10).map(id => "OTU" + id).reverse();
    console.log(yticks);

    // Deliverable 1: 8. Create the trace for the bar chart. 
    var trace = [{
      x: values.slice(0,10).reverse(),
      text: labels.slice(0,10).reverse(),
      type: "bar"
    }];

    // Deliverable 1: 9. Create the layout for the bar chart. 
    var layout = { 
      title: "Top 10 Bacteria Cultures found",
      yaxis: {
        tickmode: "array",
        tickvals: [0,1,2,3,4,5,6,7,8,9],
        ticktext: yticks
      },

    };

    // Deliverable 1: 10. Use Plotly to plot the data with the layout. 
Plotly.newPlot("bar", trace, layout, {responsive: true});
    // Deliverable 2: 1. Create the trace for the bubble chart.
    var trace = [{
      x: ids,
      y: values,
      text: labels,
      mode: 'markers',
      marker: {color: ids,
               size: values,
               colorscale: "Earth"}
    }];

    // Deliverable 2: 2. Create the layout for the bubble chart.
    var layout2 = {
      title: "Bacteria Culture Per Sample",
      xaxis: {title: "OTU ID", automargin: true},
      yaxis: {automargin: true},
      showlegend: false
    };
    // Deliverable 2: 3. Use Plotly to plot the data with the layout.
    Plotly.newPlot("bubble", trace, layout2, {responsive: true});
    // Deliverable 3: 4. Create the trace for the gauge chart.
    var trace3 = [{
                  domain: {x: [0, 1], y: [0,1]},
                  value: washingFreq,
                  title: {text: "Belly Button Washing Frequency"},
                  type: "indicator",
                  mode: "gauge+number",
                  gauge: {axis:{
                                range: [null, 10],
                                tickvals: [0,2,4,6,8,10],
                                ticktext: [0,2,4,6,8,10],
                                tickmode: "array"
                              },
                              bar: {color: "black"},
                              steps: [{range: [0, 2], color: "red"},
                                      {range: [2, 4], color: "orange"},
                                      {range: [6, 8], color: "yellow"},
                                      {range: [8, 10], color: "lime"},
                                      {range: [10, 12], color: "green"}
                                     ]
                
                          }

    }];
    // Deliverable 3: 5. Create the layout for the gauge chart.
    var layout3 = {
                   autosize: true,
                   annotations: [{
                    x: 0.5,
                    y: 0,
                    showarrow: false
                   }]
    };
    // Deliverable 3: 6. Use Plotly to plot the gauge data and layout.

  Plotly.newPlot("gauge", trace3, layout3, {responsive: true})
  });
}