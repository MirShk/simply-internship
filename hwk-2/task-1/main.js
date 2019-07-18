class Person {
    constructor(age, name) {
        this.age = age;
        this.name = name;
        this.incrementAge();
    }

    incrementAge() {
        setInterval(() => {
            return this.age++;
        }, 1000);
    };

    checkAge(maxAge = 40) {
        return this.age < maxAge;
    }
}

let PeopleInstance = null;
class People {
    constructor(){
        if(!PeopleInstance){
            PeopleInstance = this;
        }

        this.peopleArray = [];
        return PeopleInstance;
    }
}

function filterArrayByAge(peopleArray) {
    setInterval(() => {
        let people = peopleArray;
        people = people.filter(person => person.checkAge());
        console.log(people);
        console.log("------------------------");
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





