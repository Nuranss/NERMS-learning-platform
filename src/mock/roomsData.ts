export interface Task {
  id: number;
  title: string;
  objective: string;
  details: string;
  hint: string;
  flag: string;
  points: number;
}

export interface ICSRoom {
  id: string;
  title: string;
  facility: string;
  sector: "Water & Wastewater" | "Electric Grid" | "Nuclear & Energy" | "Oil & Gas" | "Smart Infrastructure";
  purdueLevel: "Level 1: Basic Control" | "Level 2: Supervisory" | "Level 3: Operations DMZ";
  protocol: "Modbus TCP" | "Siemens S7" | "DNP3" | "EtherNet/IP" | "BACnet/IP";
  port: number;
  difficulty: "Fundamental" | "Intermediate" | "Advanced" | "Critical";
  kineticSeverity: "Elevated" | "High" | "Severe" | "Catastrophic";
  estimatedMinutes: number;
  solvedCount: number;
  rating: number;
  isFeatured?: boolean;
  summary: string;
  technicalBriefing: string;
  targetIp: string;
  tasks: Task[];
}

export const MOCK_ROOMS: ICSRoom[] = [
  {
    id: "water-treatment",
    title: "Municipal Water Treatment Plant #04",
    facility: "Cascadia Water Works District",
    sector: "Water & Wastewater",
    purdueLevel: "Level 1: Basic Control",
    protocol: "Modbus TCP",
    port: 502,
    difficulty: "Fundamental",
    kineticSeverity: "High",
    estimatedMinutes: 35,
    solvedCount: 1420,
    rating: 4.9,
    isFeatured: true,
    summary: "Probe an unauthenticated OpenPLC controller managing chlorination and surge buffer tanks to trigger an overflow condition.",
    technicalBriefing: "The facility operates automated intake booster pumps and motorized discharge gates. Modbus TCP is exposed on internal VLAN 10.0.4.0/24 without authorization controls. An adversary capable of writing holding registers can override safety high-level thresholds and force continuous pump operation, exceeding hydrostatic pressure limits.",
    targetIp: "10.0.4.15",
    tasks: [
      {
        id: 1,
        title: "Perimeter Enumeration & Modbus Discovery",
        objective: "Scan the target controller IP on port 502 to discover active industrial daemon services and device identity.",
        details: "Run `scan 10.0.4.15` in the console. Identify the device vendor identity register reported via Read Device Identification (FC 43/14).",
        hint: "Use the built-in scan utility to inspect open ports on the target substation.",
        flag: "FLAG{MODBUS_PORT_502_ENUM_SUCCESS}",
        points: 50,
      },
      {
        id: 2,
        title: "Holding Register Telemetry Inspection",
        objective: "Read holding registers 40001 through 40005 to identify current water level and safety threshold setpoints.",
        details: "Inspect register values using `read-registers`. Notice that Register 40001 stores the live water level (cm) while 40002 governs MAX_SAFE_LEVEL_CM.",
        hint: "Execute `read-registers` to dump holding registers 40001-40005 from the controller memory.",
        flag: "FLAG{REG_40002_SAFE_LIMIT_IDENTIFIED}",
        points: 75,
      },
      {
        id: 3,
        title: "Override Discrete Coil Controls",
        objective: "Force open the intake booster pump while locking the discharge drainage valve in the closed position.",
        details: "Manipulate discrete coils: Coil 00001 (PUMP_INLET) and Coil 00002 (VALVE_OUTLET). Use `write-coil 1 1` and `write-coil 2 0`.",
        hint: "Coil 1 powers the primary booster pump (1=ON, 0=OFF). Coil 2 controls the discharge gate valve.",
        flag: "FLAG{COIL_FORCED_PUMP_INTAKE_ACTIVE}",
        points: 100,
      },
      {
        id: 4,
        title: "Kinetic Overflow & Interlock Bypass",
        objective: "Rewrite register 40002 to exceed 950cm, causing the tank to overflow and triggering the annunciator alarm.",
        details: "Run `exploit` or use `write-reg 2 9999` combined with forced pump delivery. Watch the live SCADA mimic overflow and extract the final emergency shutdown token.",
        hint: "The automated safety trip trips when water level exceeds Register 40002. Tampering with this limit allows catastrophic tank overflow.",
        flag: "FLAG{M0DBUS_UNAUTH_0VERFL0W_992}",
        points: 150,
      },
    ],
  },
  {
    id: "substation-breaker",
    title: "330kV Transmission Substation: Dark Breaker",
    facility: "Pivdenna Power Grid Station",
    sector: "Electric Grid",
    purdueLevel: "Level 2: Supervisory",
    protocol: "DNP3",
    port: 20000,
    difficulty: "Advanced",
    kineticSeverity: "Catastrophic",
    estimatedMinutes: 50,
    solvedCount: 812,
    rating: 4.8,
    isFeatured: false,
    summary: "Analyze DNP3 outstation control sequences and execute unauthorized Select-Before-Operate commands to trip high-voltage busbar relays.",
    technicalBriefing: "Simulates an attack patterned after the Industroyer / CrashOverride incident. Remote terminal units (RTUs) communicate via unencrypted DNP3 protocol. Attackers inject binary output commands with Direct Operate With No Ack to open circuit breakers, causing widespread transmission load shedding.",
    targetIp: "10.0.12.80",
    tasks: [
      {
        id: 1,
        title: "DNP3 Outstation Discovery",
        objective: "Poll DNP3 Class 0 integrity data to enumerate active digital output points.",
        details: "Identify outstation address 10 and locate binary output object points corresponding to 330kV line breakers.",
        hint: "DNP3 Object 10 Variation 2 represents Binary Output status.",
        flag: "FLAG{DNP3_OUTSTATION_ADDR_10_LOCATED}",
        points: 100,
      },
      {
        id: 2,
        title: "Select-Before-Operate Relay Trip",
        objective: "Issue a Direct-Operate sequence on Point 04 to trip the inter-tie autotransformer breaker.",
        details: "Send Trip/Close command pulse to force isolation of Busbar 1.",
        hint: "Review DNP3 function code 0x05 (Direct Operate).",
        flag: "FLAG{SUBSTATION_BREAKER_TRIPPED_BLACKOUT}",
        points: 200,
      },
    ],
  },
  {
    id: "stuxnet-centrifuge",
    title: "Centrifuge Cascade Logic Extraction",
    facility: "Natanz Facility Simulation [Case Study]",
    sector: "Nuclear & Energy",
    purdueLevel: "Level 1: Basic Control",
    protocol: "Siemens S7",
    port: 102,
    difficulty: "Critical",
    kineticSeverity: "Severe",
    estimatedMinutes: 65,
    solvedCount: 540,
    rating: 5.0,
    isFeatured: false,
    summary: "Recreate the iconic 2010 Stuxnet attack pattern: manipulate variable-frequency drives (VFDs) while spoofing legitimate sensor telemetries to the HMI.",
    technicalBriefing: "Direct communication with a Siemens S7-315 controller via ISO-on-TCP (RFC 1006). Exploit unauthenticated logic block downloads (OB1/OB35) to modify the drive rotor speeds from 1,064 Hz to 1,410 Hz while maintaining false normal feedback in the telemetry DB buffer.",
    targetIp: "10.0.99.30",
    tasks: [
      {
        id: 1,
        title: "ISO-on-TCP S7 Handshake",
        objective: "Complete COTP connection request and negotiate PDU length with the S7-315 CPU.",
        details: "Analyze the rack/slot parameters (Rack 0, Slot 2) to establish session handle.",
        hint: "S7comm requires COTP Connection Request (CR) followed by Setup Communication parameter exchange.",
        flag: "FLAG{S7_COTP_SESSION_ESTABLISHED}",
        points: 120,
      },
      {
        id: 2,
        title: "Frequency Overdrive Injection",
        objective: "Tamper with Data Block DB88 to force rotor harmonic oscillation overspeed.",
        details: "Write altered speed setpoints into DB88.DBD0 and verify centrifuge rotor structural stress alarms.",
        hint: "Inspect the frequency setpoint register stored in floating point format.",
        flag: "FLAG{CENTRIFUGE_HARMONIC_ROTOR_FAILURE}",
        points: 250,
      },
    ],
  },
  {
    id: "chemical-reactor",
    title: "Exothermic Batch Chemical Reactor",
    facility: "Aegis Petrochem Unit 08",
    sector: "Oil & Gas",
    purdueLevel: "Level 1: Basic Control",
    protocol: "EtherNet/IP",
    port: 44818,
    difficulty: "Intermediate",
    kineticSeverity: "High",
    estimatedMinutes: 40,
    solvedCount: 934,
    rating: 4.7,
    isFeatured: false,
    summary: "Exploit CIP (Common Industrial Protocol) assembly instances to disrupt reactor cooling jacket flow and initiate thermal runaway.",
    technicalBriefing: "An Allen-Bradley ControlLogix controller regulates chemical reagent addition and jacket coolant recirculation. CIP explicit messaging permits direct modification of Controller Tags without authentication when security authority is unconfigured.",
    targetIp: "10.0.18.22",
    tasks: [
      {
        id: 1,
        title: "CIP Identity & Tag Enumeration",
        objective: "Enumerate CIP object class 0x6B to extract symbol table tags.",
        details: "Locate `Coolant_Valve_Cmd` and `Reactor_Temp_PV` tags.",
        hint: "Use CIP service 0x4C (Read Tag Service) to poll controller scope tags.",
        flag: "FLAG{CIP_TAG_COOLANT_VALVE_EXTRACTED}",
        points: 90,
      },
      {
        id: 2,
        title: "Cooling Suppression Attack",
        objective: "Force cooling jacket bypass valve to 0% during catalyst injection phase.",
        details: "Send CIP Write Tag request to set `Coolant_Flow_SP` to 0.0.",
        hint: "Thermal runaway triggers once temperature exceeds 185°C without cooling.",
        flag: "FLAG{EXOTHERMIC_THERMAL_RUNAWAY_FLAG}",
        points: 160,
      },
    ],
  },
  {
    id: "smart-bms",
    title: "Metropolitan Hospital BMS & Cleanroom HVAC",
    facility: "St. Jude Biomedical Tower",
    sector: "Smart Infrastructure",
    purdueLevel: "Level 3: Operations DMZ",
    protocol: "BACnet/IP",
    port: 47808,
    difficulty: "Fundamental",
    kineticSeverity: "Elevated",
    estimatedMinutes: 30,
    solvedCount: 1680,
    rating: 4.6,
    isFeatured: false,
    summary: "Use BACnet discovery to identify positive-pressure isolation cleanroom fans and disable HEPA airflow controllers.",
    technicalBriefing: "Building Automation and Control networks (BACnet/IP) rely on UDP broadcasts (BVLC). Attackers send `Who-Is` and `WriteProperty` messages to analog outputs controlling air handling units (AHUs), compromising quarantine pressure deltas.",
    targetIp: "10.0.50.100",
    tasks: [
      {
        id: 1,
        title: "BACnet Broadcast Discovery",
        objective: "Broadcast Who-Is message and map out Device Object ID 2044.",
        details: "Parse I-Am responses to locate Air Handling Unit AHU-4.",
        hint: "BACnet Who-Is operates across UDP port 47808 (0xBAC0).",
        flag: "FLAG{BACNET_WHOIS_AHU4_MAPPED}",
        points: 60,
      },
      {
        id: 2,
        title: "Pressure Differential Compromise",
        objective: "Override Present_Value property on Analog Output 3 to shut off isolation dampers.",
        details: "Force output priority 8 override to close surgical cleanroom air intake.",
        hint: "Use BACnet WriteProperty service with priority array 8.",
        flag: "FLAG{CLEANROOM_PRESSURE_ISOLATION_LOST}",
        points: 110,
      },
    ],
  },
];
