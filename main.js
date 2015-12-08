
console.log("Here I am");


var myImage = new Image();


myImage.addEventListener('load', function(){
  console.log("I be here");
  var canvas = document.createElement('canvas');
  canvas.width = myImage.width;
  canvas.height = myImage.height;
  canvas.getContext('2d').drawImage(myImage,0,0,myImage.width, myImage.height);

  var pixelData = canvas.getContext('2d').getImageData(myImage.width/2,myImage.height/2, 1, 1).data;
  console.log(pixelData);

  document.body.appendChild(canvas);


  console.log(myImage);



  var width = myImage.width;
  var height = myImage.height;
  var rows = 10;
  var cols = 10;
  var N = rows*cols;

  var fill = d3.scale.category10();

  var nodes = d3.range(N).map(function(i){
    return {index:i};
  });

  console.log(nodes);

  var turnIndexIntoCords = _.memoize(function(i){

    var x = i%cols;
    var y = Math.floor(i/cols);
    x = x * width/cols;
    y = y * height/rows;
    return {x:x,y:y};
  });

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
                .style("fill", function(d, i){return getPixelAtPoint(turnIndexIntoCords(i));})
                .style("stroke", function(d,i){return d3.rgb(getPixelAtPoint(turnIndexIntoCords(i))).darker(2);})
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
      var point = turnIndexIntoCords(i);

      //o.y +=  k * point.y/height;
      //o.x +=  k * point.x/width;
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

  function getPixelAtPoint(point){
    console.log(point);
    pixelData = canvas.getContext('2d').getImageData(point.x,point.y, 1, 1).data;
    console.log(pixelData);
    return d3.rgb(pixelData[0],pixelData[1],pixelData[2],pixelData[3]);
  }
});
//myImage.src = 'sticker,375X360.png';
myImage.src = "nxedigitalrainbow.jpg";
