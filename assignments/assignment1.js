// hierarchical inheritance
class vehicle {
    constructor(brand, model, year) {
        this.brand = brand;
        this.model = model;
        this.year = year;
    }


}
class car extends vehicle {
    constructor(brand, model, year, numberOfDoors) {
        super(brand, model, year);
        this.numberOfDoors = numberOfDoors;
    }
    showDoors() {
        console.log(this.numberOfDoors, " Doors", "brand", this.brand, "model", this.model, "year", this.year);
    }

}
class bike extends vehicle {
    constructor(brand, model, year, hasCarrier) {
        super(brand, model, year);
        this.hasCarrier = hasCarrier;
    }
    showCarrier() {
        console.log("Carrier:", this.hasCarrier, "brand", this.brand, "model", this.model, "year", this.year)
    }
}
let c1 = new car("porsche", "911 GT3 RS", "2024", "2")

c1.showDoors()
let b1 = new bike("Royal Enfield", "Classic 350", "2023", "yes")

b1.showCarrier()

// single inheritance
class employee {
    constructor(name, id, salary) {
        this.name = name;
        this.id = id;
        this.salary = salary;
    }
    displayEmployee() {
        console.log(this.name, this.id, this.salary);
    }
}
class Developer extends employee {
    constructor(name, id, salary, programmingLanguage) {
        super(name, id, salary);
        this.programmingLanguage = programmingLanguage;
    }
    showLanguage() {
        console.log(this.programmingLanguage);
    }
}
let e1 = new Developer("aaa", 101, 85000, "python");
e1.displayEmployee();
e1.showLanguage()

// multilevel inheritance
class person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

}
class student extends person {
    constructor(name, age, rollNumber) {
        super(name, age);
        this.rollNumber = rollNumber;
    }


}
class EngineeringStudent extends student {
    constructor(name, age, rollNumber, branch) {
        super(name, age, rollNumber);
        this.branch = branch;
    }
    display() {
        console.log("Name:", this.name);
        console.log("Age:", this.age);
        console.log("Roll Number:", this.rollNumber);
        console.log("Branch:", this.branch);
    }
}
let es1 = new EngineeringStudent("aaa", 21, 101, "csm");
es1.display();

