// ============================================================================
// ACADEMIC RECORD & STUDENT TELEMETRY SYSTEM
// MongoDB Shell (mongosh) Practical Script
// ============================================================================

// 1. INITIALIZE DATABASE & COLLECTION
// ============================================================================
const dbName = "universityPortalDB";
db = db.getSiblingDB(dbName);

// Drop existing collection to ensure a clean run every time the script executes
db.studentRecords.drop();
db.createCollection("studentRecords");

print(`\n[INFO] Connected to database: ${dbName}`);


// 2. BULK INSERT STUDENT DOCUMENTS
// ============================================================================
print("\n=== 1. INSERTING INITIAL COHORT DATA ===");

db.studentRecords.insertMany([
    {
        regNo: "24CSM01",
        fullName: "Arjun Nair",
        department: "CSM",
        semester: 5,
        cgpa: 8.8,
        score: 86,
        contactEmail: "arjun.nair@anits.edu.in"
    },
    {
        regNo: "24CSM02",
        fullName: "Sneha Deshmukh",
        department: "CSM",
        semester: 5,
        cgpa: 9.6,
        score: 94,
        contactEmail: "sneha.d@anits.edu.in"
    },
    {
        regNo: "24CSD03",
        fullName: "Rohan Kulkarni",
        department: "CSD",
        semester: 3,
        cgpa: 7.5,
        score: 71,
        contactEmail: "rohan.k@anits.edu.in"
    },
    {
        regNo: "24CSM04",
        fullName: "Divya Krishnan",
        department: "CSM",
        semester: 5,
        cgpa: 5.2,
        score: 44,
        contactEmail: "divya.k@anits.edu.in"
    },
    {
        regNo: "24IT05",
        fullName: "Kiran Babu",
        department: "IT",
        semester: 3,
        cgpa: 8.0,
        score: 78,
        contactEmail: "kiran.b@anits.edu.in"
    },
    {
        regNo: "24CSE06",
        fullName: "Vikramaditya Rao",
        department: "CSE",
        semester: 7,
        cgpa: 9.1,
        score: 90,
        contactEmail: "vikram.rao@anits.edu.in"
    }
]);

print("[SUCCESS] 6 Student documents inserted.");


// 3. RETRIEVE ALL RECORDS
// ============================================================================
print("\n=== 2. COMPLETE STUDENT ROSTER ===");
db.studentRecords.find().forEach(printjson);


// 4. FILTERING QUERIES (DEPARTMENT, SEMESTER, & SCORE THRESHOLDS)
// ============================================================================
print("\n=== 3. STUDENTS IN AI & ML (CSM) DEPARTMENT ===");
db.studentRecords.find({ department: "CSM" }).forEach(printjson);

print("\n=== 4. STUDENTS IN 3RD SEMESTER ===");
db.studentRecords.find({ semester: 3 }).forEach(printjson);

print("\n=== 5. DISTINCTION CANDIDATES (SCORE > 75) ===");
db.studentRecords.find({ score: { $gt: 75 } }).forEach(printjson);

print("\n=== 6. HONORS CANDIDATES (SCORE >= 85) ===");
db.studentRecords.find({ score: { $gte: 85 } }).forEach(printjson);

print("\n=== 7. REMEDIAL SUPPORT REQUIRED (SCORE < 50) ===");
db.studentRecords.find({ score: { $lt: 50 } }).forEach(printjson);


// 5. POINT LOOKUP USING REGISTRATION NUMBER
// ============================================================================
print("\n=== 8. FETCH SINGLE RECORD (regNo: 24CSM02) ===");
// Wrapped in printjson() so it actually prints when executed as a script
printjson(db.studentRecords.findOne({ regNo: "24CSM02" }));


// 6. DOCUMENT UPDATES (MODIFICATION OPERATIONS)
// ============================================================================
print("\n=== 9. UPDATING SCORE & CGPA FOR 24CSM02 ===");
db.studentRecords.updateOne(
    { regNo: "24CSM02" },
    { 
        $set: { 
            score: 99,
            cgpa: 9.9
        } 
    }
);
printjson(db.studentRecords.findOne({ regNo: "24CSM02" }));

print("\n=== 10. UPDATING EMAIL FOR 24CSM02 ===");
db.studentRecords.updateOne(
    { regNo: "24CSM02" },
    { $set: { contactEmail: "sneha.deshmukh.csm@anits.edu.in" } }
);
printjson(db.studentRecords.findOne({ regNo: "24CSM02" }));


// 7. DELETION OPERATION
// ============================================================================
print("\n=== 11. REMOVING TRANSFERRED STUDENT (regNo: 24IT05) ===");
db.studentRecords.deleteOne({ regNo: "24IT05" });

print("\n--- ROSTER COUNT AFTER DELETION: " + db.studentRecords.countDocuments() + " ---");


// 8. SORTING & RANKING OPERATIONS
// ============================================================================
print("\n=== 12. LEADERBOARD: SCORES IN DESCENDING ORDER ===");
db.studentRecords.find({}, { _id: 0, regNo: 1, fullName: 1, score: 1 })
    .sort({ score: -1 })
    .forEach(printjson);

print("\n=== 13. SCORES IN ASCENDING ORDER ===");
db.studentRecords.find({}, { _id: 0, regNo: 1, fullName: 1, score: 1 })
    .sort({ score: 1 })
    .forEach(printjson);

print("\n=== 14. DEPARTMENT TOPPER (HIGHEST SCORER) ===");
db.studentRecords.find()
    .sort({ score: -1 })
    .limit(1)
    .forEach(printjson);


// 9. INDEXING & QUERY OPTIMIZATION
// ============================================================================
print("\n=== 15. CREATING UNIQUE INDEX ON regNo ===");
// Enforcing uniqueness makes much more sense for a roll/registration number
db.studentRecords.createIndex({ regNo: 1 }, { unique: true });

print("\n=== 16. VERIFYING ACTIVE COLLECTION INDEXES ===");
db.studentRecords.getIndexes().forEach(printjson);

print("\n=== 17. INDEXED LOOKUP FOR regNo: 24CSM02 ===");
db.studentRecords.find({ regNo: "24CSM02" }).forEach(printjson);


// 10. FINAL SNAPSHOT
// ============================================================================
print("\n=== 18. FINAL STATE OF DATABASE ===");
db.studentRecords.find().forEach(printjson);

// ============================================================================
// END OF SCRIPT
// ============================================================================