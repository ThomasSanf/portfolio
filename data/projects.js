// Your projects. The first 3 show on the landing page "My last works" section.
// Each card links to /projects/[slug]. Add as many as you like.
export const projects = [
  {
    slug: "renesas-h8-300h-pedometer-reverse-engineering",
    title: "Renesas H8/300H Pedometer Reverse Engineering",
    short:
      "A reverse-engineering project focused on understanding and reproducing the behavior of a Renesas H8/300H-based pedometer system.",
    year: "2026",
    tags: ["Reverse Engineering", "Renesas H8/300H", "Embedded Systems"],
    description:
      "This project focuses on reverse engineering a pedometer built around the Renesas H8/300H architecture. The work involves studying the original firmware and hardware behavior, understanding the embedded system architecture, and using that knowledge to reproduce or reimplement key functionality on modern hardware.",
    role: "Embedded systems and reverse engineering developer",
    stack: [
      "Renesas H8/300H",
      "Assembly",
      "C",
      "Embedded Systems",
      "Firmware Analysis",
    ],
    live: "",
    repo: "",
    highlights: [
      "Analyzed the behavior of a legacy H8/300H-based embedded pedometer",
      "Studied firmware structure, hardware interactions, and low-level system behavior",
      "Connected reverse engineering work with FPGA and embedded system reproduction goals",
    ],
  },
  {
    slug: "fpga-cisc-cpu-system",
    title: "FPGA LR35902-Based CISC CPU Digital System",
    short:
      "A complete FPGA-based digital system built around an LR35902-inspired CISC CPU, with custom video, audio, HDMI output, SDRAM experiments, and hardware debugging.",
    year: "2025-2026",
    tags: ["FPGA", "LR35902", "CISC CPU", "Verilog", "Quartus", "Cyclone V"],
    description:
      "A complete FPGA-based digital system built around an LR35902-inspired CISC CPU architecture. The CPU is based on the Sharp LR35902 used in the original Game Boy family, combining an 8-bit register-oriented instruction model with memory-mapped I/O, interrupt handling, stack operations, and tight timing requirements. The system also includes an integrated pixel processing unit, audio processing unit, HDMI output, external memory experiments, and hardware-level debugging.",
    role: "FPGA and digital systems developer",
    stack: [
      "Verilog",
      "VHDL",
      "FPGA",
      "Quartus",
      "Cyclone V",
      "LR35902",
      "CISC CPU",
      "SM83-like CPU",
      "PPU",
      "APU",
      "HDMI",
      "I2S",
      "ADV7513",
      "PLL",
      "LPDDR2 SDRAM",
      "Saleae Logic Analyzer",
    ],
    live: "",
    repo: "",
    highlights: [
      "Designed and debugged an LR35902-inspired CISC-style CPU system on FPGA",
      "Implemented custom video and audio processing logic",
      "Integrated HDMI output, PLL clocks, LPDDR2 SDRAM experiments, and Saleae hardware debugging",
    ],
    sections: [
      {
        title: "CPU Architecture",
        content: [
          {
            type: "paragraph",
            text:
              "The core of the project is an LR35902-inspired CISC CPU implemented on FPGA. The LR35902 is the CPU family used in the original Game Boy architecture, and my implementation takes it as the reference point for the register model, instruction behavior, memory-mapped I/O organization, interrupt flow, and timing expectations. The CPU is designed around a classic fetch, decode, and execute flow, with control logic responsible for instruction sequencing, register updates, memory accesses, and flag behavior.",
          },
          {
            type: "paragraph",
            text:
              "The architecture includes the main LR35902-style register file, arithmetic and logic operations, program counter control, stack behavior, memory-mapped I/O access, and interrupt-related control paths. A major part of the work was not only implementing the visible behavior of the CPU, but also matching the timing constraints expected by the rest of the system, since the PPU, APU, timers, and memory bus all depend on precise CPU sequencing.",
          },
          {
            type: "image",
            src: "/images/LR35902_schematic.svg",
            alt: "LR35902 CPU architecture schematic",
            caption:
              "LR35902 CPU architecture schematic used as the reference for the FPGA CISC CPU architecture.",
          },
          {
            type: "paragraph",
            text:
              "Because the LR35902-style CPU interacts directly with video, audio, memory, and peripheral logic, debugging it required cycle-level observation. Small mistakes in instruction timing, flag updates, interrupt servicing, or memory access order could create bugs much later in the system, especially in the video pipeline or during boot.",
          },
        ],
      },
      {
        title: "Instruction Set",
        content: [
          {
            type: "paragraph",
            text:
              "The instruction set follows the LR35902-style programming model, with data transfer instructions, arithmetic operations, logical operations, jumps, calls, returns, stack operations, immediate instructions, register-to-register operations, and memory-addressed instructions.",
          },
          {
            type: "paragraph",
            text:
              "A large part of the implementation effort was spent validating how each instruction affects registers, flags, memory, and timing. Instructions that appear simple at first can become difficult when they involve side effects such as flag updates, stack pointer changes, conditional branching, or memory access ordering.",
          },
          {
            type: "paragraph",
            text:
              "The project also required testing immediate values, register operands, indirect addressing, and control-flow instructions in a way compatible with LR35902 software expectations. This made the CPU much more than a simple academic processor: it had to behave consistently enough to run real software on top of the FPGA system.",
          },
        ],
      },
      {
        title: "Integrated GPU: Pixel Processing Unit",
        content: [
          {
            type: "paragraph",
            text:
              "The system includes an integrated GPU-like module, closer to a Pixel Processing Unit than a modern programmable GPU. Its role is to generate the video output pixel by pixel, using timing-sensitive logic synchronized with the rest of the system.",
          },
          {
            type: "paragraph",
            text:
              "The PPU handles background rendering, tile and pixel fetching, scrolling behavior, sprite processing, and video timing. It is responsible for producing the raw pixel stream that later becomes the HDMI image.",
          },
          {
            type: "image",
            src:"/ppu.png",
            label: "PPU video pipeline placeholder",
            caption:
              "Placeholder for a diagram or capture of the pixel pipeline, including background fetching, sprite processing, scroll handling, video timing, and HDMI-facing pixel output.",
          },
          {
            type: "paragraph",
            text:
              "One of the main challenges was aligning the PPU timing with memory behavior. Video logic is very sensitive to latency: a one-cycle delay in the wrong place can shift pixels, break scrolling, corrupt sprites, or create visual artifacts. This made the PPU one of the most important debugging targets of the project.",
          },
        ],
      },
      {
        title: "Audio Processing Unit",
        content: [
          {
            type: "paragraph",
            text:
              "The Audio Processing Unit generates the digital audio output of the system. It includes timing-sensitive audio channels, sequencing logic, mixing behavior, and output formatting for the HDMI audio path.",
          },
          {
            type: "paragraph",
            text:
              "Unlike video bugs, audio bugs are harder to inspect visually. A small synchronization issue can produce distorted, unstable, or inconsistent sound, especially when crossing from internal audio logic to the external HDMI or I2S output path.",
          },
          {
            type: "image",
            src:"/apu.svg",
            label: "APU signal capture placeholder",
            caption:
              "Placeholder for a Saleae capture or waveform showing audio-related signals such as bit clock, word select, serial audio data, or internal sample timing.",
          },
          {
            type: "paragraph",
            text:
              "The APU required careful handling of clocks, counters, channel state, sample timing, and reset behavior. One important part of the project was comparing simulation behavior with real FPGA behavior, because audio problems sometimes appeared only after synthesis or after restarting the board.",
          },
        ],
      },
      {
        title: "FPGA Integration Process on Quartus",
        content: [
          {
            type: "paragraph",
            text:
              "The design was integrated and synthesized using Intel Quartus for a Cyclone V FPGA board. The FPGA integration process involved connecting the generated CPU, PPU, APU, memory interfaces, HDMI driver, clocks, reset logic, and physical board pins into a single top-level hardware design.",
          },
          {
            type: "paragraph",
            text:
              "Quartus integration required working with synthesis reports, timing analysis, pin assignments, resource usage, and generated IP blocks. The project also required debugging issues that only appear after place-and-route, such as timing violations, clock-domain problems, inferred memory behavior, or differences between simulation and real hardware.",
          },
          {
            type: "image",
            src:"/chip.png",
            label: "Quartus integration placeholder",
            caption:
              "Quartus Chip Planner.",
          },
          {
            type: "paragraph",
            text:
              "This part of the project was especially important because a design can be logically correct in simulation but still fail on FPGA if the clocks, memories, or I/O paths are not handled correctly.",
          },
        ],
      },
      {
        title: "Saleae Logic Analyzer Debugging",
        content: [
          {
            type: "paragraph",
            text:
              "A Saleae logic analyzer was used to debug real hardware signals directly from the FPGA board. This was essential for observing behavior that could not be fully understood from simulation alone.",
          },
          {
            type: "paragraph",
            text:
              "For video debugging, the logic analyzer made it possible to inspect pixel clocks, synchronization signals, data enable behavior, and RGB output timing. This helped identify problems such as shifted pixels, unstable video timing, or incorrect signal sequencing.",
          },
          {
            type: "image",
            src:"/video.png",
            label: "Saleae video signals captured from the FPGA board GPIOs",
            caption:
              "Video signals captured from the FPGA board GPIOs",
          },
          {
            type: "paragraph",
            text:
              "For audio debugging, the Saleae was used to inspect I2S-style signals, including bit clock, word select, and serial audio data. This made it possible to compare expected audio timing with the actual signals produced by the FPGA.",
          },
        ],
      },
      {
        title: "HDMI Driver",
        content: [
          {
            type: "paragraph",
            text:
              "The HDMI output path is built around an ADV7513 HDMI transmitter. The FPGA generates the video timing, synchronization signals, data enable signal, and RGB pixel data that are sent to the HDMI transmitter.",
          },
          {
            type: "paragraph",
            text:
              "The HDMI driver is responsible for converting the internal video output of the system into a format accepted by a standard display. This includes producing stable horizontal and vertical synchronization, a correct pixel clock, and a valid active video region.",
          },
          {
            type: "image",
            src:"/hdmi.png",
            label: "HDMI output placeholder",
            caption:
              "Photo of HDMI output (ROM loading screen)",
          },
          {
            type: "paragraph",
            text:
              "Audio integration also required connecting the APU output to the HDMI path, making the HDMI driver not only a video component but also part of the complete audio and video output system.",
          },
        ],
      },
      {
        title: "PLL 25 MHz Clock",
        content: [
          {
            type: "paragraph",
            text:
              "The project uses a 25 MHz pixel clock for the HDMI video pipeline. This clock is required to generate a standard video output timing compatible with the external HDMI transmitter and display.",
          },
          {
            type: "paragraph",
            text:
              "The PLL configuration is important because the video output depends on stable and predictable timing. If the pixel clock is unstable, incorrect, or not properly related to the rest of the system, the display output can become corrupted or fail entirely.",
          },
          {
            type: "paragraph",
            text:
              "Managing the 25 MHz PLL also introduced clock-domain considerations. The system logic, video pipeline, audio logic, and memory interfaces do not always operate under the same timing constraints, so clean synchronization between domains was necessary.",
          },
        ],
      },
      {
        title: "LPDDR2 SDRAM and Its Limits",
        content: [
          {
            type: "paragraph",
            text:
              "LPDDR2 SDRAM was explored as a way to support larger memory requirements than what could fit directly inside FPGA block RAM. This was especially relevant for larger programs, ROM data, or memory regions that exceed the practical limits of internal FPGA memory.",
          },
          {
            type: "paragraph",
            text:
              "However, LPDDR2 SDRAM introduces significant complexity. Unlike simple internal memory, SDRAM access has latency, requires a controller, and often runs in a different clock domain from the CPU and video logic.",
          },
          {
            type: "image",
            src:"/memory.svg",
            label: "LPDDR2 SDRAM architecture placeholder",
            caption:
              "Placeholder for a memory architecture diagram showing the CPU, local FPGA memory, LPDDR2 SDRAM controller, ROM loading path, and the timing-sensitive regions that cannot rely directly on external memory latency.",
          },
          {
            type: "paragraph",
            text:
              "The main limitation is that timing-sensitive CPU or video accesses cannot always wait for unpredictable external memory latency. Some early boot or frequently accessed regions may need to be mirrored into local FPGA memory, cached, or carefully buffered. This made the SDRAM integration useful but not a simple replacement for fast internal memory.",
          },
        ],
      },
    ],
  },
  {
    slug: "playpal-club",
    title: "PlayPal Club",
    short:
      "A mobile app for university tennis clubs to organize games, manage players, and build local sports communities.",
    year: "2025",
    tags: ["React Native", "Supabase", "TypeScript"],
    description:
      "PlayPal Club is a social sports app designed for tennis clubs and university communities in Taiwan. It allows users to create games, join matches, manage profiles, track activity, and connect with other players through a mobile-first experience.",
    role: "CTO and full stack developer",
    stack: [
      "React Native",
      "TypeScript",
      "Supabase",
      "Next.js",
      "Realtime",
      "Push Notifications",
    ],
    live: "",
    repo: "",
    highlights: [
      "Built authentication, profiles, game creation, participation, and review flows",
      "Implemented realtime updates and notification logic",
      "Led the technical direction of the project from prototype to mobile deployment preparation",
    ],
  },
];
