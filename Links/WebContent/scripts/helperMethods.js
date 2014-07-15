function changeFormState() {
    var newState = "";
    
    switch($('#new-record-fields').css('display')) {
        case 'none':
            newState = 'block';
            break;
        case 'block':
            newstate = 'none';
            break;
        default:
            console.log('Input form display property has a bad value. ;c');
            return 0;
    }
    
    $('#new-record-fields').css('display', newState);
}

function convertToSafeHtml(data, $sce) {            
    for(i = 0; i < data.length; i++) {
        data[i].value = $sce.trustAsHtml(data[i].value);
        data[i].description = $sce.trustAsHtml(data[i].description);
    }
    
    return data;
}

function checkRecordValidity (json) {
    if(!isValueSet(json)) {
        alert('Leaving the value field empty is illegal!');
        return null;
    } else {
        return 1;
    }
}

function isValueSet(json) {
    return json !== null && json.value !== null && json.value !== "";
}

function changePassInputType() {
    var newState = '';
    
    switch($('.form-signin #pass-field').attr('type')) {
        case 'text':
            newState = 'password';
            break;
        case 'password':
            newState = 'text';
            break;
        default:
            console.log('Input form type attr has a bad value. ;c');
            return 0;
    }
    
    $('.form-signin #pass-field').attr('type', newState);
}

function ensureLoginIsFilled() {    
    if($('.form-signin #pass-field').val() === "" || $('.form-signin #name-field').val() === "") {
        alert('Leaving a login field empty is illegal!');
        return null;
    }
    else {
        window.location = window.location.href + 'entries';
        return 1;
    }
}

function hideEntries() {
    var regex = new RegExp($('#search-field').val()),
        entries = $('#entries-table-body tr'),
        columns = [],
        testedVal = 0,
        testedDesc = 0,
        isFound = 0,
        searchGroup = $('#selected-search-group').text();
    
    for(i = 0; i < entries.length; i++) {
        columns = $(entries[i]).children();
        testedVal = regex.test($(columns[0]).text());
        testedDesc = regex.test($(columns[1]).text());
        
        if(searchGroup == 'value')
            isFound = testedVal;
        else
            if(searchGroup == 'description')
                isFound = testedDesc;
            else
                isFound = testedDesc || testedVal;
        
        if(isFound) {
            $(entries[i]).css('display', 'table-row');
        }
        else {
            $(entries[i]).css('display', 'none');
        }
    }
}

function changeSearchGroup(elem, searchGroup) {
    searchGroup = $(elem).text();
    $('#selected-search-group').text(searchGroup);
    hideEntries();
    
    return searchGroup;
}

function isAlreadyInDb(data, user) {
    for(oldUser in data) {
        if(oldUser.name === user.name) {
            return 1;
        }
    }
    
    return null;
}