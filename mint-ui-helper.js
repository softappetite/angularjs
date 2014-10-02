
/*------------------From helper functions [Begin]----------------*/

function show_data(data, namespace, url, maxVisible, currentPageLimit, listId, listContainerId, showContentCallback) {
    $("#" + listContainerId).hide();
    $("#" + listId + "> tbody").html("");

    if (! data)
        return false;

    if (Object.keys(data["data"]).length > 0) {
        showContentCallback(data["data"]);
        $("#" + listContainerId).show();
    }

    config_paginator(namespace, url, data.count, data.page, maxVisible, currentPageLimit, listId, listContainerId, showContentCallback);
}

function submit_data(data, url, callback) {
    
    $.ajax({
        type: 'post',
        url: url,
        data: data,
        async: true,
        success: function(data) {
            
            if (callback) {
                callback(json_parse(data));
            }
            
        },
        error: function(jqXHR, textStatus, errorThrown) {
            
            alert('Error in processing request !');
            
            console.log(jqXHR.responseText);
        }
    });
}

function json_parse(json) {
    
    if (! json) {
        
        return false;
    }
    
    var jsonString = json.toString().trim();
    
    if (jsonString !== '') {

        try {
            console.log(jsonString);
            return jQuery.parseJSON(jsonString);
            
        } catch (e) {
            alert('Error in viewing the response !');
        }
    }
    
    return null;
}

function clear_state (submitUrl) {
    
    var data = {};
    
    data["action"] = "CLEAR";
    
    submit_data(data, submitUrl);
}

/*------------------From helper functions [End]------------------*/


/*------------------Paginator config functions [Begin]------------------*/

function config_bootpage(namespace, url, total, page, maxVisible, currentPageLimit, listId, listContainerId, showContentCallback) {
    $("#" + namespace + "page-selection").html("");
    if (! (total > 0))
        return false;
    total = parseInt(total);
    page = parseInt(page);
    maxVisible = parseInt(maxVisible);
    var pageSelectionDiv = $("<div>");
    $("#" + namespace + "page-selection").append(pageSelectionDiv);
    pageSelectionDiv.bootpag({
        total: total,
        page: page,
        maxVisible: maxVisible
    }).on("page", function(event, page) {
        var data = {};
        data["action"] = "PAGE";
        var params = {};
        params["page"] = page;
        params["limit"] = currentPageLimit;
        data["params"] = params;
        $("#dim").addClass("page_dim");
        submit_data(data, url, function(response) {
            $("#dim").removeClass("page_dim");
            show_data(response.data, namespace, url, maxVisible, currentPageLimit, listId, listContainerId, showContentCallback)
        });
    });

}

function config_paginator(namespace, url, total, page, maxVisible, currentPageLimit, listId, listContainerId, showContentCallback) {
    $("#" + namespace + "row-count").html(total);

    var noOfPages = Math.ceil(total / currentPageLimit);
    config_bootpage(namespace, url, noOfPages, page, maxVisible, currentPageLimit, listId, listContainerId, showContentCallback);
}


/*------------------Paginator config functions [End]------------------*/

function submit_start() {
    $("#processing").addClass("page_dim");
}

function submit_end() {
    $("#processing").removeClass("page_dim");
}