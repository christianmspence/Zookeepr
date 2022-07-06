const fs = require("fs");
const {
    filterByQuery,
    findById,
    createNewZookeeper,
    validateZookeeper,
} = require("../lib/zookeepers");
const { zookeepers } = require("../data/zookeepers.json");

jest.mock('fs');

test("creates a new zookeeper", () => {
    const zookeeper = createNewZookeeper(
        { name: "Darlene", id: "jhgdja3ng2" },
        zookeepers
    );

    expect(zookeeper.name).toBe("Darlene");
    expect(zookeeper.id).toBe("jhgdja3ng2");
});

test("filters by query", () => {
    const startingzookeepers = [
        {
            id: "13",
            name: "Tom",
            age: 42,
            favoriteAnimal: "kangaroo",
        },
        {
            id: "14",
            name: "Sarah",
            age: 29,
            favoriteAnimal: "cheetah",
        },
    ];

    const updatedzookeepers = filterByQuery({ age: "42" }, startingzookeepers);

    expect(updatedzookeepers.length).toEqual(1);
});

test("finds by id", () => {
    const startingzookeepers = [
        {
            id: "13",
            name: "Tom",
            age: "42",
            favoriteAnimal: "kangaroo",
        },
        {
            id: "14",
            name: "Sarah",
            age: "29",
            favoriteAnimal: "cheetah",
        },
    ];

    const result = findById("13", startingzookeepers);

    expect(result.name).toBe("Tom");
});

test("validates personality traits", () => {
    const zookeeper = {

        id: "13",
        name: "Tom",
        age: "42",
        favoriteAnimal: "kangaroo",
    };

    const invalidzookeeper = {

        id: "13",
        name: "Tom",
        age: "42",
    };

    const result = validateZookeeper(zookeeper);
    const result2 = validateZookeeper(invalidzookeeper);

    expect(result).toBe(true);
    expect(result2).toBe(false);
});