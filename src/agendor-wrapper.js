/**
 * Group of functions to allow easy access to Agendor API https://api.agendor.com.br
 */
(function(){
    "use strict";

    var root = this;
    var previous_agendor = root.agendor;

    var constants = {
        AGENDOR_API_URL: 'https://api.agendor.com.br/v1',
        PERSON_ROUTE : '/people',
        ORGANIZATION_ROUTE: '/organizations',
        DEAL_ROUTE: '/deals'
    };

    var agendor = function(){
        this.token = null;
    };

    agendor.noConflict = function() {
        root.agendor = previous_agendor;
        return agendor;
    };

    agendor.setToken = function(token){
        this.token = token;
    };

    agendor.person = {
        add: function(person, callback){
            if(person.organization){
                var organization = person.organization;
                var orgRequest = createXMLHttp(constants.ORGANIZATION_ROUTE);
                orgRequest.onreadystatechange = function() {
                    if (orgRequest.readyState === 4) {
                        if (orgRequest.status === 201) {
                            var orgInserted = JSON.parse(orgRequest.responseText);
                            person.organization = orgInserted.organizationId;
                            insertPerson();
                        } else {
                            errorHandler(JSON.parse(orgRequest.responseText), callback);
                            //TODO: If organization was already inserted, call get /organizations
                        }
                    }
                };
                orgRequest.send(JSON.stringify(organization));
            }else{
                insertPerson();
            }

            function insertPerson(){
                var personRequest = createXMLHttp(constants.PERSON_ROUTE);
                personRequest.onreadystatechange = function() {
                    if (personRequest.readyState === 4) {
                        if (personRequest.status === 201) {
                            var personInserted = JSON.parse(personRequest.responseText);
                            callback(personInserted);
                        } else {
                            errorHandler(JSON.parse(personRequest.responseText), callback);
                        }
                    }
                };
                personRequest.send(JSON.stringify(person));
            }
        }
    };

    agendor.deal = {
        add: function(deal, callback){
            //clone deal parameter to avoid changes in the original deal object
            var dealClone = JSON.parse(JSON.stringify(deal));
            var person = deal.person;
            var personInserted = null;
            if(person){
                agendor.person.add(person, function(result){
                    if(result.error){
                        errorHandler(result.error, callback);
                    }
                    personInserted = JSON.parse(JSON.stringify(result));
                    dealClone.person = result.personId;
                    insertDeal();
                });
            }else{
                insertDeal();
            }

            function insertDeal(){
                dealClone.dealStageOrder = 1;
                var xmlHttp = createXMLHttp(constants.DEAL_ROUTE);
                xmlHttp.onreadystatechange = function() {
                    if (xmlHttp.readyState === 4) {
                        if (xmlHttp.status === 201) {
                            var dealResult = JSON.parse(xmlHttp.responseText);
                            //set the person back on the deal object;
                            dealResult.person = personInserted;
                            //send the result to callback function
                            callback(dealResult);
                        }else{
                            errorHandler(JSON.parse(xmlHttp.responseText, callback));
                        }
                    }
                };
                xmlHttp.send(JSON.stringify(dealClone));
            }
        }
    };

    function errorHandler(error, callback){
        callback({
            error: error
        });
    }

    function createXMLHttp(route){
        //Initializing our object
        var xmlHttp = null;
        //if XMLHttpRequest is available (chrome, firefox, opera...) then creating and returning it
        if (typeof(XMLHttpRequest) !== undefined) {
            xmlHttp = new XMLHttpRequest();
            //if window.ActiveXObject is available than the user is using IE...so we have to create the newest version of XMLHttp object
        } else if (window.ActiveXObject) {
            var ieXMLHttpVersions = ['MSXML2.XMLHttp.6.0', 'MSXML2.XMLHttp.5.0', 'MSXML2.XMLHttp.4.0', 'MSXML2.XMLHttp.3.0', 'MSXML2.XMLHttp', 'Microsoft.XMLHttp'];
            //In this array we are starting from the first element (newest version) and trying to create it. If there is an
            //exception thrown we are handling it (and doing nothing)
            for (var i = 0; i < ieXMLHttpVersions.length; i++) {
                try {
                    xmlHttp = new ActiveXObject(ieXMLHttpVersions[i]);
                } catch (e) {}
            }
        }
        var routeRequested = constants.AGENDOR_API_URL.concat(route);
        xmlHttp.open('post', routeRequested, true);
        xmlHttp.setRequestHeader("Content-Type", "application/json");
        xmlHttp.setRequestHeader("Authorization", "Token "+agendor.token);

        return xmlHttp;
    }

    root.agendor = agendor;

}).call(this);