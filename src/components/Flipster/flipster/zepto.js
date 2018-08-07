import zepto from 'zepto';
import 'zepto/src/fx';
import 'zepto/src/fx_methods';
import 'zepto/src/touch';

// https://gist.github.com/pamelafox/1379704
['width', 'height'].forEach(function(dimension) {
  var Dimension = dimension.replace(/./, function(m) {
    return m[0].toUpperCase();
  });
  zepto.fn['outer' + Dimension] = function(margin) {
    var elem = this;
    if (elem) {
      var size = elem[dimension]();
      var sides = { width: ['left', 'right'], height: ['top', 'bottom'] };
      sides[dimension].forEach(function(side) {
        if (margin) size += parseInt(elem.css('margin-' + side), 10);
      });
      return size;
    } else {
      return null;
    }
  };
});

export default zepto;
