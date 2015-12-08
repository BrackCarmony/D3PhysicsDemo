
console.log("Here I am");


var myImage = new Image(100, 200);
myImage.src = 'http://ih1.redbubble.net/image.11076931.0263/sticker,375x360.png';
//console.log(myImage);

var canvas = document.createElement('canvas');
canvas.width = myImage.width;
canvas.height = myImage.height;
canvas.getContext('2d').drawImage(img,0,0,img.width, img.height);

var pixelData = canvas.getContext('2d').getImageData(100,200, 1, 1).data;
console.log(pixelData);

var width = 500;
var height = 500;

var fill = d3.scale.category10();

var nodes = d3.range(20).map(function(i){
  return {index:i};
});

console.log(nodes);

var force = d3.layout.force()
              .nodes(nodes)
              .size([width, height])
              .charge(-2)
              .on("tick",tick)
              .start();

var svg = d3.select("#chart");

console.log(nodes);

var node = svg.selectAll(".node")
              .data(nodes)
              .enter().append("circle")
              .attr("class", "node")
              .attr("cx", function (d){return d.x;})
              .attr("cy", function (d){return d.y;})
              .attr("r", 2)
              .style("fill", function(d, i){return fill(i % 10);})
              .style("stroke", function(d,i){return d3.rgb(fill(i % 10)).darker(2);})
              .call(force.drag)
              .on("mousedown", function(){d3.event.stopPropagation();});

   svg.style("opacity", 1e-6)
      .transition()
      .duration(1000)
      .style("opacity",1);

    svg.on("mousedown", mousedown);

function tick(e){
  var k = 7 * e.alpha;
  nodes.forEach(function(o,i){
    //console.log(o);
    //console.log(Math.sin(new Date()/1000));
    o.y +=  k * Math.sin(i * Math.PI /10);
    o.x +=  k * Math.cos(i * Math.PI /10);
  });

  node.attr("cx", function (d){return d.x;})
    .attr("cy", function(d) {return d.y;});
}

function mousedown(){
  nodes.forEach(function(o,i){
    o.x += (Math.random()-0.5)*40;
    o.y += (Math.random()-0.5)*40;
  });
  force.resume();
}
