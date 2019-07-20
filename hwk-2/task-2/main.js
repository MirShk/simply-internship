const faker = require('faker');

class Caesar {
    static makeDecision() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                return Math.round(Math.random()) ? resolve("kill") : resolve("not kill"); // for easy testing set `1` instead of `Math.round(Math.random())`
            }, 3000);
        });
    }
}

class Gladiators {
    constructor() {
        this.gladiatorsArray = [];
    }
}

class Gladiator {
    constructor() {
        this.name = faker.name.findName();
        this.initialHealth = this.generateRandomNumInRangeWithPrecision(20, 30, 1);
        this.initialSpeed = this.generateRandomNumInRangeWithPrecision(1000, 5000, 0.001);
        this.health = this.initialHealth;
        this.speed = this.initialSpeed;
        this.power = this.generateRandomNumInRangeWithPrecision(2, 5, 0.1);
    }

    attack(gladiators) {
        return new Promise((resolve, reject) => {
            this.timer = setInterval(() => {
                this.chooseGladiatorToAttack(gladiators)
                    .then(ind => {
                        // for fixing floating point number's precision problem(from stackoverflow)
                        gladiators[ind].health = +((+gladiators[ind].health - this.power).toFixed(1));
                        if (gladiators[ind].health >= 15 && gladiators[ind].health <= 30) {
                            gladiators[ind].speed = (gladiators[ind].speed/3).toFixed(3);
                        } else {
                            gladiators[ind].speed = (gladiators[ind].initialSpeed * (gladiators[ind].health/gladiators[ind].initialHealth)).toFixed(2);
                        }

                        const text = `[${this.name}] hits [${gladiators[ind].name}] with power ${this.power}`;
                        console.log(text);
                        if (typeof document !== "undefined") {
                            const div = document.createElement("DIV");
                            const textnode = document.createTextNode(text);
                            div.appendChild(textnode);
                            document.getElementById("arena").appendChild(div);
                        }

                        if (gladiators[ind].health <= 0) {
                            clearInterval(this.timer);
                            return resolve({gladiators, ind});
                        }
                    })
                    .catch(() => {});
            }, this.speed);
        });
    }

    chooseGladiatorToAttack(gladiators) {
        return new Promise((resolve, reject) => {
            this.chooseGladTimer = setInterval(() => {
                const randGladInd = Math.round(this.generateRandomNumInRangeWithPrecision(0, gladiators.length - 2));
                if (gladiators[randGladInd].name !== this.name) {
                    clearInterval(this.chooseGladTimer);
                    resolve(randGladInd);
                } else {
                    reject("Can't attack myself!");
                }
            });
        });
    }

    generateRandomNumInRangeWithPrecision(min, max, step = 1) {
        return (Math.random() * (max - min + 1) + min).toFixed(Math.abs(Math.log10(step)));
    }
}

class Arena {
    static init() {
        const g1 = new Gladiator();
        const g2 = new Gladiator();
        const g3 = new Gladiator();
        let gladiators = new Gladiators().gladiatorsArray;
        gladiators.push(g1, g2, g3);

        const battleStatusLogger = (gladiators) => {
            let dyingId;
            Arena.startBattle(gladiators)
                .then((gladiatorsData) => {
                    gladiators = gladiatorsData.gladiators;
                    dyingId = gladiatorsData.ind;
                    return Arena.stopBattle(gladiatorsData.gladiators)
                })
                .then(() => {
                    return Caesar.makeDecision()
                })
                .then(decision => {
                    if (decision === "kill") {
                        const text = `[${gladiators[dyingId].name}] is dying`;
                        console.log(text);

                        if (typeof document !== "undefined") {
                            const div = document.createElement("DIV");
                            const textnode = document.createTextNode(text);
                            div.appendChild(textnode);
                            document.getElementById("arena").appendChild(div);
                        }
                    } else {
                        gladiators[dyingId].health += 50;
                    }

                    if (Arena.getAliveGladiators(gladiators).length === 1) {
                        const text1 = `[${Arena.getAliveGladiators(gladiators)[0].name}] won the battle with health ${Arena.getAliveGladiators(gladiators)[0].health}`;
                        console.log(text1);
                        if (typeof document !== "undefined") {
                            const div1 = document.createElement("DIV");
                            const textnode = document.createTextNode(text1);
                            div1.appendChild(textnode);
                            document.getElementById("arena").appendChild(div1);
                        }
                        return 0;
                    } else {
                        return battleStatusLogger(Arena.getAliveGladiators(gladiators));
                    }
                });
        };
        battleStatusLogger(gladiators);
    }

    static getAliveGladiators(gladiators) {
        return gladiators.filter(gladiator => gladiator.health > 0);
    }

    static startBattle(gladiators) {
        return new Promise((resolve, reject) => {
            gladiators.map((gladiator) => {
                gladiator.attack(gladiators)
                    .then((glads) => {
                        return resolve(glads);
                    })
            });
        });
    }

    static stopBattle(gladiators) {
        return new Promise((resolve, reject) => {
            gladiators.map(gladiator => {
                clearInterval(gladiator.timer);
                return resolve("cleared");
            });
        });
    }
}


Arena.init();
