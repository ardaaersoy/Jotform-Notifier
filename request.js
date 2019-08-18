$(document).ready(function() {
    var user = [];
    (sec => {
        setInterval(function() {

            var xhr = new XMLHttpRequest();
            xhr.open("GET", "http://intern-2019.jotform.io/arda/notifier.php");
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send();

            xhr.onload = function() {
                var data = xhr.response;
                var jsonObj = JSON.parse(data);

                for (var i = 0; i < jsonObj.length; i++) {
                    //var id = jsonObj[i]['id'];
                    var form_id = jsonObj[i]['form_id'];
                    var title = jsonObj[i]['title'];
                    var name = jsonObj[i]['name'];
                    var surname = jsonObj[i]['surname'];
                    //var email = jsonObj[i]['email'];
                    //var phone = jsonObj[i]['phone'];
                    //var note = jsonObj[i]['note'];

                    if (!user.includes(name + " " + surname, title)) {
                        user.push(name + " " + surname, title);
                    }

                    $("body").css("height", "auto");
                    $("table").html("");
                    for (var j = 0; j < user.length; j += 2) {
                        $("table").append("<tr><td>" + user[j] + " is filled your <a id='submission' href='https://www.jotform.com/submissions/" + form_id +
                            "' target='_blank'>'" + user[j + 1] + "'</a> form</td></tr>");
                    }
                }

                if (user.length > 0) {
                    chrome.browserAction.setBadgeText({ text: '' + user.length / 2 });
                } else {
                    $("table").html("<tr><td>No notifications yet!</td></tr>");
                }
            }

            xhr.onerror = function() {
                console.log("network error");
            };
        }, sec * 1000);
    })(1);
});

//console.log(user);
//console.log(id + "\n" + form_id + "\n" + title + "\n" + name + "\n" +
//surname + "\n" + email + "\n" + phone + "\n" + note);
//let json = data.replace(/['"]+/g, ''); to remove single quotes