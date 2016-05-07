(function() {
  "use strict";
  var sampleColors = [];
  var colorLength = 1000;

  for (var i = 0; i < colorLength; i++) {
    sampleColors.push("#" + Math.floor(Math.random() * 16777215).toString(16));
  }


  document.addEventListener("DOMContentLoaded", function() {
    var $head = document.getElementById("colors-head");
    var $body = document.getElementById("colors-body");
    var headFragment = document.createDocumentFragment();
    var bodyFragment = document.createDocumentFragment();

    var colorClassify = new ColorClassify(ColorClassify.base16Colors);
    var colors = colorClassify.exec(sampleColors);


    ColorClassify.base16Colors.forEach(function(color) {
      var $th = document.createElement("th");
      var $td = document.createElement("td");

      $th.style.backgroundColor = color;
      $td.id = "body-" + color.substr(1);

      headFragment.appendChild($th);
      bodyFragment.appendChild($td);
    });


    Object.keys(colors).forEach(function(color) {
      var colorResults = colors[color];
      var $td = bodyFragment.getElementById("body-" + color.substr(1));

      colorResults.forEach(function(c) {
        var $span = document.createElement("span");
        $span.style.backgroundColor = c;

        $td.appendChild($span);
      });
    });


    $head.appendChild(headFragment);
    $body.appendChild(bodyFragment);

    // console.log(colors);
  }, false);
}());
