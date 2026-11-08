export interface SCADAPlantState {
  // Discrete Coils (0x)
  pumpInletState: boolean;       // Coil 00001
  valveOutletState: boolean;     // Coil 00002
  emergencyShutdownTrip: boolean;// Coil 00003
  manualOverride: boolean;       // Coil 00004

  // Holding Registers (4x)
  waterLevelCm: number;          // Reg 40001 (0 - 1000 cm)
  maxSafeLevelCm: number;        // Reg 40002 (Default: 800 cm)
  inletFlowRate: number;         // Reg 40003 (L/min)
  outletFlowRate: number;        // Reg 40004 (L/min)
  pressurePsi: number;           // Reg 40005 (Calculated hydrostatic)
  alarmStatusCode: number;       // Reg 40006 (0: NORMAL, 1: HI_WARN, 2: OVERFLOW)

  // Simulation telemetry
  isOverflowing: boolean;
  overflowCounter: number;
  lastCommandTimestamp: string;
}

export const INITIAL_PLANT_STATE: SCADAPlantState = {
  pumpInletState: true,
  valveOutletState: true,
  emergencyShutdownTrip: false,
  manualOverride: false,

  waterLevelCm: 450,
  maxSafeLevelCm: 800,
  inletFlowRate: 35.0,
  outletFlowRate: 35.0,
  pressurePsi: 42.4,
  alarmStatusCode: 0,

  isOverflowing: false,
  overflowCounter: 0,
  lastCommandTimestamp: "12:00:00 UTC",
};
