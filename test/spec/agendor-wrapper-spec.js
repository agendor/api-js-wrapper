"use strict";

describe('Use Agendor Wrapper to insert a deal with stage "Contact"', function(){
    beforeEach(function(){
        agendor.setToken('d43f70c9-267c-4886-8eef-8145f2540750');
    });
    describe('when inserting an organization:', function(){
        var deal = {
            title: 'Contact this organization',
            description: 'This organization was inserted through the contact form in our web site. Contact this organization',
            organization: {
                nickname: 'Organization to contact' + Math.random(),
                legalName: 'Organization',
                cnpj: '' + Math.floor(Math.random() * 99999999999999),
                description: 'Organization',
                website: 'www.organization.com',
                phones: [
                    {
                        'number': '(11) 3280-8090',
                        'type': 'work'
                    }
                ],
                emails: ['email@org.com'],
                social: {facebook: 'facebook.com/user'},
                address: {
                    country: 'Brazil',
                    district: 'Consolação',
                    streetName: 'Rua Sergipe',
                    streetNumber: 799,
                    additionalInfo: 'Ap 123',
                    postalCode: '01243001',
                    state: 'SP',
                    city: 'São Paulo'
                }
            }
        };
        it('should return a deal with all fields inserted (including the organization)', function(){
            agendor.deal.add(deal, function(result){
                console.log(deal);
                result.dealId.should.not.to.be.null;
                result.title.should.equal(deal.title);
                result.description.should.equal(deal.description);
                result.organization.organizationId.should.not.to.be.null;
                result.organization.nickname.should.equal(deal.organization.nickname);
                result.organization.legalName.should.equal(deal.organization.legalName);
                result.organization.cnpj.should.equal(deal.organization.cnpj);
                result.organization.description.should.equal(deal.organization.description);
                result.organization.website.should.equal(deal.organization.website);
                result.organization.phones.should.equal(deal.organization.phones);
                result.organization.emails.should.equal(deal.organization.emails);
                result.organization.social.should.equal(deal.organization.social);
                result.organization.address.should.equal(deal.organization.address);
                done();
            });
        });
    });

    describe('when inserting a person:', function(){
        var deal = {
            title: 'Contact this organization',
            description: 'This organization was inserted through the contact form in our web site. Contact this organization',
            person: {
                name: 'Person to contact ' + Math.random(),
                cpf: '' + Math.floor(Math.random() * 99999999999),
                phones: [
                    {
                        'number': '(11) 98055-9313',
                        'type': 'mobile'
                    }
                ],
                emails: ['jondoe@org.com'],
                address: {
                    country: 'Brazil',
                    district: 'Consolação',
                    streetName: 'Rua Sergipe',
                    streetNumber: 799,
                    additionalInfo: 'Ap 123',
                    postalCode: '01243001',
                    state: 'SP',
                    city: 'São Paulo'
                }
            }
        };
        it('should return a deal with all fields inserted (including the person)', function(){
            agendor.deal.add(deal, function(result){
                result.dealId.should.not.to.be.null;
                result.title.should.equal(deal.title);
                result.description.should.equal(deal.description);
                result.person.personId.should.not.to.be.null;
                result.person.name.should.not.to.be.null;
                result.person.name.should.equal(deal.person.name);
                result.person.phones.should.equal(deal.person.phones);
                result.person.emails[0].should.equal(deal.person.emails[0]);
                result.person.social.should.equal(deal.person.social);
                result.person.address.should.equal(deal.person.address);
                done();
            });
        });
    });
});