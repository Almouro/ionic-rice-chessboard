Ionic rice chessboard
=====================

This started with an algorithm I was asked to code during a code interview.

```
A M*N chessboard is given, with a certain amount of rice on each tile.
Find the best path from the top-left tile to the bottom-right, moving only to the right or bottom, 
to collect the highest amount of rice.
```

After coding the algorithm, I wanted to visualize the path for a given map and decided to implement a visualization tool with <a href="https://angularjs.org/">Angular</a>, <a href="http://ionicframework.com/">Ionic</a>, <a href="http://jade-lang.com/">Jade</a>, <a href="http://sass-lang.com/">Sass</a> (and CSS3 animations).
It was also a great chance to try out <a href="http://facebook.github.io/react/index.html">Facebook's React</a> to improve rendering performance for large doms (when the chessboard is very large).

<a href="http://almouro.github.io/ionic-rice-chessboard/www/index.html">Try it in the browser!</a>

Performance gain for displaying a 200*200 map on my computer was about 40% with ng-react.
I will try to use pure React for the map component (without ng-react) to see if there's an improvement.

But of course, to get optimal performance, the best way would be to load only the visible dom when scrolling.
