// MOBILE NAVIGATION
$(document).ready(function () {
    $('.sidenav').sidenav();
    $('.step1').show();
    $('.step2').hide();
    $('.stepfail').hide();
    $('.steppass').hide();
});

var database = firebase.database();
var storage = firebase.storage();
var storageRef = storage.ref();
var idNumber = '';

$('.next1').on('click', function(){
    $('.step1').hide();
    idNumber = $('#id_number').val().trim();
    console.log(idNumber);
    $('#id_number').empty();
    $('.step2').show();
})

