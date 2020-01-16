
// JS Responsive beacons
var breakpoints = ["sm", "sm1", "md", "lg"], theBreak = getBreakpoint(), zoom = 0;

function getBreakpoint() {
    for (var i = 0; i < breakpoints.length; i++) {
        if (isBreakpoint(breakpoints[i])) {
            return breakpoints[i];
        }
    }
    return "base";
}

function isBreakpoint(breakpoint) {
    var beacon = document.getElementById("js-" + breakpoint + "-beacon");
    if (beacon) {
        return beacon.offsetWidth > 0;
    }
    return false;
}

if (theBreak == "base") {
    zoom = 11.6
} else if (theBreak == "sm") {
    zoom = 12
} else if (theBreak == "sm1") {
    zoom = 12.5
} else if (theBreak == "md") {
    zoom = 12.7
} else if (theBreak == "lg") {
    zoom = 12.5
}

////// MODAL STUFF
var contact1 = document.getElementById("contactUs1"),
    contact2 = document.getElementById("contactUs2"),
    contact3 = document.getElementById("contactUs3"),
    contactClose = document.getElementById("closeModal"),
    newsOpen = document.getElementById("newsOpen"),
    newsClose = document.getElementById("closeNews");

contact1.addEventListener('click', function() {
    document.getElementById("contactModal").classList.add("show");
});

contact2.addEventListener('click', function() {
    document.getElementById("contactModal").classList.add("show");
});

if(typeof(document.getElementById("contactUs3")) != 'undefined' && document.getElementById("contactUs3") != null){
    contact3.addEventListener('click', function() {
        document.getElementById("contactModal").classList.add("show");
    });
}

contactClose.addEventListener('click', function() {
    document.getElementById("contactModal").classList.remove("show");
});

newsOpen.addEventListener('click', function() {
    document.getElementById("newsletterModal").classList.add("show");
});

newsClose.addEventListener('click', function() {
    document.getElementById("newsletterModal").classList.remove("show");
});


function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

if (getUrlVars()["open"] == "newsletter"){
    document.getElementById("newsletterModal").classList.add("show");
} else if (getUrlVars()["open"] == "signup"){
    document.getElementById("contactModal").classList.add("show");
}



////// VIDEOS
var vidBtn = document.getElementsByClassName("video-button"),
    tag = document.createElement('script'),
    allVids = document.getElementsByClassName('player-fr'),
    allVidsArray = [];

for (i = 0; i < allVids.length; i++) {
    var theBtn = vidBtn.item(i);
    var details = {id: allVids.item(i).getAttribute('id'), video: allVids.item(i).dataset.video, button: theBtn};
    allVidsArray.push(details);
}


tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
function onYouTubeIframeAPIReady() {
    if(typeof allVidsArray === 'undefined')
        return;
    
    allVidsArray.forEach(function(theVid, i){
        var curplayer = createPlayer(theVid);
        theVid.player = curplayer;
        var myBtn = theVid.button;
        
        myBtn.addEventListener('click', function() {
            myBtn.classList.add("playing");
            theVid.player.playVideo();
        });
    })
    //for(var i = 0; i < allVids.length;i++) {
    //    var curplayer = createPlayer(allVidsArray[i]);
    //    allVidsArray[i].player = curplayer;
    //    var myBtn = allVidsArray[i].button;
    //    
    //    myBtn.addEventListener('click', function() {
    //        myBtn.classList.add("playing");
    //        allVidsArray[i].player.playVideo();
    //    });
    //}
}
function createPlayer(playerInfo) {
    return new YT.Player(playerInfo.id, {
        videoId: playerInfo.id,
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}
//var player;
//function onYouTubeIframeAPIReady() {
//    player = new YT.Player('player', {
//        videoId: 'hNvTRPfeeTs',
//        events: {
//            'onReady': onPlayerReady,
//            'onStateChange': onPlayerStateChange
//        }
//    });
//}
function onPlayerReady(event) {
    //event.target.playVideo();
}

      // 5. The API calls this function when the player's state changes.
      //    The function indicates that when playing a video (state=1),
      //    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
    //if (event.data == YT.PlayerState.PLAYING && !done) {
    //    setTimeout(stopVideo, 6000);
    //    done = true;
    //}
}
//function stopVideo() {
//    player.stopVideo();
//  }
//function startVideo() {
//    player.playVideo();
//}

//for (let vidbutton of vidBtn.entries()){
//    vidbutton.addEventListener('click', function() {
//        vidbutton.classList.add("playing");
//        allVidsArray[i].player.playVideo();
//    });
//}



////// VIDEO TABS
var vidTabs = document.getElementsByClassName("tab"),
    vidTabArray = [],
    vidTabItems = document.getElementById("vidTabs");

for(var i = 0; i < vidTabs.length;i++) {
    vidTabArray.push(vidTabs[i]);
}

vidTabArray.forEach(function(theTab, i) {
    theTab.addEventListener('click', function(){
        if (theTab.classList.contains("active")) {
            return;
        } else if (vidTabItems.classList.contains("one")) {
            vidTabItems.classList.remove("one");
            vidTabItems.classList.add("two");
            vidTabArray.forEach(function(theOtherTab, j) {
                theOtherTab.classList.remove("active");
            });
            theTab.classList.add("active");
        } else if (vidTabItems.classList.contains("two")) {
            vidTabItems.classList.remove("two");
            vidTabItems.classList.add("one");
            vidTabArray.forEach(function(theOtherTab, j) {
                theOtherTab.classList.remove("active");
            });
            theTab.classList.add("active");
        }
    });
});



////// SCROLL DEPTH

var throttlescroll, scrollTop, benchmark, topOffset, headCont = document.getElementById("headCont");

if(typeof(document.getElementById("contactUsBox")) != 'undefined' && document.getElementById("contactUsBox") != null){
    benchmark = document.getElementById("contactUsBox");
} else {
    benchmark = document.getElementById("contactUs2");
}

function getmeasurements(){
    topOffset = offset(benchmark);
}
 
function amountscrolled(){
    scrollTop = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop;
    //var pctScrolled = Math.floor(scrollTop/trackLength * 100); // gets percentage scrolled (ie: 80 or NaN if tracklength == 0)
    //console.log(scrollTop);
    
    if (scrollTop > topOffset.top && !headCont.classList.contains("show")) {
        headCont.classList.add("show");
    } else if (scrollTop < topOffset.top && headCont.classList.contains("show")) {
        headCont.classList.remove("show");
    }
}
 
getmeasurements();
 
window.addEventListener("resize", function(){
    getmeasurements()
}, false)
 
window.addEventListener("scroll", function(){
    clearTimeout(throttlescroll);
    throttlescroll = setTimeout(function(){ // throttle code inside scroll to once every 50 milliseconds
        amountscrolled();
    }, 25);
}, false);

function offset(el) {
    var rect = el.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}




////// JSON LOADER
function loadJSON(jsonfile, callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    
    xobj.open('GET', jsonfile, true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
        }
    };
    xobj.send(null);  
 }