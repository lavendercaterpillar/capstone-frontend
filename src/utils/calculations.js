// ASHRAE Constants
const CONSTANTS = {
  uWall: 0.36, // U-value for walls (W/m²K)
  uWindow: 2.7, // U-value for windows (W/m²K)
  shgc: 0.67, // Solar Heat Gain Coefficient
  occupancy: 0.1, // People per m² (10m²/person)
  sensiblePerPerson: 75, // W/person (sensible heat)
  latentPerPerson: 55, // W/person (latent heat)
  equipmentLoad: 10, // W/m²
  lightingLoad: 8, // W/m²
  infiltration: 0.5, // Air changes per hour (ACH)
  summerIndoorTemp: 24, // °C (75°F)
  winterIndoorTemp: 20, // °C (68°F)
};

// Helper function to safely parse inputs
const parseInput = (value) => {
  if (
    value === 'N/A' ||
    value === '' ||
    value === null ||
    value === undefined
  ) {
    return 0;
  }
  const num = parseFloat(value);
  return isNaN(num) ? 0 : num;
};

// Main calculation function
export const calculateLoadsFromInputs = (inputs) => {
  // Convert all inputs to numbers safely
  const numericInputs = {
    floorArea: parseInput(inputs.floorArea),
    walls: {
      north: {
        area: parseInput(inputs.northWallArea),
        windows: parseInt(parseInput(inputs.northWindowCount)),
      },
      south: {
        area: parseInput(inputs.southWallArea),
        windows: parseInt(parseInput(inputs.southWindowCount)),
      },
      east: {
        area: parseInput(inputs.eastWallArea),
        windows: parseInt(parseInput(inputs.eastWindowCount)),
      },
      west: {
        area: parseInput(inputs.westWallArea),
        windows: parseInt(parseInput(inputs.westWindowCount)),
      },
    },
    dryBulb: ((parseInput(inputs.dryBulbTemp) - 32) * 5) / 9, // Convert °F to °C
    wetBulb: ((parseInput(inputs.wetBulbTemp) - 32) * 5) / 9, // Convert °F to °C
    // Use dryBulb as fallback for seasonal temps
    summerTemp: ((parseInput(inputs.dryBulbTemp) - 32) * 5) / 9,
    winterTemp: ((parseInput(inputs.dryBulbTemp) - 32) * 5) / 9 - 10, // Approx winter delta
  };

  // Validate essential inputs
  if (numericInputs.floorArea <= 0) {
    throw new Error('Floor area must be greater than 0');
  }

  // Cooling Load Calculation (ASHRAE Chapter 18)
  const coolingLoad = calculateCoolingLoad(numericInputs);

  // Heating Load Calculation (ASHRAE Chapter 17)
  const heatingLoad = calculateHeatingLoad(numericInputs);

  // Convert results to BTU/hr (1 W = 3.41214 BTU/hr)
  const toBTU = (w) => Math.round(w * 3.41214);

  return {
    cooling: toBTU(coolingLoad.total),
    heating: toBTU(heatingLoad.total),
    componentBreakdown: {
      cooling: {
        walls: toBTU(coolingLoad.walls),
        windows: toBTU(coolingLoad.windows),
        people: toBTU(coolingLoad.people),
        equipment: toBTU(coolingLoad.equipment),
        lighting: toBTU(coolingLoad.lighting),
      },
      heating: {
        walls: toBTU(heatingLoad.walls),
        windows: toBTU(heatingLoad.windows),
      },
    },
  };
};

// Cooling load calculation
function calculateCoolingLoad({ floorArea, walls, dryBulb, summerTemp }) {
  const tempDiff = dryBulb - CONSTANTS.summerIndoorTemp;

  // Wall heat gain
  const wallHeat = Object.values(walls).reduce(
    (sum, wall) => sum + wall.area * CONSTANTS.uWall * tempDiff,
    0
  );

  // Window heat gain
  const windowHeat = Object.values(walls).reduce(
    (sum, wall) => sum + wall.windows * CONSTANTS.uWindow * tempDiff,
    0
  );

  // People load
  const people = floorArea * CONSTANTS.occupancy;
  const peopleLoad =
    people * (CONSTANTS.sensiblePerPerson + CONSTANTS.latentPerPerson);

  return {
    walls: wallHeat,
    windows: windowHeat,
    people: peopleLoad,
    equipment: floorArea * CONSTANTS.equipmentLoad,
    lighting: floorArea * CONSTANTS.lightingLoad,
    total:
      wallHeat +
      windowHeat +
      peopleLoad +
      floorArea * (CONSTANTS.equipmentLoad + CONSTANTS.lightingLoad),
  };
}

// Heating load calculation
function calculateHeatingLoad({ floorArea, walls, winterTemp }) {
  const tempDiff = CONSTANTS.winterIndoorTemp - winterTemp;

  // Wall heat loss
  const wallLoss = Object.values(walls).reduce(
    (sum, wall) => sum + wall.area * CONSTANTS.uWall * tempDiff,
    0
  );

  // Window heat loss
  const windowLoss = Object.values(walls).reduce(
    (sum, wall) => sum + wall.windows * CONSTANTS.uWindow * tempDiff,
    0
  );

  return {
    walls: wallLoss,
    windows: windowLoss,
    total: wallLoss + windowLoss,
  };
}
