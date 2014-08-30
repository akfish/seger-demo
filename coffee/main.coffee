define (require, exports, module) ->
  console.log '-_-'

  initial_words = [
    {text: "SAE", weight: 18}
    {text: "中文", weight: 13}
    {text: "关键词", weight: 18}
    {text: "提取", weight: 19}
    {text: "demo", weight: 13}
    {text: "akfish", weight: 7}
    {text: "猫杀", weight: 7}
    {text: "TF-IDF", weight: 9}
    {text: "Lorem", weight: 13}
    {text: "Ipsum", weight: 10.5}
    {text: "Dolor", weight: 9.4}
    {text: "Sit", weight: 8}
    {text: "Amet", weight: 6.2}
    {text: "Consectetur", weight: 5}
    {text: "Adipiscing", weight: 5}
    {text: "Elit", weight: 5}
    {text: "Nam et", weight: 5}
    {text: "Leo", weight: 4}
    {text: "Sapien", weight: 4}
    {text: "Pellentesque", weight: 3}
    {text: "habitant", weight: 3}
    {text: "lentty", weight: 3}
  ]

  service_url = "http://kw.catx.me"

  refresh_keywords = (text, callback) ->
    payload =
      max: 15
      c: text
    $.ajax
      url: service_url
      jsonp: 'callback'
      dataType: 'jsonp'
      data: payload
      success: (data) ->
        console.log data
        callback? null, data
      error: (xhr, status, err) ->
        callback? err


  $(document).ready ->
    cloud = $("#cloud")
    cloud.jQCloud initial_words

    ta = $("#text")

    info = $("#info")
    error = $("#error")

    show_info = (msg) ->
      info.text msg
      info.animate opacity: 1, 1000

    hide_info = ->
      info.animate opacity: 0, 1000

    show_error = (err, duration = 3000) ->
      error.text err
      error.animate opacity: 1, 1000
      if duration > 0
        window.setTimeout hide_error, duration

    hide_error = ->
      error.animate opacity: 0, 1000

    cb = (err, data) ->
      if err?
        show_error err
        console.error err
      else
        kws = data.keywords
        words = []
        for kw in kws
          words.push
            text: kw.word
            weight: kw.x
        cloud.html("")
        cloud.jQCloud words
      hide_info()
      ta.prop "disabled", false

    ta.keydown (e) ->
      if e.ctrlKey and e.keyCode == 13
        console.log "Submitting #{ta.val()}"
        ta.prop "disabled", true
        show_info "提交中"
        refresh_keywords ta.val(), cb
