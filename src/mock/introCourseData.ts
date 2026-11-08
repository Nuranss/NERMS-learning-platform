export interface IntroQuiz {
  id: string;
  question: string;
  correctHashes: string[];
  hint: string;
  formatGuide?: string;
  points: number;
}

export interface IntroTask {
  id: number;
  title: string;
  shortDescription: string;
  content: string[];
  hasDiagram?: "triad" | "components" | "purdue";
  keyTakeaways: string[];
  quizzes: IntroQuiz[];
}

export interface IntroCourse {
  id: string;
  title: string;
  subtitle: string;
  estimatedMinutes: number;
  tasks: IntroTask[];
}

export const INTRO_COURSE_DATA: IntroCourse = {
  id: "intro-to-ics",
  title: "Introduction to ICS & OT Cybersecurity",
  subtitle: "A clear, hands-on foundation covering plant components, the Purdue Model, industrial protocols, and real-world kinetic threats.",
  estimatedMinutes: 45,
  tasks: [
    {
      id: 1,
      title: "What is Operational Technology (OT) and ICS?",
      shortDescription: "Understanding how Operational Technology differs fundamentally from standard enterprise IT.",
      content: [
        "In traditional enterprise IT (Information Technology), computing is centered around data: emails, credit card transactions, databases, and customer records. If a corporate server crashes or gets infected, the primary risks are data theft, reputational loss, or business interruption.",
        "Operational Technology (OT) and Industrial Control Systems (ICS), on the other hand, manage the physical world. OT refers to hardware and software designed to monitor and control physical devices: opening high-pressure oil valves, spinning power grid generators, chlorinating municipal drinking water, and regulating nuclear reactor temperatures.",
        "Because OT directly affects physical physics, chemistry, and human safety, the standard security priorities are completely inverted.",
        "In corporate IT, security professionals live by the CIA Triad: Confidentiality is king, followed by Integrity, with Availability coming last. IT systems routinely reboot for updates or go down for maintenance over weekends.",
        "In OT, the model flips to the AIC Triad (Availability, Integrity, Confidentiality). Availability and Human Safety are paramount. If an automation controller reboots or drops packets for even 250 milliseconds in a high-speed assembly line or turbine hall, motors can seize, pipes can burst, and workers can lose their lives."
      ],
      hasDiagram: "triad",
      keyTakeaways: [
        "IT protects data and intellectual property; OT protects physical machinery and human lives.",
        "Availability is #1 in OT: continuous 24/7/365 uptime is mandatory. Unscheduled reboots are forbidden.",
        "In OT, cyber attacks have kinetic consequences: physical destruction, explosions, blackouts, and spills."
      ],
      quizzes: [
        {
          id: "q1-1",
          question: "In the OT security triad, which principle is prioritized above all others to ensure uninterrupted physical safety and operation?",
          correctHashes: [
            "442fa5ff1529f510b9611896d0624c889dd85cf34fe0686562ce5b060f06dac7",
            "d6adf55564110f44f994dbbf746f064dac8acbbcf7c423f9c569c55011cb9632",
            "d05c1c704e413b8f49ee26ae4e5d9375f6cd7493bfc7b8736875132f713db46c"
          ],
          hint: "Think about keeping power grids and water pumps running 24/7 without reboots.",
          formatGuide: "e.g. Confidentiality / Integrity / Availability",
          points: 10,
        },
        {
          id: "q1-2",
          question: "What general umbrella term describes computing systems that directly monitor or control physical machinery and industrial processes?",
          correctHashes: [
            "ecc729403e7168db93940fbd34f57bf13d67dc9185d42d1c8fa27ab4b54d9c58",
            "ae117aa7cc91d8b0b09c53c9984b807d8b55c70c0a3278c40afb5ca8387df0ee"
          ],
          hint: "Often contrasted with Information Technology (IT). Abbreviated as OT.",
          formatGuide: "e.g. Operational Technology",
          points: 10,
        },
      ],
    },
    {
      id: 2,
      title: "Anatomy of an Industrial Facility (PLCs, HMIs, and SCADA)",
      shortDescription: "Discover the physical components that power modern factories, pipelines, and utility plants.",
      content: [
        "Every modern automated facility relies on an interconnected ecosystem of industrial hardware working in tight feedback loops:",
        "1. Sensors (The Nerves): Field instruments that measure physical phenomena: water pressure in PSI, temperature in Celsius, fluid flow rates in liters per minute, and electrical current in amperes.",
        "2. Actuators (The Muscles): Physical mechanisms that perform mechanical work based on electrical signals: motorized gate valves, variable-speed pumps, heating coils, and high-voltage circuit breakers.",
        "3. Programmable Logic Controllers (PLCs) (The Brains): A rugged, industrial computer hardened against extreme dust, vibration, and electrical noise. PLCs run a continuous 'Scan Cycle' (Read Inputs -> Execute Logic -> Write Outputs) typically completed within 1 to 20 milliseconds. Control logic is commonly written in IEC 61131-3 languages such as Ladder Logic (which looks like electrical relay diagrams).",
        "4. Remote Terminal Units (RTUs): Similar to PLCs, but optimized for harsh, remote locations with low power consumption and long-range telemetry (e.g., oil pipelines spanning hundreds of miles across deserts or mountains).",
        "5. Human-Machine Interface (HMI): The graphical touchscreens and computer screens that allow human operators to see animated digital plant mimics, review sensor readings, and toggle actuators.",
        "6. SCADA & DCS: Supervisory Control and Data Acquisition (SCADA) systems manage large-scale, geographically dispersed infrastructure (like a city's water grid). Distributed Control Systems (DCS) manage dense, highly integrated continuous processes (like an oil refinery).",
        "7. Process Historian: A specialized high-performance time-series database that logs every register change, alarm, and sensor value for compliance auditing and forensic analysis."
      ],
      hasDiagram: "components",
      keyTakeaways: [
        "Sensors measure reality; actuators alter reality.",
        "PLCs execute deterministic automation logic in millisecond cyclic loops.",
        "HMIs give human operators visual visibility and supervisory control over the facility.",
        "Historians store time-series operational telemetry for process auditing."
      ],
      quizzes: [
        {
          id: "q2-1",
          question: "What ruggedized industrial computer directly executes automation programs (like Ladder Logic) to control physical actuators?",
          correctHashes: [
            "529de0e3226575164acaeba456d52259f10d19031e843e56cda2081e2b78e9d2",
            "3e7919cdee72f6fc03c28dbb43f8f974c10b4c255a3e2537035573435dbc5a9a"
          ],
          hint: "A three-letter acronym starting with P.",
          formatGuide: "e.g. PLC",
          points: 10,
        },
        {
          id: "q2-2",
          question: "What visual screen interface allows human operators to monitor sensor telemetry and issue supervisory commands to the plant?",
          correctHashes: [
            "655deaa5c89411c42c56d3ebfb9e9837aae23cbf711f08fa8a45abf9d55e13cd",
            "f23b9323d605d2c7b6ccccb6f5f676f9c865931b5b36106df7f323e214d4deb9",
            "7083b825f4cccb852a6e1a2c9db97f4fc25bc74268a24e1e8dccfeaad0b39bd5"
          ],
          hint: "Stands for Human-Machine Interface.",
          formatGuide: "e.g. HMI",
          points: 10,
        },
        {
          id: "q2-3",
          question: "What specialized industrial database continuously archives time-series sensor logs, alarms, and setpoints for historical auditing?",
          correctHashes: [
            "c924248ffe3ec89bdb9f3ff87eed0ffa4c26120a2903d79c38d9753e9f97dd92",
            "7c7d91deed6ec3f148b009341430edf281c058b6b18045bfb096be6f83b20488",
            "9b286de9450d0011185a0ebe8e26dd80f8cea9d68453ec363b900b1a48d2ec6e"
          ],
          hint: "The word comes from recording the plant's history.",
          formatGuide: "e.g. Historian",
          points: 10,
        },
      ],
    },
    {
      id: 3,
      title: "The Purdue Model (PERA) Demystified",
      shortDescription: "The international architectural standard for segmenting and defending industrial networks.",
      content: [
        "In corporate IT, zero-trust and micro-segmentation are common. But in industrial plants, networks are organized using the Purdue Enterprise Reference Architecture (PERA), formalized in the ISA-95 standard.",
        "The Purdue Model divides industrial operations into hierarchical levels (Level 0 through Level 5). The primary rule of Purdue architecture is that traffic should only flow between adjacent levels, strictly enforced by firewalls and access controls.",
        "• Level 0: The Physical Process (Actual physical sensors, actuators, pipes, and motors).",
        "• Level 1: Basic Control (PLCs, RTUs, and safety relays communicating directly with Level 0 instruments).",
        "• Level 2: Supervisory Control (HMIs, supervisory control servers, and engineering monitors).",
        "• Level 3: Site Operations & Control (Plant Historians, Engineering Workstations, and OT domain controllers).",
        "• Level 3.5: The Industrial DMZ (IDMZ) (The critical buffer zone with jump hosts and patch mirrors separating the OT factory from corporate IT).",
        "• Level 4 & 5: Enterprise Corporate Network (Office PCs, corporate email, ERP business software, and internet access).",
        "Why is this separation critical? An adversary phishing an accountant in corporate IT (Level 4) should NEVER have direct network access to send raw commands to a Level 1 PLC controlling a chemical valve."
      ],
      hasDiagram: "purdue",
      keyTakeaways: [
        "The Purdue Model organizes industrial networks into hierarchical security zones from Level 0 to 5.",
        "Level 0 is the physical physics; Level 1 is the controllers; Level 2 is the supervisory HMIs.",
        "The Industrial DMZ (Level 3.5) prevents direct corporate IT-to-OT routing, stopping lateral attack propagation."
      ],
      quizzes: [
        {
          id: "q3-1",
          question: "At which Purdue Model level do physical actuators, sensors, and valves reside?",
          correctHashes: [
            "3d48ba6863da2ad248a8066ef1e51440be965081694b517099a379d454ae073a",
            "a05993a050c4fdf848d899ec6f5320870e9065733577e9d1431a433f11238494"
          ],
          hint: "The lowest foundational level touching physical reality.",
          formatGuide: "e.g. Level 0",
          points: 10,
        },
        {
          id: "q3-2",
          question: "What is the standard reference model called that defines the hierarchical segmentation of industrial automation networks?",
          correctHashes: [
            "0442a7e05f5a08eec4f4e55385d4ace9fcf0223cbdebe83d301de52778045478",
            "d2a8fc52f78cbdd303b3cd3633b86ffd5693540dbf8b4e51d06e4892e5096a17",
            "5e8fa50ee06999ddd378f3aa5166f46162ded117ae1f94dff218912c7ecf552d"
          ],
          hint: "Named after the university where Theodore Williams originated it.",
          formatGuide: "e.g. Purdue Model",
          points: 10,
        },
        {
          id: "q3-3",
          question: "What intermediate security buffer zone (often designated Level 3.5) separates corporate business IT from plant floor operations?",
          correctHashes: [
            "a331cf5403fb3c260db0a50b1beca1d175ff6c50b23c91eebc7e5ddec2db1748",
            "d2c91f8a793a827bca8f1af72a95c0bf9d854fea1a8554186ea120230fcaa452",
            "3a54f493d848f140656f0e2a0d9c0edd54e4603d0947c9de3b9466762df8ab1e"
          ],
          hint: "An acronym standing for Industrial Demilitarized Zone.",
          formatGuide: "e.g. IDMZ",
          points: 10,
        },
      ],
    },
    {
      id: 4,
      title: "OT Protocols: Insecure by Design & Modbus Deep-Dive",
      shortDescription: "Why legacy industrial protocols have no encryption, no passwords, and trust every packet.",
      content: [
        "In modern web security, protocols like HTTPS, SSH, and TLS enforce mutual authentication and strong AES encryption. However, most industrial protocols in use today (Modbus, DNP3, Siemens S7, EtherNet/IP) were designed in the 1970s and 1980s.",
        "At that time, industrial plants were entirely isolated on dedicated serial cables (RS-485 / RS-232). Engineers never imagined that factories would one day connect to Ethernet and TCP/IP networks.",
        "As a result, classic industrial protocols are 'Insecure by Design':",
        "• Zero Authentication: There are no usernames or passwords. If an attacker can reach the PLC's IP address on the network, the PLC will execute whatever write command is sent.",
        "• Zero Encryption: Every command, register reading, and setpoint travels in cleartext, making passive eavesdropping and packet sniffing trivial with tools like Wireshark.",
        "• Zero Integrity Checks: Messages lack cryptographic signatures. Replay attacks and Man-in-the-Middle packet tampering succeed effortlessly.",
        "The Lingua Franca: Modbus TCP (Port 502)",
        "Modbus is the most widely supported protocol in the world. It organizes data into four simple memory tables:",
        "1. Discrete Inputs (1x): Read-only 1-bit values (e.g., proximity sensor: 1=Metal Detected, 0=Empty).",
        "2. Coils (0x): Read/Write 1-bit values (e.g., pump power: 1=Run, 0=Stop).",
        "3. Input Registers (3x): Read-only 16-bit analog words (e.g., current water temperature: 45°C).",
        "4. Holding Registers (4x): Read/Write 16-bit analog words (e.g., maximum pressure setpoint: 800 PSI)."
      ],
      keyTakeaways: [
        "Legacy OT protocols are unauthenticated and unencrypted by default.",
        "Modbus TCP operates across standard TCP port 502.",
        "Modbus 'Coils' represent binary read/write points (ON/OFF); 'Holding Registers' represent analog read/write words."
      ],
      quizzes: [
        {
          id: "q4-1",
          question: "What standard TCP port is utilized by Modbus TCP communication?",
          correctHashes: [
            "8f7883b791032befa565304bc5e6b81258919f99de4cec7ad5249acb185e7818"
          ],
          hint: "A standard 3-digit port number.",
          formatGuide: "e.g. 502",
          points: 10,
        },
        {
          id: "q4-2",
          question: "In Modbus, what data type represents a single-bit read/write discrete output, typically used to turn a physical motor or valve ON or OFF?",
          correctHashes: [
            "03b481aabc9669f2d028ba0667beb47a93159529fd4e39a38915155b08ec971f",
            "5828440844989f11f82ad32f8b0b3d9bb7dffced53627ad49cee2fc1d5ba8267"
          ],
          hint: "Named after electrical relay coils.",
          formatGuide: "e.g. Coil",
          points: 10,
        },
        {
          id: "q4-3",
          question: "True or False: Classic industrial protocols like standard Modbus TCP require a cryptographic password to issue command overrides.",
          correctHashes: [
            "53fc4a1dba1186bd2571f6d0785824eaa28f1de9343f56ac51fc5bfad51e4ec3",
            "30af7e098d36bcc29b1f317a098b5ecafa575cd70c05a4519d7432c8ed2a1f1b"
          ],
          hint: "Remember: legacy protocols are insecure by design.",
          formatGuide: "True or False",
          points: 10,
        },
      ],
    },
    {
      id: 5,
      title: "Safety Instrumented Systems (SIS) & Famous Kinetic Incidents",
      shortDescription: "The last line of physical defense and how historic cyber weapons changed warfare forever.",
      content: [
        "When an automation controller (PLC) fails or an adversary hacks into the SCADA network, what prevents a high-pressure chemical reactor from blowing up? The answer is the Safety Instrumented System (SIS).",
        "An SIS is an entirely independent safety controller (certified to international IEC 61508 / 61511 standards, such as Triconex or HIMA systems) with its own dedicated sensors and emergency cutoff valves. If pressure exceeds safe limits, the SIS automatically executes an Emergency Shutdown (ESD), overriding the normal PLC.",
        "Three Historic Attacks That Changed OT Security Forever:",
        "1. Stuxnet (2010): The world's first proven cyber weapon. Developed to target the Natanz uranium enrichment facility in Iran. Stuxnet crossed the air gap via infected USB drives, compromised Siemens S7-315 PLCs, and manipulated variable-frequency drive rotor speeds (over-spinning and under-spinning centrifuges until they physically shattered) while spoofing normal sensor readouts back to the human operator HMI screens.",
        "2. Industroyer / CrashOverride (2016): Targeted Ukraine's electrical transmission power grid (Pivdenna 330kV substation). It spoke native power grid protocols (IEC 60870-5-104, IEC 61850) to open transmission line circuit breakers, de-energizing a regional transmission station in the middle of winter.",
        "3. TRITON / HatMan (2017): Discovered at a petrochemical plant in Saudi Arabia. TRITON was the first malware in history engineered specifically to compromise Safety Instrumented Systems (Schneider Electric Triconex), aiming to disable physical failsafes so an explosion could occur without emergency cutoff intervention."
      ],
      keyTakeaways: [
        "A Safety Instrumented System (SIS) is the dedicated physical failsafe of last resort.",
        "Stuxnet proved that code can physically destroy centrifuges and industrial machinery.",
        "TRITON proved that attackers are actively targeting safety systems (SIS) to cause kinetic harm."
      ],
      quizzes: [
        {
          id: "q5-1",
          question: "What was the name of the historic 2010 malware discovered targeting Iranian uranium enrichment centrifuges by manipulating Siemens PLCs?",
          correctHashes: [
            "0384517d95a94321866b7f1fcea1c26baf7c179a26cfbbeca5d33d4c5cccb5a0"
          ],
          hint: "The world's most famous cyber weapon.",
          formatGuide: "e.g. Stuxnet",
          points: 10,
        },
        {
          id: "q5-2",
          question: "What independent safety controller system serves as the physical failsafe of last resort to initiate an emergency shutdown during a disaster?",
          correctHashes: [
            "c903e1e59d8c438f242878d3a2805143a32d987aab39ac14243904e5a59cd07e",
            "42942abf9fc8ec300cd9d38acc1fe3b476730c9b0144918e627da8fe46b07f2b"
          ],
          hint: "A three-letter acronym.",
          formatGuide: "e.g. SIS",
          points: 10,
        },
        {
          id: "q5-3",
          question: "What malware framework caused a regional blackout in Ukraine in 2016 by manipulating native power grid protocols to open circuit breakers?",
          correctHashes: [
            "493c73747bbef239c838c0bf0ef338bf57a6dda1861713ab5dd5c2cfae4614eb",
            "ce382bd051a40d1b5fa19ee905eaf8e72933115da52c78c1bccec72de6c43358",
            "23848dce1c78f9d5eb9a027357627bc10eafc15dab12ebe47054b0f820f46538"
          ],
          hint: "Also known by its alias CrashOverride.",
          formatGuide: "e.g. Industroyer",
          points: 10,
        },
      ],
    },
  ],
};
