import { Request, Response } from 'express';
import {Contact} from '../models/contacts'
import { Op } from 'sequelize';

export const handleContacts = async (req:Request, res:Response) => {
    const { email, phoneNumber } = req.body;
  if (!email && !phoneNumber)  res.status(400).json({ error: 'Email or phoneNumber required' });

  const contact = await findOrCreateContact(email, phoneNumber);
   res.json({ contact });
}

// Helper function
async function findOrCreateContact(email:string, phoneNumber:string) {
    const allMatchingContacts = await Contact.findAll({
    where: {
      [Op.or]: [
        email ? { email } : {},
        phoneNumber ? { phoneNumber } : {}
      ]
    },
    order: [['createdAt', 'ASC']]
  });

  let primary = null;
  if (allMatchingContacts.length === 0) {
    const newContact = await Contact.create({ email, phoneNumber });
    primary = newContact;
  } else {
    const primaries = allMatchingContacts.filter(c => c.getDataValue('linkPrecedence') === 'primary');
    primary = primaries.sort((a, b) => a.getDataValue('createdAt').getTime() - b.getDataValue('createdAt').getTime())[0];

    const exists = allMatchingContacts.some(c => c.getDataValue('email') === email && c.getDataValue('phoneNumber') === phoneNumber);
    if (!exists) {
      await Contact.create({
        email,
        phoneNumber,
        linkedId: primary.getDataValue('id'),
        linkPrecedence: 'secondary'
      });
    }

    for (const contact of allMatchingContacts) {
      if (contact.getDataValue('linkPrecedence') === 'primary' && contact.getDataValue('id') !== primary.getDataValue('id')) {
        await contact.update({
          linkedId: primary.getDataValue('id'),
          linkPrecedence: 'secondary'
        });
      }
    }
  }

  const all = await Contact.findAll({
    where: {
      [Op.or]: [
        { id: primary.getDataValue('id') },
        { linkedId: primary.getDataValue('id') }
      ]
    }
  });

  const emails = [...new Set(all.map(c => c.getDataValue('email')).filter(Boolean))];
  const phoneNumbers = [...new Set(all.map(c => c.getDataValue('phoneNumber')).filter(Boolean))];
  const secondaryContactIds = all.filter(c => c.getDataValue('linkPrecedence') === 'secondary').map(c => c.getDataValue('id'));

  return {
    primaryContactId: primary.getDataValue('id'),
    emails,
    phoneNumbers,
    secondaryContactIds
  };
}