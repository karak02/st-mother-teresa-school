const https = require('https');
const fs = require('fs');

// Simple .env loader
if (fs.existsSync('.env')) {
  fs.readFileSync('.env', 'utf8').split('\n').forEach(line => {
    const [k, ...v] = line.split('=');
    if (k && v.length) process.env[k.trim()] = v.join('=').trim();
  });
}

const token = process.env.AIRTABLE_PAT;
const baseId = process.env.AIRTABLE_BASE_ID || 'appobdzv7otsf1fIF';

function apiRequest(path, method = 'GET', body = null) {
  return new Promise((resolve, reject) => {
    const dataString = body ? JSON.stringify(body) : null;
    const req = https.request({
      hostname: 'api.airtable.com',
      path: path,
      method: method,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        ...(dataString ? { 'Content-Length': Buffer.byteLength(dataString) } : {})
      }
    }, (res) => {
      let responseBody = '';
      res.on('data', chunk => responseBody += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(responseBody);
          resolve({ status: res.statusCode, data: parsed });
        } catch (e) {
          resolve({ status: res.statusCode, data: responseBody });
        }
      });
    });

    req.on('error', reject);
    if (dataString) req.write(dataString);
    req.end();
  });
}

async function createTable(tableDefinition) {
  console.log(`Creating table: ${tableDefinition.name}...`);
  const res = await apiRequest(`/v0/meta/bases/${baseId}/tables`, 'POST', tableDefinition);
  console.log(`Table '${tableDefinition.name}' create status:`, res.status);
  if (res.status >= 200 && res.status < 300) {
    console.log(`✅ Table created with ID: ${res.data.id}`);
    return res.data;
  } else {
    console.error(`❌ Failed to create table '${tableDefinition.name}':`, res.data);
    return null;
  }
}

async function insertRecords(tableNameOrId, records) {
  console.log(`Inserting ${records.length} records into ${tableNameOrId}...`);
  const res = await apiRequest(`/v0/${baseId}/${encodeURIComponent(tableNameOrId)}`, 'POST', {
    records: records.map(fields => ({ fields }))
  });
  console.log(`Insert status: ${res.status}`);
  if (res.status >= 200 && res.status < 300) {
    console.log(`✅ Inserted ${res.data.records.length} records into ${tableNameOrId}`);
  } else {
    console.error(`❌ Failed to insert records:`, res.data);
  }
}

async function runSetup() {
  console.log('=== Step 1: Checking Existing Tables ===');
  const existingRes = await apiRequest(`/v0/meta/bases/${baseId}/tables`);
  const existingTables = existingRes.data?.tables || [];
  console.log(`Found ${existingTables.length} existing tables:`, existingTables.map(t => t.name));

  // 1. Table: Admission Enquiries
  const admissionTableDef = {
    name: "Admission Enquiries",
    description: "Student Admission Enquiry Applications submitted from the website",
    fields: [
      {
        name: "Student Name",
        type: "singleLineText"
      },
      {
        name: "Guardian Name",
        type: "singleLineText"
      },
      {
        name: "Applying Class",
        type: "singleSelect",
        options: {
          choices: [
            { name: "Pre-Primary Section (10AM to 12PM)" },
            { name: "Class 1 (10AM to 4PM)" },
            { name: "Class 2 (10AM to 4PM)" },
            { name: "Class 3 (10AM to 4PM)" },
            { name: "Class 4 (10AM to 4PM)" },
            { name: "Class 5 (10AM to 4PM)" },
            { name: "Class 6 (10AM to 4PM)" },
            { name: "Class 7 (10AM to 4PM)" },
            { name: "Class 8 (10AM to 4PM)" }
          ]
        }
      },
      {
        name: "Contact Phone",
        type: "phoneNumber"
      },
      {
        name: "Email",
        type: "email"
      },
      {
        name: "Message / Query",
        type: "multilineText"
      },
      {
        name: "Status",
        type: "singleSelect",
        options: {
          choices: [
            { name: "New Enquiry", color: "blueLight2" },
            { name: "Contacted Parent", color: "yellowLight2" },
            { name: "Interview Scheduled", color: "purpleLight2" },
            { name: "Enrolled", color: "greenLight2" },
            { name: "Archived", color: "grayLight2" }
          ]
        }
      }
    ]
  };

  // 2. Table: Career Applications
  const careerTableDef = {
    name: "Career Applications",
    description: "Teaching and Non-Teaching Staff Job Applications",
    fields: [
      {
        name: "Applicant Name",
        type: "singleLineText"
      },
      {
        name: "Position Applied For",
        type: "singleLineText"
      },
      {
        name: "Contact Phone",
        type: "phoneNumber"
      },
      {
        name: "Email",
        type: "email"
      },
      {
        name: "Experience & Qualifications",
        type: "multilineText"
      },
      {
        name: "Status",
        type: "singleSelect",
        options: {
          choices: [
            { name: "Applied", color: "blueLight2" },
            { name: "Shortlisted", color: "tealLight2" },
            { name: "Interview Scheduled", color: "yellowLight2" },
            { name: "Offer Extended", color: "greenLight2" },
            { name: "Rejected", color: "redLight2" }
          ]
        }
      }
    ]
  };

  // 3. Table: General Enquiries
  const generalEnquiryTableDef = {
    name: "General Enquiries",
    description: "General Contact, Campus Visit & Feedback queries from parents and visitors",
    fields: [
      {
        name: "Full Name",
        type: "singleLineText"
      },
      {
        name: "Contact Phone",
        type: "phoneNumber"
      },
      {
        name: "Email",
        type: "email"
      },
      {
        name: "Query Category",
        type: "singleSelect",
        options: {
          choices: [
            { name: "Fee Structure & Transport" },
            { name: "School Curriculum & Timings" },
            { name: "Campus Visit Request" },
            { name: "Extracurricular & Sports" },
            { name: "Other Enquiry" }
          ]
        }
      },
      {
        name: "Message",
        type: "multilineText"
      },
      {
        name: "Status",
        type: "singleSelect",
        options: {
          choices: [
            { name: "Unread", color: "redLight2" },
            { name: "In Progress", color: "yellowLight2" },
            { name: "Resolved", color: "greenLight2" }
          ]
        }
      }
    ]
  };

  console.log('\n=== Step 2: Creating 3 School Tables ===');
  let adTable = existingTables.find(t => t.name === "Admission Enquiries");
  if (!adTable) {
    adTable = await createTable(admissionTableDef);
  } else {
    console.log('Admission Enquiries table already exists:', adTable.id);
  }

  let carTable = existingTables.find(t => t.name === "Career Applications");
  if (!carTable) {
    carTable = await createTable(careerTableDef);
  } else {
    console.log('Career Applications table already exists:', carTable.id);
  }

  let genTable = existingTables.find(t => t.name === "General Enquiries");
  if (!genTable) {
    genTable = await createTable(generalEnquiryTableDef);
  } else {
    console.log('General Enquiries table already exists:', genTable.id);
  }

  console.log('\n=== Step 3: Generating realistic sample records ===');
  if (adTable) {
    await insertRecords(adTable.id, [
      {
        "Student Name": "Aarav Sharma",
        "Guardian Name": "Rajesh Sharma",
        "Applying Class": "Class 1 (10AM to 4PM)",
        "Contact Phone": "+91 98765 43210",
        "Email": "rajesh.sharma@example.com",
        "Message / Query": "Seeking admission for upcoming academic session. Looking for school transport details.",
        "Status": "New Enquiry"
      },
      {
        "Student Name": "Ananya Sen",
        "Guardian Name": "Debashis Sen",
        "Applying Class": "Pre-Primary Section (10AM to 12PM)",
        "Contact Phone": "+91 98301 23456",
        "Email": "debashis.sen@example.com",
        "Message / Query": "Enquiring about pre-primary curriculum, play area, and safety measures.",
        "Status": "Contacted Parent"
      },
      {
        "Student Name": "Rohan Mukherjee",
        "Guardian Name": "Priya Mukherjee",
        "Applying Class": "Class 5 (10AM to 4PM)",
        "Contact Phone": "+91 98123 45678",
        "Email": "priya.m@example.com",
        "Message / Query": "Transfer admission from another school. Need fee structure breakdown.",
        "Status": "Interview Scheduled"
      }
    ]);
  }

  if (carTable) {
    await insertRecords(carTable.id, [
      {
        "Applicant Name": "Soma Banerjee",
        "Position Applied For": "Primary Mathematics Teacher",
        "Contact Phone": "+91 98450 11223",
        "Email": "soma.banerjee@example.com",
        "Experience & Qualifications": "B.Ed, M.Sc Mathematics with 5 years teaching experience in CBSE/ICSE curriculum.",
        "Status": "Shortlisted"
      },
      {
        "Applicant Name": "Rahul Verma",
        "Position Applied For": "Physical Education & Sports Coach",
        "Contact Phone": "+91 97112 33445",
        "Email": "rahul.verma@example.com",
        "Experience & Qualifications": "B.P.Ed with state-level coaching background in Football and Swimming.",
        "Status": "Applied"
      }
    ]);
  }

  if (genTable) {
    await insertRecords(genTable.id, [
      {
        "Full Name": "Sunita Roy",
        "Contact Phone": "+91 98711 22334",
        "Email": "sunita.roy@example.com",
        "Query Category": "Campus Visit Request",
        "Message": "Would love to visit the school campus this Saturday to see the smart classrooms and science laboratories.",
        "Status": "Unread"
      },
      {
        "Full Name": "Amitabh Bose",
        "Contact Phone": "+91 99033 44556",
        "Email": "amitabh.bose@example.com",
        "Query Category": "Fee Structure & Transport",
        "Message": "Please share bus route timings and monthly conveyance charges for the South Kolkata area.",
        "Status": "Resolved"
      }
    ]);
  }

  console.log('\n🎉 ALL 3 AIRTABLE TABLES & RECORDS CREATED AND CONFIGURED SUCCESSFULLY!');
}

runSetup().catch(console.error);
