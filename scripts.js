$(function() {
    function supports_html5_storage() {
  try {
    return 'localStorage' in window && window['localStorage'] !== null;
  } catch (e) {
    return false;
  }
}
    function showData(data) {
                        $.each(data, function(i, e) {
                            if(i > 9) return false;
                            var li = $("<li/>");
                            var a = $("<a/>");
                            var h3 = $("<h3></h3>");
                            a.append(h3);
                            a.attr("href", e.homepage || e.html_url);
                            h3.text(e.name);
                            li.append(a);
                            var desc = $("<p></p>");
                            desc.text(e.description);
                            li.append(desc);
                            if(e.homepage) {
                                var a2 = $("<a/>");
                                a2.attr("href", e.html_url);
                                a2.text("(Source)");
                                desc.append(a2);
                            }
                            $("#projects").append(li);
                        });
                }
    
    var store = supports_html5_storage();
    
    var data = localStorage["projects"];
    var today = new Date();
    today = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    if(
        store
            && data
            && data.aquired.getYear() == today.getYear()
            && data.aquired.getMonth() == today.getMonth()
            && data.aquired.getDate() == today.getDate()
      ) {
        showData(data.data);
    } else {
        
    
    
                $.get("https://api.github.com/users/glombek/repos",
                      { sort: "updated" },
                      function(data) {
                          if(store) {
                              localStorage["projects"] = { aquired: new Date(), data: data };
                              
                          }
                          showData(data);
                          
                      });
    }
                //$.get("https://api.github.com/users/glombek/orgs",
                //      function(data) {
                //        $.each(data, function(i, e) {
                //            if(i > 9) return false;
                //            //var li = $("<li/>");
                //            var a = $("<a/>");
                //            var img = $("<img/>");
                //            a.attr("href", "https://github.com/orgs/" + e.login);
                //            a.attr("title", e.login);
                //            img.attr("src", e.avatar_url);
                //            a.append(img);
                //            $("#orgs").append(a);
                //        });
                //});
            });