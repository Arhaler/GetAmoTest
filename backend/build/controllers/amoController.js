import { Router } from 'express';
const router = Router({ mergeParams: true });
router.get('/amo/updateAuthCode', (req, res) => {
    console.log(`Update auth code callback works.`);
    res.status(200).send();
});
export default router;
//# sourceMappingURL=amoController.js.map