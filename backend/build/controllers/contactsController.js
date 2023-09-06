var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Router } from 'express';
import AmoApi from '../modules/amo-api/index.js';
const router = Router({ mergeParams: true });
const amoApi = AmoApi("testamocrmsm");
router.get('/contacts', (req, res) => {
    res.status(200).send("Controller works");
});
router.get('/contacts/updateOrCreate/:name/:phone/:email', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f;
    const params = req.params;
    let contacts = new Array();
    let emailContacts = yield amoApi.getContacts(params.email);
    let phoneContacts = yield amoApi.getContacts(params.phone);
    if (emailContacts && emailContacts.success && ((_a = emailContacts === null || emailContacts === void 0 ? void 0 : emailContacts.data) === null || _a === void 0 ? void 0 : _a._embedded)) {
        contacts = contacts.concat(emailContacts.data._embedded.contacts);
    }
    if (phoneContacts && phoneContacts.success && ((_b = phoneContacts === null || phoneContacts === void 0 ? void 0 : phoneContacts.data) === null || _b === void 0 ? void 0 : _b._embedded)) {
        contacts = contacts.concat(phoneContacts.data._embedded.contacts);
    }
    if (contacts.length == 0) {
        const newContacts = [
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
        const result = yield amoApi.createContacts(newContacts);
        if (!result || !result.success || !((_c = result.data) === null || _c === void 0 ? void 0 : _c._embedded))
            return res.status(400).send(result === null || result === void 0 ? void 0 : result.data);
        contacts = (_d = result.data) === null || _d === void 0 ? void 0 : _d._embedded.contacts;
    }
    else {
        for (let i = 0; i < contacts.length; i++) {
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
            ];
        }
        const result = yield amoApi.updateContacts(contacts);
        if (!result || !result.success || !((_e = result.data) === null || _e === void 0 ? void 0 : _e._embedded))
            return res.status(400).send(result === null || result === void 0 ? void 0 : result.data);
        contacts = (_f = result.data) === null || _f === void 0 ? void 0 : _f._embedded.contacts;
    }
    const leads = new Array();
    for (let i = 0; i < contacts.length; i++) {
        leads.push({
            _embedded: {
                contacts: [
                    {
                        id: Number(contacts[i].id)
                    }
                ]
            }
        });
    }
    const result = yield amoApi.createLeads(leads);
    if (!result || !result.success)
        return res.status(400).send(result === null || result === void 0 ? void 0 : result.data);
    res.status(200).send();
}));
export default router;
//# sourceMappingURL=contactsController.js.map