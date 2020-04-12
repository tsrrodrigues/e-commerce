var $ = require('jquery');
window.$ = $;

$(document).ready(function(){
    $("#nav-toggle").click(function(){
        $("#navigation").toggleClass("hidden-xs");
    });
 });