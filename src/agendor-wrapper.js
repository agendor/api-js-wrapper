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
    agendor.addDeal = function(deal, callback){
        var self = this;
        var person = deal.person;
        var organization = deal.organization;

        var createXMLHttp = function(route, token){
            var AGENDOR_API_URL = 'http://localhost:8000';//TODO: CHANGE TO A VALID URL

            //Initializing our object
            var xmlHttp = null;

            //if XMLHttpRequest is available (chrome, firefox, opera...) then creating and returning it
            if (typeof(XMLHttpRequest) !== undefined) {
                xmlHttp = new XMLHttpRequest();
                //if window.ActiveXObject is available than the user is using IE...so we have to create the newest version XMLHttp object
            } else if (window.ActiveXObject) {
                var ieXMLHttpVersions = ['MSXML2.XMLHttp.6.0', 'MSXML2.XMLHttp.5.0', 'MSXML2.XMLHttp.4.0', 'MSXML2.XMLHttp.3.0', 'MSXML2.XMLHttp', 'Microsoft.XMLHttp'];
                //In this array we are starting from the first element (newest version) and trying to create it. If there is an
                //exception thrown we are handling it (and doing nothing ^^)
                for (var i = 0; i < ieXMLHttpVersions.length; i++) {
                    try {
                        xmlHttp = new ActiveXObject(ieXMLHttpVersions[i]);
                    } catch (e) {}
                }
            }
            var routeRequested = AGENDOR_API_URL.concat(route);
            xmlHttp.open('post', routeRequested, true);
            xmlHttp.setRequestHeader("Content-Type", "application/json");
            xmlHttp.setRequestHeader("Authorization", "Basic "+token);
            //  xmlHttp.setRequestHeader("Authorization", "Bearer "+token);

            return xmlHttp;
        };

        var insertDeal = function(id, callback){
            if(person){
                deal.person = id;
                person.personId = id;
            }
            if(organization){
                deal.organization = id;
                organization.organizationId = id;
            }
            var dealRequest = createXMLHttp("/deals", self.token);
            dealRequest.onreadystatechange = function() {
                if (dealRequest.readyState === 4) {
                    if (dealRequest.status === 201) {
                        deal = JSON.parse(dealRequest.responseText);
                        if(person){
                            deal.person = person;
                        }
                        if(organization){
                            deal.organization = organization
                        }
                        callback(deal);
                    }else{
                        var response = JSON.parse(dealRequest.responseText);
                        throw response.message;
                    }
                }
            };
            dealRequest.send(JSON.stringify(deal));
        };

        if(person){
            var personRequest = createXMLHttp("/people", self.token);
            personRequest.onreadystatechange = function() {
                if (personRequest.readyState === 4) {
                    if (personRequest.status === 201) {
                        person = JSON.parse(personRequest.responseText);
                        insertDeal(person.personId, callback);
                    } else {
                        var response = JSON.parse(personRequest.responseText);
                        throw response.message;
                    }
                }
            };
            personRequest.send(JSON.stringify(person));
        }else if(organization){
            var organizationRequest = createXMLHttp("/organizations", self.token);
            organizationRequest.onreadystatechange = function() {
                if (organizationRequest.readyState === 4) {
                    if (organizationRequest.status === 201) {
                        organization = JSON.parse(organizationRequest.responseText);
                        insertDeal(organization.organizationId, callback);
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
    };

    root.agendor = agendor;

}).call(this);