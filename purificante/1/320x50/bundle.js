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
        tl.from(['#txt_1'], .5, {
          top: -40,
          ease: Cubic.easeOut
        }).to('#phone_up', 0.4, {
          rotation: -10,
          repeat: 3,
          yoyo: true,
          ease: Bounce.easeOut
        }, '-=0.5').to('#phone_up_green,#phone_up', 0.4, {
          autoAlpha: 1,
          scale: 1.1,
          repeat: 1,
          yoyo: true,
          ease: Cubic.easeOut,
          force3D: false
        }, '+=0.5').from('#background,#foam,#product_1,#txt_9', 0.3, {
          autoAlpha: 0
        }) // .to('#logo_1',0.1,{autoAlpha:0},'-=0.4')
        .to('#phone_up,#phone_down,#phone_up_green,#txt_1,#rechazar,#aceptar', 0.1, {
          autoAlpha: 0
        }, '-=0.3') // .from('#logo_2',0.1,{autoAlpha:0},'-=0.3')
        .staggerFrom(['#txt_2b', '#txt_2'], .5, {
          top: -40,
          ease: Cubic.easeOut
        }, .10, '+=0.2').staggerTo(['#txt_2b', '#txt_2'], .5, {
          top: 100,
          ease: Cubic.easeIn,
          delay: 2.5
        }, .10).staggerFrom(['#txt_3b', '#txt_3'], .5, {
          top: -40,
          ease: Cubic.easeOut
        }, .10, '+=0.2').staggerTo(['#txt_3b', '#txt_3'], .5, {
          top: 100,
          ease: Cubic.easeIn,
          delay: 2.5
        }, .10).staggerFrom(['#txt_5', '#txt_4'], .5, {
          top: -70,
          ease: Cubic.easeOut
        }, .10, '+=0.2').staggerTo(['#txt_5', '#txt_4'], .5, {
          top: 100,
          ease: Cubic.easeIn,
          delay: 2.5
        }, .10).staggerFrom(['#txt_7', '#txt_6'], .5, {
          top: -70,
          ease: Cubic.easeOut
        }, .10, '+=0.2').staggerTo(['#txt_7', '#txt_6'], .5, {
          top: 100,
          ease: Cubic.easeIn,
          delay: 2.5
        }, .10).staggerFrom(['#txt_8', '#txt_ef'], .5, {
          top: -70,
          ease: Cubic.easeOut
        }, .10, '+=0.2').to('#product_1', 0.1, {
          autoAlpha: 0
        }).from('#product_2', 0.1, {
          autoAlpha: 0
        }).from('#cta', 0.5, {
          autoAlpha: 0
        }, '+=1');
      } ////////////////////////////////////////////////////// EVENT HANDLERS //////////////////////////////////////////////////////


      function addRollover() {
        dom.ad_content.addEventListener('mouseenter', function () {
          TweenMax.to('#cta', 0.5, {
            scale: 1.05
          });
        });
        dom.ad_content.addEventListener('mouseleave', function () {
          TweenMax.to('#cta', 0.5, {
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
