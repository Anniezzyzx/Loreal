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
        TweenMax.to(['#product_1'], 5, {
          y: -80
        });
        tl.staggerFrom(['#txt_1'], 1, {
          autoAlpha: 0,
          ease: Cubic.easeOut
        }, 0.5).to('#txt_1', .5, {
          autoAlpha: 0,
          ease: Cubic.easeOut
        }, '+=2').to('#txt_10', .5, {
          autoAlpha: 1,
          ease: Cubic.easeOut
        }).to(['#cta_container'], 1, {
          autoAlpha: 1,
          ease: Cubic.easeOut
        }) // .from(['#txt_3'],.5,{autoAlpha: 0, ease: Cubic.easeOut})
        // .to(['#txt_3'],.5,{autoAlpha: 0, ease: Cubic.easeOut}, '+=1')
        // .from(['#txt_4'],.5,{autoAlpha: 0, ease: Cubic.easeOut})
        // .to(['#txt_4'],.5,{autoAlpha: 0, ease: Cubic.easeOut}, '+=0.5')
        // .from(['#txt_5'],.5,{autoAlpha: 0, ease: Cubic.easeOut})
        // .from(['#txt_6'],.5,{autoAlpha: 0, scale: 0, ease: Cubic.easeOut})
        // .from(['#txt_7'],.5,{autoAlpha: 0, ease: Cubic.easeOut})
        // .to(['#txt_5, #txt_6, #txt_7'],.5,{autoAlpha: 0, ease: Cubic.easeOut}, '+=1')
        // // .to(['#product_1'],.5, {x: 5, y: -7 , scale: 0.75}, '-=0.5')
        // .from(['#txt_8'],.5,{autoAlpha: 0, ease: Cubic.easeOut})
        // .to(['#txt_8'],.5,{autoAlpha: 0, ease: Cubic.easeOut}, '+=0.5')
        // .from(['#txt_9'],.5,{autoAlpha: 0, ease: Cubic.easeOut})
        // .to(['#txt_9'],.5,{autoAlpha: 0, ease: Cubic.easeOut}, '+=0.5')
        // .to(['#product_1'],.5, {x: 9, y: 15 , scale: 0.4}, '-=0.5')
        ;
        console.log(tl.duration());
      } ////////////////////////////////////////////////////// EVENT HANDLERS //////////////////////////////////////////////////////


      function addRollover() {
        dom.ad_content.addEventListener('mouseenter', function () {
          TweenMax.to('#cta_hover', 0.25, {
            autoAlpha: 1
          });
        });
        dom.ad_content.addEventListener('mouseleave', function () {
          TweenMax.to('#cta_hover', 0.25, {
            autoAlpha: 0
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
  }; // tl
  //       .from('#headline', 2, {fontSize: 20})
  //       .to ('#click', 4, {autoalpha: 0})

}());
