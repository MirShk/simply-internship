const faker = require('faker');

class Person {
    constructor(age, name) {
        this.age = age;
        this.name = name;
        this.incrementAge();
    }

    incrementAge() {
        this.timer = setInterval(() => {
            return this.age++;
        }, 1000);
    };

    checkAge(maxAge = 40) {
        return this.age >= maxAge;
    }
}

class People {
    constructor(peopleArray) {
        this.peopleArray = peopleArray;
    }

    filterPeopleByAge() {
        setInterval(() => {
            for (let i = 0; i < this.peopleArray.length; ++i) {
                const person = this.peopleArray[i];
                if (person.checkAge()) {
                    clearInterval(person.timer);
                    this.peopleArray.splice(i, 1);
                }
            }
            this._printPeople();
        }, 1000);
    }

    generateRandomAgedPerson(min = 1, max = 50) {
        setInterval(() => {
            const age = Math.round(Math.random() * (max - min) + min);
            this.peopleArray.push(new Person(age, `${faker.name.findName()}`));
        }, 2000);
    }

    _printPeople() {
        const formattedPeople = this.peopleArray.map((person) => {
            return {
                Name: person.name,
                Age: person.age
            };
        });

        console.log(formattedPeople);
        console.log("--------------------------------------------");
    }
}

class Main {
    static start() {
        const peopleArray = [];
        peopleArray.push(new Person(38, "Nikol Pashinyan"));
        peopleArray.push(new Person(37, "Mike Tyson"));
        peopleArray.push(new Person(30, "John Lennon"));
        peopleArray.push(new Person(32, "Bill Gates"));

        const people = new People(peopleArray);

        people.generateRandomAgedPerson();
        people.filterPeopleByAge();
    }
}

Main.start();






