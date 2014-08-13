# RandomUserWall

A jQuery Plugin to build a wall of random user faces.

[Demo on CodePen](http://codepen.io/mike-zarandona/full/GkmCb)

<br />



## Getting Started

### Requirements

[jQuery](http://jquery.com/)

+ Include jQuery
+ Include `jquery.randomuserwall.js`
+ Call RandomUserWall on a target object
```javascript
$('.target').randomUserWall({ numFaces: 24 });
```

<br />



## Options

**numFaces** (_required, int_)
Defines how many faces will be generated

**gender** (_optional, string_)
Defines the gender of the returned set of faces.  **`female`** will return all women, **`male`** will return all men, any other value will result in a mix.

**imgSize** (_optional, string_)
Sets the size of the images returned.  **`thumb`** will return thumbnail size (80x80), **`med`** will return medium size (150x150), any other value will return full size (512x512).

<br />



## Thanks

Thanks to the guys over at [RandomUser.me](http://randomuser.me) for their hard work, as well as Greg at the [1000 faces project](https://www.flickr.com/photos/gregpc/) for the awesome images.

<br />



## Changelog

### v1.0.0
Initial release.

<br />



## Author

[Mike Zarandona](http://mikezarandona.com) | [@mikezarandona](http://twitter.com/mikezarandona)
