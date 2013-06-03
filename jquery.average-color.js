/*global window, document*/

/*
 * Get the average color of an image by painting it to a canvas element
 * and sampling (some of) the pixel color values.
 *
 * A jQuery-wrapped, easier to re-use version of this StackOverflow answer:
 * http://stackoverflow.com/questions/2541481/get-average-color-of-image-via-javascript
 */
(function ($) {

    $.fn.averageColor = function () {
        var blockSize = 5, // only sample every 5 pixels
            defaultRGB = {r: 0, g: 0, b: 0}, // for non-supporting environments
            canvas = document.createElement('canvas'),
            context = canvas.getContext && canvas.getContext('2d'),
            data, width, height,
            i = -4,
            length,
            rgb = {r: 0, g: 0, b: 0},
            count = 0;

        if (!context) {
            return defaultRGB;
        }

        height = canvas.height = this.naturalHeight || this.offsetHeight || this.height;
        width = canvas.width = this.naturalWidth || this.offsetWidth || this.width;

        context.drawImage(this[0], 0, 0);

        try {
            data = context.getImageData(0, 0, width, height);
        } catch (e) {
            // security error, the image was served from a different domain
            return defaultRGB;
        }

        length = data.data.length;

        while ((i += blockSize * 4) < length) {
            count += 1;
            rgb.r += data.data[i];
            rgb.g += data.data[i + 1];
            rgb.b += data.data[i + 2];
        }
        
        // ~~ used to floor values
        rgb.r = ~~(rgb.r / count);
        rgb.g = ~~(rgb.g / count);
        rgb.b = ~~(rgb.b / count);

        return rgb;
    };

    $.fn.averageColorAsString = function () {
        var rgb = this.averageColor();
        return 'rgb(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ')';
    };

}(window.jQuery || window.Zepto));
