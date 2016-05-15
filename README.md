color-classifier.js
===================

[![Build Status](http://img.shields.io/travis/tsuyoshiwada/color-classifier.svg?style=flat-square)](https://travis-ci.org/tsuyoshiwada/color-classifier)
[![npm version](https://img.shields.io/npm/v/color-classifier.svg?style=flat-square)](http://badge.fury.io/js/color-classifier)
[![David](https://img.shields.io/david/dev/tsuyoshiwada/color-classifier.svg?style=flat-square)](https://david-dm.org/tsuyoshiwada/color-classifier/#info=devDependencies&view=table)
[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://raw.githubusercontent.com/tsuyoshiwada/color-classifier/master/LICENSE)

Classify the color along the reference color. using algorithm the CIEDE2000, RGB, HSV.


## Playground

[![Playground Screenshot](https://raw.githubusercontent.com/tsuyoshiwada/color-classifier/images/playground.png)](http://tsuyoshiwada.github.io/color-classifier/)

[Playground](http://tsuyoshiwada.github.io/color-classifier/)



## INSTALL

```bash
$ npm install color-classifier --save
```

or

Download the [color-classifier.min.js](https://raw.githubusercontent.com/tsuyoshiwada/color-classifier/master/color-classifier.min.js).


## USAGE

The following is the basic usage.

```javascript
import ColorClassifier from "color-classifier"

const palette = ["#fff", "#000"];
const colorClassifier = new ColorClassifier(palette);
const color = colorClassifier.classify("#fefefe");

console.log(color); // {r: 255, g: 255, b: 255}
```

The type of pallet and algorithms have been some available.

```javascript
import ColorClassifier, { Palette, AlgorithmTypes } from "color-classifier"

const colorClassifier = new ColorClassifier(Palette.W3C, AlgorithmTypes.HSV);
const color = colorClassifier.classify("#fefefe");

console.log(color); // {r: 255, g: 255, b: 255}
```

The available values are as follows.

### Palette

The following is the palette list of preset.

#### [Palette.W3C](https://github.com/tsuyoshiwada/color-classifier/blob/master/src/palette/w3c.js)

| hex       | color                                                                                      |
|-----------|--------------------------------------------------------------------------------------------|
| `#000000` | ![](https://raw.githubusercontent.com/tsuyoshiwada/color-classifier/images/hex-000000.png) |
| `#808080` | ![](https://raw.githubusercontent.com/tsuyoshiwada/color-classifier/images/hex-808080.png) |
| `#c0c0c0` | ![](https://raw.githubusercontent.com/tsuyoshiwada/color-classifier/images/hex-c0c0c0.png) |
| `#ffffff` | ![](https://raw.githubusercontent.com/tsuyoshiwada/color-classifier/images/hex-ffffff.png) |
| `#800000` | ![](https://raw.githubusercontent.com/tsuyoshiwada/color-classifier/images/hex-800000.png) |
| `#ff0000` | ![](https://raw.githubusercontent.com/tsuyoshiwada/color-classifier/images/hex-ff0000.png) |
| `#008000` | ![](https://raw.githubusercontent.com/tsuyoshiwada/color-classifier/images/hex-008000.png) |
| `#00ff00` | ![](https://raw.githubusercontent.com/tsuyoshiwada/color-classifier/images/hex-00ff00.png) |
| `#808000` | ![](https://raw.githubusercontent.com/tsuyoshiwada/color-classifier/images/hex-808000.png) |
| `#ffff00` | ![](https://raw.githubusercontent.com/tsuyoshiwada/color-classifier/images/hex-ffff00.png) |
| `#008080` | ![](https://raw.githubusercontent.com/tsuyoshiwada/color-classifier/images/hex-008080.png) |
| `#00ffff` | ![](https://raw.githubusercontent.com/tsuyoshiwada/color-classifier/images/hex-00ffff.png) |
| `#000080` | ![](https://raw.githubusercontent.com/tsuyoshiwada/color-classifier/images/hex-000080.png) |
| `#0000ff` | ![](https://raw.githubusercontent.com/tsuyoshiwada/color-classifier/images/hex-0000ff.png) |
| `#800080` | ![](https://raw.githubusercontent.com/tsuyoshiwada/color-classifier/images/hex-800080.png) |
| `#ff00ff` | ![](https://raw.githubusercontent.com/tsuyoshiwada/color-classifier/images/hex-ff00ff.png) |


#### [Palette.RAINBOW](https://github.com/tsuyoshiwada/color-classifier/blob/master/src/palette/rainbow.js)

| hex       | color                                                                                      |
|-----------|--------------------------------------------------------------------------------------------|
| `#000000` | ![](https://raw.githubusercontent.com/tsuyoshiwada/color-classifier/images/hex-000000.png) |
| `#808080` | ![](https://raw.githubusercontent.com/tsuyoshiwada/color-classifier/images/hex-808080.png) |
| `#ffffff` | ![](https://raw.githubusercontent.com/tsuyoshiwada/color-classifier/images/hex-ffffff.png) |
| `#ff0000` | ![](https://raw.githubusercontent.com/tsuyoshiwada/color-classifier/images/hex-ff0000.png) |
| `#ffa500` | ![](https://raw.githubusercontent.com/tsuyoshiwada/color-classifier/images/hex-ffa500.png) |
| `#ffff00` | ![](https://raw.githubusercontent.com/tsuyoshiwada/color-classifier/images/hex-ffff00.png) |
| `#008000` | ![](https://raw.githubusercontent.com/tsuyoshiwada/color-classifier/images/hex-008000.png) |
| `#00ffff` | ![](https://raw.githubusercontent.com/tsuyoshiwada/color-classifier/images/hex-00ffff.png) |
| `#0000ff` | ![](https://raw.githubusercontent.com/tsuyoshiwada/color-classifier/images/hex-0000ff.png) |
| `#800080` | ![](https://raw.githubusercontent.com/tsuyoshiwada/color-classifier/images/hex-800080.png) |



### AlgorithmTypes

The difference algorithm of color is possible some selection.  
Please try in [Playground](http://tsuyoshiwada.github.io/color-classifier/) for the difference of each algorithm.

| value                      | description                                                                                                                                                                                                                         |
|----------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `AlgorithmTypes.CIEDE2000` | Using the CIE Delta E 2000 Color-Difference algorithm (CIEDE2000).<br>[The CIEDE2000 color-difference formula](http://www.ece.rochester.edu/~gsharma/ciede2000/ciede2000noteCRNA.pdf),<br>[Color difference - Wikipedia, the free encyclopedia](https://en.wikipedia.org/wiki/Color_difference#CIEDE2000) |
| `AlgorithmTypes.HSV`       | Using the HSV color space.<br>[HSL and HSV - Wikipedia, the free encyclopedia](https://en.wikipedia.org/wiki/HSL_and_HSV)                                                                                                                                         |
| `AlgorithmTypes.RGB`       | Using the RGB color space.<br>[RGB color model - Wikipedia, the free encyclopedia](https://en.wikipedia.org/wiki/RGB_color_model)



## API

### new ColorClassifier(palette = Palette.W3C, algorithmType = AlgorithmTypes.CIEDE2000)

**palette**: {Array}  
**algorithmType**: {String}

Palette is specify array in RGB object or HEX string.

**HEX String**:

```javascript
const palette = ["#fff", "#000"];
const colorClassifier = new ColorClassifier(palette);
```

**RGB Object**:

```javascript
const palette = [
  {r: 255, g: 255, b: 255},
  {r: 0,   g: 0,   b: 0}
];
const colorClassifier = new ColorClassifier(palette);
```



### classify(color, format = "rgb")

**color**: {Object || String}  
**format**: {String} ("rgb", "hex", "hsv")

Classifies the specified color along the palette.

```javascript
const color1 = {r: 255, g: 255, b: 255};

console.log(colorClassifier.classify(color1, "rgb")); //{r: 255, g: 255, b: 255}
console.log(colorClassifier.classify(color1, "hex")); //#ffffff
console.log(colorClassifier.classify(color1, "hsv")); //{h: 0, s: 0, v: 100}


const color2 = "#fff";

console.log(colorClassifier.classify(color2, "rgb")); //{r: 255, g: 255, b: 255}
console.log(colorClassifier.classify(color2, "hex")); //#ffffff
console.log(colorClassifier.classify(color2, "hsv")); //{h: 0, s: 0, v: 100}
```



### classifyFromArray(colors, format = "rgb")

**colors**: {Array}  
**format**: {String} ("rgb, "hex", "hsv")

Classifies the specified array of colors along the palette.

```javascript
const colors = ["#fefefe", "#fafafa", "#010101", "#020202"];
const results = colorClassifier.classifyFromArray(colors, "hex");

console.log(results);
// [
//   {
//     palette: "#ffffff",
//     colors: [
//       "#fefefe",
//       "#fafafa"
//     ]
//   },
//   {
//     palette: "#000000",
//     colors: [
//       "#010101",
//       "#020202"
//     ]
//   }
// ]
```


### More APIs

* `setPalette(palette)`
* `getPalette()`
* `setAlgorithmType(algorithmType)`
* `getAlgorithmType()`


## LICENCE

Released under the [MIT Licence](https://raw.githubusercontent.com/tsuyoshiwada/color-classifier/master/LICENSE)



## AUTHOR

[tsuyoshiwada](https://github.com/tsuyoshiwada)



## DEVELOPMENT

Initialization of the project.

```bash
$ cd /your/project/dir
$ git clone https://github.com/tsuyoshiwada/sweet-scroll.git
```

Install some dependencies.

```bash
$ npm install
```

Start the development.
You can access to the http://localhost:3000/.

```bash
$ npm start
```

Run lint and testing.

```bash
$ npm test
```

Generates build file.

```bash
$ npm run build
```


---

Bugs, feature requests and comments are more than welcome in the [issues](https://github.com/tsuyoshiwada/color-classifier/issues)
