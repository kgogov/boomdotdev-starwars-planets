export default class StarWarsPlanets {
    constructor() {
        this.planets = [];
        this.count = null;
    }

    async fetchAndDecode(url) {
        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();

        } catch (error) {
            console.log(error);
        }
    }

    async init() {
        const URL = `https://swapi.boom.dev/api/planets/`;
        let next = URL;

        while (next) {
            const planets = await this.fetchAndDecode(next);
            next = planets.next;

            this.planets = [...this.planets, ...planets.results];

            if (!this.count) {
                this.count = planets.count;
            }
        }
    }
}