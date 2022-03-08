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
        tl.add("start").staggerFrom(['#txt_1,#she'], 1, {
          autoAlpha: 0,
          ease: Cubic.easeInOut
        }, 0.5, "start").from('#product_1', 1, {
          y: -100,
          ease: Cubic.easeInOut
        }, "start").from('#product_2', 1, {
          y: 100,
          ease: Cubic.easeInOut
        }, "start") //.from('#she',1,{height:0, y:450,ease: Cubic.easeInOut},"start")
        .from(['#txt_2'], 1, {
          autoAlpha: 0,
          ease: Cubic.easeInOut
        }, "-=0.5").to('#txt_1', 0.5, {
          autoAlpha: 0
        }, "+=1").to('#rectangle', 1, {
          x: "-=200",
          ease: Cubic.easeOut
        }, "-=0.5").from('#txt_3', 1, {
          autoAlpha: 0
        }).to('#txt_3', 0.5, {
          autoAlpha: 0
        }, "+=1").staggerFrom(['#txt_4,#txt_5'], 1, {
          autoAlpha: 0
        }).staggerTo(['#txt_1,#txt_2,#txt_4,#txt_5,#product_1,#product_2,#logo'], 1, {
          autoAlpha: 0
        }, 1, "+=1").from(['#txt_6'], 1, {
          autoAlpha: 0
        }).to('#rectangle', 1, {
          x: "-=210",
          ease: Cubic.easeOut
        }, "-=1.5").staggerFrom(['#logo2,#cta'], 1, {
          autoAlpha: 0
        }) //.add("enter")
        //.from('#cta', 0.5, {autoAlpha:0},"enter")
        //.set('#logo', {autoAlpha:1, x:-175, y:25},"enter")
        // .staggerFrom(['#txt_2, #txt_3, #txt_4'],1,{autoAlpha:0},0.5)
        // .staggerTo(['#txt_1, #txt_2, #txt_3,#txt_4'],1,{autoAlpha:0},0.5,"+=1")
        // .add("leave")
        // .to('#product_1',1,{y:-175},"leave")
        // .to('#product_2',1,{y:175},"leave")
        // .to('#rectangle',1,{x:"-=60",ease: Cubic.easeOut},"-=1")
        // .from('#txt_5',1,{autoAlpha:0},"-=1") 
        // .staggerTo(['#txt_5, #she'],1,{autoAlpha:0},0.5,"+=1")
        // .add("enter")
        // .to('#rectangle',1,{x:"-=101",ease: Cubic.easeOut},"enter")
        // .to('#product_1',1,{x:0,scale:1},"enter")
        // .to('#product_2',1,{x:0,scale:1},"enter")
        // .staggerFrom(['#txt_6, #txt_7, #txt_8'],1,{autoAlpha:0},0.5)
        // .from('#cta', 0.75, { autoAlpha: 0 })
        .to('#corner_block', 2, {
          scaleY: 1.5,
          scaleX: 3,
          ease: Linear.easeNone,
          yoyo: true,
          repeat: 3
        }, "start").to('#ruler', tl.duration(), {
          backgroundPositionY: -500,
          ease: Linear.easeNone
        }, "start");
      } ////////////////////////////////////////////////////// EVENT HANDLERS //////////////////////////////////////////////////////


      function addRollover() {
        dom.ad_content.addEventListener('mouseenter', function () {
          TweenMax.to('#cta', 0.5, {
            scale: 1.10
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
