import RenderRoute from './RenderRoute';
import util from './RenderUtilities';

/*
 * Poblacion que engloba todas las posibles rutas entre dos puntos logicos en el array bidimensional
 */

class RenderPopulation {
    constructor(initialPosition, finalPosition, map, m, populationSize) {
        this.origin = initialPosition;
        this.target = finalPosition;
        this.mutationRate = m;
        this.generations = 0;
        //this.perfectScore = 1;
        this.finished = false;
        this.matingPool = [];
        this.best = 0;

        // Fill population with DNA instances
        this.population = Array(populationSize).fill(null);
        this.population = this.population.map(() => new RenderRoute(map, this.origin, this.target, true));

        //this.calcPopulationFitness();
    }

    // Calculate fitness value for every member of the population
    calcPopulationFitness() {
        this.population.forEach(member => {
            member.calculateTotalFitness();
        });
    }

    // Generate a weighed mating pool
    naturalSelection() {
        let maxFitness = 100000;

        this.matingPool = [];

        // Find the highest fitness value in the population
        this.population.forEach(member => {
            maxFitness = member.fitness < maxFitness ? member.fitness : maxFitness;
        });

        console.log(maxFitness);
        // Based on fitness, each member is added to the mating pool a weighed number of times
        // higher fitness = more instance in pool = more likely to be picked as a parent
        // lower fitness = less instance in pool = less likely to be picked as a parent
        this.population.forEach(member => {
            const fitness = util.map(member.fitness, 0, maxFitness, 0, 1);

            // Arbitrary multiplier
            let n = Math.floor(fitness * 5);
            for ( ; n >= 0; n--) {
                this.matingPool.push(member);
            }
        });
    }

    // Create a new generation
    generate() {

        this.population.forEach((member, i) => {

            // Random index for the pool
            const a = util.randomInt(0, this.matingPool.length - 1);
            const b = util.randomInt(0, this.matingPool.length - 1);

            // Picking a random item from the pool
            let partnerA = this.matingPool[a];
            let partnerB = this.matingPool[b];

            // Generating a child with DNA crossover
            let child = partnerA.crossover(partnerB);

            // Mutate DNA for diversity
            child.mutate(this.mutationRate);

            // Add child to the population
            this.population[i] = child;

        });
        this.generations += 1;
    }


    getBest() {
        return this.best;
    }

    evaluate() {
        let worldrecord = 1000;
        let index = 0;

        // Find the fittest member of the population
        this.population.forEach((member, i) => {
            if (member.fitness < worldrecord) {
                index = i;
                worldrecord = member.fitness;
            }
        });

        // Get best result so far
        this.best = this.population[index];

        // Stop simulation if found result
        //if (worldrecord === this.perfectScore) this.finished = true;
    }

    isFinished() {
        return this.finished;
    }

    getGenerations() {
        return this.generations;
    }

    // Get average fitness for the population
    getAverageFitness() {
        let total = 0;

        this.population.forEach(member => {
            total += member.fitness;
        });

        return total / this.population.length;
    }
}

export default RenderPopulation;