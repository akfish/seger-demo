define(function(require, exports, module) {
  var initial_words, refresh_keywords, service_url;
  console.log('-_-');
  initial_words = [
    {
      text: "SAE",
      weight: 18
    }, {
      text: "中文",
      weight: 13
    }, {
      text: "关键词",
      weight: 18
    }, {
      text: "提取",
      weight: 19
    }, {
      text: "demo",
      weight: 13
    }, {
      text: "akfish",
      weight: 7
    }, {
      text: "猫杀",
      weight: 7
    }, {
      text: "TF-IDF",
      weight: 9
    }, {
      text: "Lorem",
      weight: 13
    }, {
      text: "Ipsum",
      weight: 10.5
    }, {
      text: "Dolor",
      weight: 9.4
    }, {
      text: "Sit",
      weight: 8
    }, {
      text: "Amet",
      weight: 6.2
    }, {
      text: "Consectetur",
      weight: 5
    }, {
      text: "Adipiscing",
      weight: 5
    }, {
      text: "Elit",
      weight: 5
    }, {
      text: "Nam et",
      weight: 5
    }, {
      text: "Leo",
      weight: 4
    }, {
      text: "Sapien",
      weight: 4
    }, {
      text: "Pellentesque",
      weight: 3
    }, {
      text: "habitant",
      weight: 3
    }, {
      text: "lentty",
      weight: 3
    }
  ];
  service_url = "http://kw.catx.me/";
  refresh_keywords = function(text, callback) {
    var payload;
    payload = {
      max: 15,
      c: text
    };
    return $.ajax({
      url: service_url,
      jsonp: 'callback',
      dataType: 'jsonp',
      type: 'POST',
      data: payload,
      success: function(data) {
        console.log(data);
        return typeof callback === "function" ? callback(null, data) : void 0;
      },
      error: function(xhr, status, err) {
        return typeof callback === "function" ? callback(err) : void 0;
      }
    });
  };
  return $(document).ready(function() {
    var cb, cloud, error, hide_error, hide_info, info, show_error, show_info, ta;
    cloud = $("#cloud");
    cloud.jQCloud(initial_words);
    ta = $("#text");
    info = $("#info");
    error = $("#error");
    show_info = function(msg) {
      info.text(msg);
      return info.animate({
        opacity: 1
      }, 1000);
    };
    hide_info = function() {
      return info.animate({
        opacity: 0
      }, 1000);
    };
    show_error = function(err, duration) {
      if (duration == null) {
        duration = 3000;
      }
      error.text(err);
      error.animate({
        opacity: 1
      }, 1000);
      if (duration > 0) {
        return window.setTimeout(hide_error, duration);
      }
    };
    hide_error = function() {
      return error.animate({
        opacity: 0
      }, 1000);
    };
    cb = function(err, data) {
      var kw, kws, words, _i, _len;
      if (err != null) {
        show_error(err);
        console.error(err);
      } else {
        kws = data.keywords;
        words = [];
        for (_i = 0, _len = kws.length; _i < _len; _i++) {
          kw = kws[_i];
          words.push({
            text: kw.word,
            weight: kw.x
          });
        }
        cloud.html("");
        cloud.jQCloud(words);
      }
      hide_info();
      return ta.prop("disabled", false);
    };
    return ta.keydown(function(e) {
      if (e.ctrlKey && e.keyCode === 13) {
        console.log("Submitting " + (ta.val()));
        ta.prop("disabled", true);
        show_info("提交中");
        return refresh_keywords(ta.val(), cb);
      }
    });
  });
});
