// 1.1
function filterArrayByAge(arr) {
    return new Promise((resolve, reject) => {
        try {
            setInterval(() => {
                arr = arr.filter(person => person.checkAge());
                console.log(`persons --- `, arr);
                return resolve(arr);
            }, 1000);
        } catch (e) {
            return reject(e);
        }
    });
}

// 1.2
function generateRandomAgedPerson(min, max, persons) {
    setInterval(() => {
        const age1 = Math.round(Math.random() * (max - min) + min);
        //const age2 = Math.round(Math.random() * (max - min) + min);

        persons.push(new Person(age1, "Name"));
        //persons.push(new Person(age2, "Name"));

        filterArrayByAge(persons)
            .then(msg => {
                console.log(msg);
            })
            .catch(e => {
                console.log(`Error:: ${e}`);
            });
    }, 2000);
}

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

const p1 = new Person(37, "Mike");
const p2 = new Person(38, "Dave");
const p3 = new Person(30, "John");
const p4 = new Person(32, "Bill");
const persons = [p1, p2, p3, p4];

generateRandomAgedPerson(1, 50, persons);





