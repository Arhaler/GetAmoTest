import { Router } from 'express';
import AmoApi from '../modules/amo-api/index.js';
import MinimalContactModel from '../modules/amo-api/types/contact.js';
import MinimalLeadModel from '../modules/amo-api/types/lead.js';

const router = Router({mergeParams: true});
const amoApi = AmoApi("testamocrmsm");

router.get('/contacts/updateOrCreate/:name/:phone/:email', async (req, res) => {
    const params = req.params;
    
    let contacts = new Array<MinimalContactModel>();

    let emailContacts = await amoApi.getContacts(params.email);
    let phoneContacts = await amoApi.getContacts(params.phone);

    if(emailContacts && emailContacts.success && emailContacts?.data?._embedded){
        contacts = contacts.concat(emailContacts.data._embedded.contacts);
    }

    if(phoneContacts && phoneContacts.success && phoneContacts?.data?._embedded){
        contacts = contacts.concat(phoneContacts.data._embedded.contacts);
    }
    
    if(contacts.length == 0){
        const newContacts:Array<MinimalContactModel> = [
            {
                name: params.name,
                first_name: "",
                last_name: "",
                custom_fields_values: [
                    {
                        field_code: "PHONE",
                        values: [
                            {
                                value: params.phone,
                            }
                        ]
                    },
                    {
                        field_code: "EMAIL",
                        values: [
                            {
                                value: params.email
                            }
                        ]
                    }
                ]
            }
        ];

        const result = await amoApi.createContacts(newContacts);
        if(!result || !result.success || !result.data?._embedded) return res.status(400).send(result?.data);

        contacts = result.data?._embedded.contacts;
    }else{
        for(let i = 0; i < contacts.length; i++){
            contacts[i].name = params.name;
            contacts[i].first_name = params.name;
            contacts[i].custom_fields_values = [
                {
                    field_code: "PHONE",
                    values: [
                        {
                            value: params.phone,
                        }
                    ]
                },
                {
                    field_code: "EMAIL",
                    values: [
                        {
                            value: params.email
                        }
                    ]
                }
            ]
        }

        const result = await amoApi.updateContacts(contacts);
        if(!result || !result.success || !result.data?._embedded) return res.status(400).send(result?.data);

        contacts = result.data?._embedded.contacts;
    }

    const leads = new Array<MinimalLeadModel>();
    for(let i = 0; i < contacts.length; i ++){
        leads.push({
            _embedded:{
                contacts:[
                    {
                        id: Number(contacts[i].id)
                    }
                ]
            }
        });
    }
    
    const result = await amoApi.createLeads(leads);
    if(!result || !result.success) return res.status(400).send(result?.data);

    res.status(200).send();
});

export default router;