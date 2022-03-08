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
        TweenMax.from('#leaf_1', 2, {
          rotation: -10,
          scale: 1.05,
          ease: Power1.easeInOut,
          yoyoEase: Power1.easeInOut,
          yoyo: true,
          repeat: 6,
          repeatDelay: 0.1
        });
        TweenMax.from('#leaf_2', 2, {
          rotation: -5,
          scale: 1.05,
          transformOrigin: "80% bottom",
          ease: Power1.easeInOut,
          yoyoEase: Power1.easeInOut,
          yoyo: true,
          repeat: 6,
          repeatDelay: 0.1
        });
        TweenMax.to('#leaf_2', 0.7, {
          autoAlpha: 0,
          delay: 2
        });
        TweenMax.to('#leaf_2', 0.5, {
          autoAlpha: 1,
          delay: 9.5
        });
        TweenMax.from('#puntos_frente', 1, {
          scale: 1.05,
          rotation: 5,
          ease: Bounce.easeOut,
          delay: 2.5
        });
        TweenMax.from('#puntos_mejilla', 1, {
          scale: 1.05,
          ease: Bounce.easeOut,
          delay: 3
        });
        TweenMax.from('#puntos_barbilla', 1, {
          scale: 1.05,
          rotation: 5,
          ease: Bounce.easeOut,
          delay: 3.5
        });
        TweenMax.to('#puntos_frente', 0.1, {
          autoAlpha: 0,
          ease: Cubic.easeOut,
          delay: 5.5
        });
        TweenMax.to('#puntos_mejilla', 0.1, {
          autoAlpha: 0,
          ease: Cubic.easeOut,
          delay: 5
        });
        TweenMax.to('#puntos_barbilla', 0.1, {
          autoAlpha: 0,
          ease: Cubic.easeOut,
          delay: 6
        });
        tl.from('#txt_1', 0.1, {
          autoAlpha: 0,
          ease: Cubic.easeOut
        }).to('#product_1', 1, {
          x: 66,
          y: 93,
          scale: 0.8,
          ease: Cubic.easeOut
        }, '+=1.5').staggerFrom(['#she,#puntos_frente,#puntos_mejilla,#puntos_barbilla,#txt_5,#txt_2'], 0.3, {
          autoAlpha: 0,
          ease: Cubic.easeOut
        }, 0.5, '-=0.5').staggerFrom(['#square'], 0.5, {
          scale: 0
        }, 0.5).from('#txt_3', 0.1, {
          autoAlpha: 0,
          ease: Cubic.easeOut
        }).to('#txt_3', 0.1, {
          autoAlpha: 0,
          ease: Cubic.easeOut
        }, '+=3').from('#txt_4', 0.1, {
          autoAlpha: 0,
          ease: Cubic.easeOut
        }).to('#txt_2,#txt_4,#square,#txt_5,#she', 0.3, {
          autoAlpha: 0,
          ease: Cubic.easeOut
        }, '+=3').to('#product_1', 1, {
          x: 0,
          y: 0,
          scale: 1,
          ease: Cubic.easeOut
        }).from('#cta,#cta_txt', 0.1, {
          autoAlpha: 0
        }, '+=0.5');
      } ////////////////////////////////////////////////////// EVENT HANDLERS //////////////////////////////////////////////////////


      function addRollover() {
        dom.ad_content.addEventListener('mouseenter', function () {
          TweenMax.to('#cta_txt', 0.2, {
            x: -5,
            yoyo: true,
            repeat: 1
          });
        });
        dom.ad_content.addEventListener('mouseleave', function () {// Remove this comment
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
