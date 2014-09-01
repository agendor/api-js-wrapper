/**
 * Group of functions to allow easy access to Agendor API https://api.agendor.com.br
 */
(function(){
    "use strict";

    var root = this;
    var previous_agendor = root.agendor;

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

    agendor.deal = {
        add: function(deal, callback){
            var dealResult, personResult, organizationResult;

            //get person/organization
            var person = deal.person;
            var organization = deal.organization;

            //verify which object will be inserted. if person and organization were set together an error is thrown!
            if(person){
                var personRequest = createXMLHttp("/people");
                personRequest.onreadystatechange = function() {
                    if (personRequest.readyState === 4) {
                        if (personRequest.status === 201) {
                            personResult = JSON.parse(personRequest.responseText);
                            insertDeal(personResult.personId, callback);
                        } else {
                            var response = JSON.parse(personRequest.responseText);
                            throw response.message;
                        }
                    }
                };
                personRequest.send(JSON.stringify(person));

            }else if(organization){
                var organizationRequest = createXMLHttp("/organizations");
                organizationRequest.onreadystatechange = function() {
                    if (organizationRequest.readyState === 4) {
                        if (organizationRequest.status === 201) {
                            organizationResult = JSON.parse(organizationRequest.responseText);
                            insertDeal(organizationResult.organizationId, callback);
                        } else {
                            var response = JSON.parse(organizationRequest.responseText);
                            throw response.message;
                        }
                    }
                };
                organizationRequest.send(JSON.stringify(organization));

            }else{
                throw "ERROR: A person or organization is required to insert a deal";
            }

            function insertDeal(id, callback){
                //to insert a deal we just need the id of person or organization.
                if(person){
                    deal.person = id;
                    person.personId = id;
                }
                if(organization){
                    deal.organization = id;
                    organization.organizationId = id;
                }

                var dealRequest = createXMLHttp("/deals");
                dealRequest.onreadystatechange = function() {
                    if (dealRequest.readyState === 4) {
                        if (dealRequest.status === 201) {
                            dealResult = JSON.parse(dealRequest.responseText);
                            //set the person/organization on the deal object;
                            if(person){
                                dealResult.person = personResult;
                            }
                            if(organization){
                                dealResult.organization = organizationResult;
                            }
                            //send the result to callback function
                            callback(dealResult);
                        }else{
                            var response = JSON.parse(dealRequest.responseText);
                            throw response.message;
                        }
                    }
                };
                dealRequest.send(JSON.stringify(deal));
                deal.person = person;
                deal.organization = organization;
            }
        }
    };

    function createXMLHttp(route){
        var AGENDOR_API_URL = 'https://api.agendor.com.br/v1';
        var token = agendor.token;

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
        var routeRequested = AGENDOR_API_URL.concat(route);
        xmlHttp.open('post', routeRequested, true);
        xmlHttp.setRequestHeader("Content-Type", "application/json");
        xmlHttp.setRequestHeader("Authorization", "Token "+token);

        return xmlHttp;
    }

    root.agendor = agendor;

}).call(this);