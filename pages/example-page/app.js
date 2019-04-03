// MOBILE NAVIGATION
$(document).ready(function () {
    $('.sidenav').sidenav();
    $('.step2').hide();
    $('.step3').hide();
});
var database = firebase.database();
var storage = firebase.storage();
var storageRef = storage.ref();
var test = "test";

// var photoElem = $('<div>');

// var stepsElem = $('<p>');
// stepsElem.addClass('main-text');

// LOCAL STORAGE //
$('.next1').on('click', function () {
    $('.step1').hide();
    $('.step2').show();

    event.preventDefault();

    var firstName = $("#first_name").val().trim();
    var lastName = $("#last_name").val().trim();
    var email = $("#email").val().trim();

    localStorage.clear();
    localStorage.setItem("Full Name", firstName + lastName);
    localStorage.setItem("First Name", firstName);
    localStorage.setItem("Last Name", lastName);
    localStorage.setItem("Email", email);
})

$('.next2').on('click', function () {
    event.preventDefault();
    $('.step2').hide();
    $('.step3').show();
    $('#my_result').appendTo('#webimg')

    $('#namedisplay').text('Name: ' + localStorage.getItem("First Name") + ' ' + localStorage.getItem("Last Name"));
    $('#emaildisplay').text('Email: ' + localStorage.getItem("Email"));
})


$('#video').on('click', function () {

    // Grab elements, create settings, etc.
    var video = document.getElementById('video');

    // Get access to the camera!
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        // Not adding `{ audio: true }` since we only want video now
        navigator.mediaDevices.getUserMedia({ video: true }).then(function (stream) {
            //video.src = window.URL.createObjectURL(stream);
            video.srcObject = stream;
            video.play();
        });
    }

    // Elements for taking the snapshot
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var video = document.getElementById('video');

    // Trigger photo take
    document.getElementById("snap").addEventListener("click", function () {
        context.drawImage(video, 0, 0, 640, 480);
    });
})


//Uploads data and picture to Firebase
$('.upward').on('click', function () {

    var idnumber = '';
    function idGenerator() {
        idnumber ='';
        for (var i = 0; i < 10; i++) {
            idnumber = idnumber + Math.floor(Math.random() * 10);
        };
        database.ref().once('value', function (data) {
            //TODO: Find how to pull database data once and compare values
            if (data.child(idnumber).exist()) {
                idGenerator();
                console.log(idnumber);
                console.log(data.child);
            }
        })
    }
    idGenerator();
    $('#idDisplay').text('Your ID # is: ' + idnumber);
    $('.confirm').text('Application Sent!')
    database.ref(idnumber).set({
        firstname: localStorage.getItem('First Name'),
        lastname: localStorage.getItem('Last Name'),
        picture: baseString,
        email: localStorage.getItem('Email')
    })

    var file = $('#name').files[0]; //TODO: add selector for where the file is coming from
    storageRef.child(idnumber).put(file).then(function (snapshot) {
        console.log('Uploaded a file!');
    })
})


