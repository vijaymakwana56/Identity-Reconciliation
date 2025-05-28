# Contact Identification API

This project provides a RESTful API to identify and manage contact records based on incoming email and/or phone number input. It supports linking of contacts as primary and secondary entries depending on existing data.

---

## Features

- Accepts contact details (`email` and/or `phoneNumber`)
- Checks if the contact exists
- Links related contacts by creating primary or secondary entries
- Returns a unified view of all linked contact information

---

##  Tech Stack

- **Backend**: Node.js + Express
- **Database**: PostgreSQL
- **ORM**: Sequelize
- **Language**: TypeScript
- **Deployment**: Render

---

##  Installation (Local)

1. **Clone the repository**

   ```bash
   git clone https://github.com/vijaymakwana56/Identity-Reconciliation


##   API Endpoint

- Identifies a contact by email and/or phoneNumber. If a matching record exists, it links them accordingly; otherwise, it creates a new contact.
- **App URL**: https://identity-reconciliation-p19w.onrender.com/identify
- **Body Example**: {
  "email": "hello@123",
  "phoneNumber": "123"
}

- **Response Example**: {
  "contact": {
    "primaryContactId": 1,
    "emails": ["hello@123"],
    "phoneNumbers": ["123"],
    "secondaryContactIds": []
  }
}


