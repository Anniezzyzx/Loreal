(function () {
  'use strict';

  // BannerUtils version 3.2.0
  function getBrowser() {
    // desktop browsers as of 2019-10-04
    var browserslist = ['other', 'blink', 'chrome', 'safari', 'opera', 'ie', 'edge', 'firefox'];
    var browser = 0;

    if ('WebkitAppearance' in document.documentElement.style) {
      browser = 1; // chrome/safari/opera/edge/firefox

      if (/google/i.test(window.navigator.vendor)) browser = 2;
      if (/apple/i.test(window.navigator.vendor)) browser = 3;
      if (!!window.opr && !!window.opr.addons || !!window.opera || / OPR\//.test(window.navigator.userAgent)) browser = 4;
    }

    if (
    /*@cc_on!@*/
     !!document.documentMode) browser = 5; // ie 6-11

    if (browser !== 5 && !!window.StyleMedia) browser = 6;
    if (typeof InstallTrigger !== 'undefined' || 'MozAppearance' in document.documentElement.style) browser = 7;
    return browserslist[browser];
  }
  var browser = getBrowser();
  function es5() {
    return parseInt('010', 10) === 10 && function () {
      return !this;
    }() && !!(Date && Date.prototype && Date.prototype.toISOString); // IE10, FF21, CH23, SF6, OP15, iOS7, AN4.4
  }
  var log = {
    // https://bit.ly/32ZIpgo
    traceOn: window.console.log.bind(window.console, '%s'),
    traceOff: function traceOff() {},
    trace: window.console.log.bind(window.console, '%s'),

    set debug(bool) {
      this._debug = bool;
      bool ? this.trace = this.traceOn : this.trace = this.traceOff;
    },

    get debug() {
      return this._debug;
    }

  };
  function domIds(scope) {
    if (scope === void 0) {
      scope = document;
    }

    var all = scope.getElementsByTagName('*');
    var haveIds = {};
    var i = all.length;

    while (i--) {
      if (all[i].id) {
        var safeId = all[i].id.replace(/-|:|\./g, '_');
        haveIds[safeId] = all[i];
      }
    }

    return haveIds;
  }

  var Banner = {
    init: function init() {
      log.debug = true; // set to false before publishing

      var dom = domIds(); ////////////////////////////////////////////////////// ANIMATION //////////////////////////////////////////////////////

      function frameStart() {
        if (es5()) {
          frame0();
        } else {
          dom.backup.classList.add('backup');
        }
      }

      function frame0() {
        var tl = new TimelineMax({
          onComplete: addRollover
        });
        dom.ad_content.classList.remove('invisible');
        tl.staggerFrom(['#txt_1', '#txt_2', '#txt_3'], .5, {
          left: 300,
          ease: Cubic.easeOut
        }, .10, '+=0.2').staggerTo(['#txt_1', '#txt_2', '#txt_3'], .5, {
          left: -600,
          ease: Cubic.easeIn,
          delay: 2.5
        }, .10).to('#product_1', 0.2, {
          autoAlpha: 0
        }).from('#shape,#product_2', 0.2, {
          autoAlpha: 0
        }).from('#frame', 0.5, {
          scale: 0
        }).staggerFrom(['#txt_4', '#txt_5', '#txt_6'], .5, {
          left: 300,
          ease: Cubic.easeOut
        }, .10, '+=0.2').staggerTo(['#txt_4', '#txt_5', '#txt_6'], .5, {
          left: -600,
          ease: Cubic.easeIn,
          delay: 2.5
        }, .10).staggerFrom(['#txt_7', '#txt_8'], .5, {
          left: 300,
          ease: Cubic.easeOut
        }, .10, '+=0.2').staggerTo(['#txt_7', '#txt_8'], .5, {
          left: -600,
          ease: Cubic.easeIn,
          delay: 2.5
        }, .10).to('#frame,#product_2,#shape', 0.2, {
          autoAlpha: 0
        }).from('#product_3', 0.2, {
          autoAlpha: 0
        }).staggerFrom(['#txt_9', '#txt_10', '#txt_11'], .5, {
          left: 300,
          ease: Cubic.easeOut
        }, .10, '+=0.2').staggerTo(['#txt_9', '#txt_10', '#txt_11'], .5, {
          left: -600,
          ease: Cubic.easeIn,
          delay: 2.5
        }, .10).to('#product_3', 0.2, {
          autoAlpha: 0
        }).to('#product_1', 0.01, {
          autoAlpha: 1,
          scale: 0.8,
          y: -13
        }).set(['#txt_1', '#txt_2', '#txt_3'], {
          x: 670
        }).from('#cta', 0.2, {
          autoAlpha: 0
        }, '+=0.7');
      } ////////////////////////////////////////////////////// EVENT HANDLERS //////////////////////////////////////////////////////


      function addRollover() {
        dom.ad_content.addEventListener('mouseenter', function () {
          TweenMax.to('#cta_bg', 0.5, {
            scale: 1.05
          });
        });
        dom.ad_content.addEventListener('mouseleave', function () {
          TweenMax.to('#cta_bg', 0.5, {
            scale: 1
          });
        });
      }

      function adClickThru() {
        dom.ad_content.addEventListener('click', function () {
          window.open(window.clickTag || window.clickTAG);
        });
      } ////////////////////////////////////////////////////// INIT //////////////////////////////////////////////////////


      adClickThru();
      frameStart();
    }
  };

  window.onload = function () {
    window.requestAnimationFrame(Banner.init);
  };

}());
