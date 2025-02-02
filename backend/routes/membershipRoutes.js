import { Router } from 'express';
import { getMemberships, getMembershipById, createMembership, updateMembership, deleteMembership, assignMembership, revokeMembership } from '../controllers/membershipController.js';

const router = Router();

router.get('/', getMemberships);
router.get('/:id', getMembershipById);
router.post('/', createMembership);
router.put('/:id', updateMembership);
router.delete('/:id', deleteMembership);
router.post('/assign', assignMembership);
router.post('/revoke', revokeMembership);

export default router;