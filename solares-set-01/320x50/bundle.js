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
      log.debug = false; // set to false before publishing

      var dom = domIds(),
          adHeight = dom.ad_content.offsetHeight; ////////////////////////////////////////////////////// ANIMATION //////////////////////////////////////////////////////

      function frameStart() {
        if (es5()) {
          frame0();
        } else {
          dom.backup.classList.add('backup');
        }
      }

      function frame0() {
        function slideProduct(overlay, text, kill) {
          var tl = new TimelineLite();
          tl.from(overlay, 0.5, {
            y: -adHeight,
            ease: Cubic.easeInOut
          }).from(text, 1, {
            autoAlpha: 0
          });

          if (kill) {
            tl.set(kill, {
              autoAlpha: 0
            }, 'invisible');
          }

          return tl;
        }

        var master = new TimelineLite();
        master.add(slideProduct('#overlay-01', '#txt_2'), '+=2.2').set(['#txt_1a', '#txt_1b'], {
          autoAlpha: 0
        }).add(slideProduct('#overlay-02', '#txt_3', ['#overlay-01', '#txt_2']), '+=1.2').add(slideProduct('#overlay-03', '#txt_4', ['#overlay-02', '#txt_3']), '+=1.2').add(slideProduct('#overlay-04', '#txt_5', ['#overlay-03', '#txt_4']), '+=1.2').to('#txt_5', 1, {
          autoAlpha: 0
        }, '+=1.2').to('#overlay-04', 1, {
          y: -adHeight,
          ease: Cubic.easeInOut
        }, '-=1').from('#cta', 1, {
          autoAlpha: 0
        });
        dom.ad_content.classList.remove('invisible');
      } ////////////////////////////////////////////////////// EVENT HANDLERS //////////////////////////////////////////////////////
      // function addRollover() {
      //   dom.ad_content.addEventListener('mouseenter', () => {
      //   });
      //   dom.ad_content.addEventListener('mouseleave', () => {
      //   });
      // }


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
