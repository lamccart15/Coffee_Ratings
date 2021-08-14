


function init(){
    d3.json('/api/methods').then(data => {
    console.log(data)
        var method = data.map(d => d.processing_method)
        console.log(method)
        var count = data.map(d => d.n)
        console.log(count)
        


    var trace1 = {
        x: method,
        y: count,
        marker:{
            color: ['#4B2B0F', '#090B06', '#762807', '#EBA937', '#344718','#895324']
          },
           type: "bar"
      };
     
      var data = [trace1];
     
      var layout = {
       title: "Processing Methods of Coffee Beans",
        xaxis: { title: "Processing Method"},
       yaxis: { title: "Count of Beans Per Processing Method"}
      };
     
Plotly.newPlot("plot", data, layout);

    }); 
}


 init()
