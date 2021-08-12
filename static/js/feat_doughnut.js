var per = [49.9, 17.4, 14.3, 4.56, 4.39, 3.18, 1.79, 1.64, 1.47, 0.778, 0.382, 0.257]
var imp_fea = ["flavor", "balance", "aftertaste", "body", "aroma", "acidity", "category_two_defects", "category_one_defects", "moisture, uniformity", "sweetness, clean_cup"]

var data = [{
    values: per,
    labels: imp_fea,
    type: "pie",
    hole:.5
}];

var layout = {title: "Features With the Most Importance"};

Plotly.newPlot("doughnut-chart", data, layout);