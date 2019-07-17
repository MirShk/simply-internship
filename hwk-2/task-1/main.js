class Person {
    constructor(age, name) {
        this.age = age;
        this.name = name;

        setInterval(() => {
            this.incrementAge();
        }, 1000);
    }

    incrementAge() {
        return this.age++;
    };

    checkAge(maxAge = 40) {
        return this.age < maxAge;
    }
}

let instance = null;
class People {
    //static instance = new #People();
    constructor(){
        if(!instance){
            instance = this;
        }

        this.peopleArray = [];

        return instance;
    }
}

function filterArrayByAge(peopleArray) {
    setInterval(() => {
        let people = peopleArray;
        people = people.filter(person => person.checkAge());
        console.log(people);
    }, 1000);
}

function generateRandomAgedPerson(min, max, people) {
    setInterval(() => {
        const age = Math.round(Math.random() * (max - min) + min);
        people.push(new Person(age, `Name${age}`));
    }, 2000);
}

const peopleArray = new People().peopleArray;
peopleArray.push(new Person(37, "Mike"));
peopleArray.push(new Person(38, "Dave"));
peopleArray.push(new Person(30, "John"));
peopleArray.push(new Person(32, "Bill"));

generateRandomAgedPerson(1, 50, peopleArray);
filterArrayByAge(peopleArray);





