//inputs
var siteName = document.getElementById('siteName');
var siteUrl = document.getElementById('siteUrl');


//buttons
var submitBtn = document.getElementById('submitBtn');
var visitBtn = document.getElementById('visitBtn');
var deleteBtn = document.getElementById('deleteBtn');
var errorLayer = document.getElementById('errorLayer');
var close = document.getElementById('close');
var errorWindow = document.getElementById('errorWindow');



submitBtn.onclick = addSite;

// cancel refresh

var form = document.querySelector('form');
form.addEventListener('submit', function (e) {
    e.preventDefault();
});

function closeBox() {
    errorLayer.classList.replace('d-block', 'd-none');
}
close.addEventListener('click', closeBox);

errorLayer.addEventListener('click', function () {

    closeBox();
   
});


errorWindow.addEventListener('click', function (e) {
    e.stopPropagation;
    
});





//validation

function validateName() {
    if(siteName.value.length ==""){
        return false;
    }else if (!validation(siteName)) {
        siteName.classList.add('is-invalid');
        siteName.classList.remove('is-valid');
        return false;
    } else {
        return true;
    }
}
function validateUrl() {
    if(siteUrl.value.length ==""){
        return false;
    }else if (!validation(siteUrl)) {
        siteUrl.classList.add('is-invalid');
        siteUrl.classList.remove('is-valid');
        return false;
    } else {
        return true;
    }
}



//site list 
var siteList = [];

//addSite function
function addSite() {
    var site = {
        sName: siteName.value,
        sUrl: siteUrl.value
    }
    if (validateName() && validateUrl()) {
        siteList.push(site);
        localStorage.setItem('site', JSON.stringify(siteList));
        display();
        reset();

    } else {

        errorLayer.classList.replace('d-none', 'd-block');
        return false;
    }

}

if (localStorage.getItem('site') !== null) {
    siteList = JSON.parse(localStorage.getItem('site'));
    display();
}

function validation(element) {

    var regex = {
        siteName: /^([a-z]|[A-Z]){3,}$/,
        siteUrl: /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/
    }
    if (regex[element.id].test(element.value) == true) {
        element.classList.add('is-valid');
        element.classList.remove('is-invalid');
        return true;
    }
    else {
        element.classList.add('is-invalid');
        element.classList.remove('is-valid');
        return false;
    }
}
//display sites in the table
function display() {
    var box = ``;
    for (var i = 0; i < siteList.length; i++) {
        box += `
        
        <tr class="align-middle">
        <td>${i + 1}</td>
        <td>${siteList[i].sName}</td>
        <td><a target="_blank" href="${siteList[i].sUrl}" id="visitBtn" class="btn btn-visit">
            <i class="fa-solid fa-eye pe-2"></i>Visit
          </a></td>
        <td><button onclick=" deleteSite(${i})" id="deleteBtn" class="btn btn-delete pe-2" data-index="0">
            <i class="fa-solid fa-trash-can"></i>
            Delete
          </button></td>
      </tr>
        `;
    }
    document.getElementById('tableBody').innerHTML = box;

}

//reset input value
function reset() {
    siteName.value = null;
    siteUrl.value = null;
}

// delete site function
function deleteSite(index) {
    siteList.splice(index, 1);
    localStorage.setItem('site', JSON.stringify(siteList));
    display();

}




