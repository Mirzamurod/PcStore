const products = [
    // Intel Core i5-10400f
    {
        name: 'ASUS TUF GAMING1',
        image: ['/images/pc.png', '/images/pc.png', '/images/pc.png', '/images/pc.png'],
        cpu: 'Intel Core i5-10400F', // $
        motherboard: 'Asus Rog Z490', // $
        ddr: 'DDR4 8Gb x2', // $
        ssd_sata: '120Gb', // $
        hdd: '1Tb', // $
        monitor: '24"', // $
        case: 'Aerocool Quantum Mesh-G-BK-v1', // $
        cooler: 'Deepcool Gammaxx 300', // $
        psu: '600w', // $
        videocard: 'Gtx 1050Ti', // $
        combo: 'Logitech Offis Klava Miwka', // $
        price: 16000000,
        stock_price: 0,
        rating: 30,
        category: 'pro',
        description:
            'Culpa nostrud cillum consectetur ad adipisicing deserunt ex ad incididunt aliqua aliqua pariatur ea. Commodo non dolore ea id. Aute sint incididunt occaecat non exercitation esse tempor amet nulla proident Lorem do. Dolore fugiat aliquip aliquip fugiat tempor ut cillum magna. Veniam commodo eiusmod nostrud proident eiusmod non esse pariatur non proident cillum excepteur sunt.',
        warranty: 1,
        have: false,
    },
    // Intel Core i7-9700
    {
        name: 'ASUS TUF GAMING2',
        image: ['/images/pc.png', '/images/pc.png', '/images/pc.png'],
        cpu: 'Intel Core I7-9700', // $
        motherboard: 'Asus Rog Z390', // $
        ddr: 'DDR4 8Gb 3200Mhz x2', // $
        ssd_m2: '240Gb', // $
        hdd: '1Tb', // $
        monitor: '24"', // $
        case: 'AeroCool Aero One Black', // $
        cooler: 'ID Cooling SE-224-XT Argb', // $
        psu: '600W', // $
        videocard: 'Gtx 1660Ti', // $
        combo: 'Cougar Minos XT, Cougar Core EX', // $
        headphone: 'Cougar Phontum Black', // $
        price: 16000000,
        stock_price: 0,
        rating: 10,
        category: 'pro',
        description:
            'Culpa nostrud cillum consectetur ad adipisicing deserunt ex ad incididunt aliqua aliqua pariatur ea. Commodo non dolore ea id. Aute sint incididunt occaecat non exercitation esse tempor amet nulla proident Lorem do. Dolore fugiat aliquip aliquip fugiat tempor ut cillum magna. Veniam commodo eiusmod nostrud proident eiusmod non esse pariatur non proident cillum excepteur sunt.',
        warranty: 3,
        have: true,
    },
    // Intel Core i7-9700k
    {
        name: 'ASUS TUF GAMING3',
        image: [
            '/images/pc.png',
            '/images/pc.png',
            '/images/pc.png',
            '/images/pc.png',
            '/images/pc.png',
        ],
        cpu: 'Intel Core i7-9700k', // $
        motherboard: 'Asus Rog Z390', // $
        ddr: 'DDR4 16Gb 3200Mhz x2', // $
        ssd_m2: '240Gb', // $
        hdd: '2Tb', // $
        monitor: '27"', // $
        case: 'СoolerMaster MB510L', // $
        cooler: 'СoolerMaster MasterLiquid ML240L Rgb', // $ // water cooler
        psu: '600W', // $
        videocard: 'Gtx 1660Ti', // $
        combo: 'Hyperx Alloy Core Rgb, Hyperx Pulsufire Core', // $
        headphone: 'Hyperx Cloud Stinger Core 7.1', // $
        price: 16000000,
        stock_price: 0,
        rating: 70,
        category: 'pro',
        description:
            'Culpa nostrud cillum consectetur ad adipisicing deserunt ex ad incididunt aliqua aliqua pariatur ea. Commodo non dolore ea id. Aute sint incididunt occaecat non exercitation esse tempor amet nulla proident Lorem do. Dolore fugiat aliquip aliquip fugiat tempor ut cillum magna. Veniam commodo eiusmod nostrud proident eiusmod non esse pariatur non proident cillum excepteur sunt.',
        warranty: 2,
        have: true,
    },
    // Intel Core i7-10700
    {
        name: 'ASUS TUF GAMING4',
        image: ['/images/pc.png', '/images/pc.png', '/images/pc.png', '/images/pc.png'],
        cpu: 'Intel Core i7-10700', // $
        motherboard: 'Asus Rog Z490', // $
        ddr: 'DDR4 16Gb 3200Mhz x2', // $
        ssd_m2: '240GB', // $
        hdd: '2Tb', // $
        monitor: '24"', // $
        case: 'Thermaltake Level 20 MT Argb', // $
        cooler: 'СoolerMaster MasterLiquid ML240L Rgb', // $ // water cooler
        psu: '700W', // $
        videocard: 'Rtx 2060', // $
        combo: 'Hyperx Alloy Fps, Hyperx Pulsefire Core Pro', // $
        headphone: 'Hyperx Cloud Stinger Core 7.1', // $
        price: 16000000,
        stock_price: 0,
        rating: 35,
        category: 'pro',
        description:
            'Culpa nostrud cillum consectetur ad adipisicing deserunt ex ad incididunt aliqua aliqua pariatur ea. Commodo non dolore ea id. Aute sint incididunt occaecat non exercitation esse tempor amet nulla proident Lorem do. Dolore fugiat aliquip aliquip fugiat tempor ut cillum magna. Veniam commodo eiusmod nostrud proident eiusmod non esse pariatur non proident cillum excepteur sunt.',
        warranty: 2,
        have: false,
    },
    // Intel Core i7-10700k
    {
        name: 'ASUS TUF GAMING5',
        image: [
            '/images/pc.png',
            '/images/pc.png',
            '/images/pc.png',
            '/images/pc.png',
            '/images/pc.png',
        ],
        cpu: 'Intel Core i7-10700k', // $
        motherboard: 'Asus Rog Z490', // $
        ddr: 'DDR4 16Gb 3200Mhz x2', // $
        ssd_m2: '240Gb', // $
        hdd: '2Tb', // $
        monitor: '27"', // $
        case: 'Thermaltake Level 20 MT Argb', // $
        cooler: 'СoolerMaster MasterLiquid ML360L Rgb', // $ water cooler
        psu: '700W', // $
        videocard: 'Rtx 2060', // $
        combo: 'Hyperx Alloy Core Rgb, Hyperx Pulsefire Core', // $
        headphone: 'Hyperx Cloud Stinger Core 7.1', // $
        price: 16000000,
        stock_price: 0,
        rating: 45,
        category: 'pro',
        description:
            'Culpa nostrud cillum consectetur ad adipisicing deserunt ex ad incididunt aliqua aliqua pariatur ea. Commodo non dolore ea id. Aute sint incididunt occaecat non exercitation esse tempor amet nulla proident Lorem do. Dolore fugiat aliquip aliquip fugiat tempor ut cillum magna. Veniam commodo eiusmod nostrud proident eiusmod non esse pariatur non proident cillum excepteur sunt.',
        warranty: 1,
        have: true,
    },
    // Intel Core i9-9900
    {
        name: 'ASUS TUF GAMING6',
        image: [
            '/images/pc.png',
            '/images/pc.png',
            '/images/pc.png',
            '/images/pc.png',
            '/images/pc.png',
            '/images/pc.png',
        ],
        cpu: 'Intel Core i9-9900', // $
        motherboard: 'Asus Rog Z390', // $
        ddr: 'DDR4 16Gb 3200Mhz x2', // $
        ssd_m2: '240GB', // $
        hdd: '2Tb', // $
        monitor: '27"', // $
        case: 'СoolerMaster MasterBox K500', // $
        cooler: 'СoolerMaster MasterLiquid ML240R Rgb', // $ // water cooler
        psu: '700W', // $
        videocard: 'Rtx 3060ti', // $
        combo: 'Hyperx Alloy Core Rgb, Hyperx Pulsefire Core', // $
        headphone: 'Hyperx Cloud Core', // $
        price: 16000000,
        stock_price: 0,
        rating: 40,
        category: 'pro',
        description:
            'Culpa nostrud cillum consectetur ad adipisicing deserunt ex ad incididunt aliqua aliqua pariatur ea. Commodo non dolore ea id. Aute sint incididunt occaecat non exercitation esse tempor amet nulla proident Lorem do. Dolore fugiat aliquip aliquip fugiat tempor ut cillum magna. Veniam commodo eiusmod nostrud proident eiusmod non esse pariatur non proident cillum excepteur sunt.',
        warranty: 3,
        have: false,
    },
    // Intel Core i9-9900k
    {
        name: 'ASUS TUF GAMING7',
        image: ['/images/pc.png', '/images/pc.png', '/images/pc.png', '/images/pc.png'],
        cpu: 'Intel Core i9-9900k', // $
        motherboard: 'Asus Rog Z390', // $
        ddr: 'DDR4 16Gb 3200Mhz x2', // $
        ssd_m2: '512Gb', // $
        ssd_sata: '1Tb',
        hdd: '2Tb', // $
        monitor: '27"', // $
        case: 'СoolerMaster MasterBox K500', // $
        cooler: 'СoolerMaster MasterLiquid ML360R Rgb', // $ // water cooler
        psu: '700W', // $
        videocard: 'Rtx 3060Ti', // $
        combo: 'Hyperx Alloy Core Rgb, Hyperx Pulsefire Core', // $
        headphone: 'Hyperx Cloud Core', // $
        price: 16000000,
        stock_price: 0,
        rating: 65,
        category: 'pro',
        description:
            'Culpa nostrud cillum consectetur ad adipisicing deserunt ex ad incididunt aliqua aliqua pariatur ea. Commodo non dolore ea id. Aute sint incididunt occaecat non exercitation esse tempor amet nulla proident Lorem do. Dolore fugiat aliquip aliquip fugiat tempor ut cillum magna. Veniam commodo eiusmod nostrud proident eiusmod non esse pariatur non proident cillum excepteur sunt.',
        warranty: 2,
        have: true,
    },
    // Intel Core i9-10900
    {
        name: 'ASUS TUF GAMING8',
        image: ['/images/pc.png', '/images/pc.png', '/images/pc.png'],
        cpu: 'Intel Core i9-10900', // $
        motherboard: 'Asus Rog Z490', // $
        ddr: 'DDR4 16Gb 3200Mhz x2', // $
        ssd_m2: '512Gb', // $
        ssd_sata: '1Tb',
        hdd: '2Tb', // $
        monitor: '27"', // $
        case: 'СoolerMaster MasterCase H500P', // $
        cooler: 'СoolerMaster MasterLiquid ML360R Rgb', // $ // water cooler
        psu: '850W', // $
        videocard: 'Rtx 3070', // $
        combo: 'Logitech G403 Hero, Logitech G413 Carbon', // $
        headphone: 'Logitech G Pro X', // $
        price: 16000000,
        stock_price: 0,
        rating: 55,
        category: 'pro',
        description:
            'Culpa nostrud cillum consectetur ad adipisicing deserunt ex ad incididunt aliqua aliqua pariatur ea. Commodo non dolore ea id. Aute sint incididunt occaecat non exercitation esse tempor amet nulla proident Lorem do. Dolore fugiat aliquip aliquip fugiat tempor ut cillum magna. Veniam commodo eiusmod nostrud proident eiusmod non esse pariatur non proident cillum excepteur sunt.',
        warranty: 3,
        have: true,
    },
    // Intel Core i9-10900K
    {
        name: 'ASUS TUF GAMING9',
        image: [
            '/images/pc.png',
            '/images/pc.png',
            '/images/pc.png',
            '/images/pc.png',
            '/images/pc.png',
        ],
        cpu: 'Intel Core i9-10900K', // $
        motherboard: 'Asus Rog Z490', // $
        ddr: 'DDR4 32Gb 3200Mhz x2', // $
        ssd_m2: '1Tb', // $
        ssd_sata: '1Tb',
        hdd: '2Tb', // $
        monitor: '27"', // $
        case: 'Coolermaster MasterCase H500P', // $
        cooler: 'СoolerMaster MasterLiquid ML360R Rgb', // $
        psu: '850W', // $
        videocard: 'Rtx 3080', // $
        combo: 'Logitech G403 Hero, Logitech G413 Carbon', // $
        headphone: 'Logitech G Pro X', // $
        price: 16000000,
        stock_price: 0,
        rating: 50,
        category: 'pro',
        description:
            'Culpa nostrud cillum consectetur ad adipisicing deserunt ex ad incididunt aliqua aliqua pariatur ea. Commodo non dolore ea id. Aute sint incididunt occaecat non exercitation esse tempor amet nulla proident Lorem do. Dolore fugiat aliquip aliquip fugiat tempor ut cillum magna. Veniam commodo eiusmod nostrud proident eiusmod non esse pariatur non proident cillum excepteur sunt.',
        warranty: 1,
        have: false,
    },
    // Intel Core i9-10900K
    {
        name: 'ASUS TUF GAMING10',
        image: ['/images/pc.png', '/images/pc.png', '/images/pc.png', '/images/pc.png'],
        cpu: 'Intel Core i9-10900K', // $
        motherboard: 'Asus Rog Z490', // $
        ddr: 'DDR4 32Gb 3200Mhz x2', // $
        ssd_m2: '1Tb', // $
        ssd_sata: '1Tb',
        hdd: '2Tb', // $
        monitor: '32" 4K', // $
        case: 'СoolerMaster MasterCase H500P', // $
        cooler: 'СoolerMaster MasterLiquid ML360R Rgb', // $
        psu: '850W', // $
        videocard: 'Rtx 3090', // $
        combo: 'Logitech G403 Hero, Logitech G413 Carbon', // $
        headphone: 'Logitech G Pro X', // $
        price: 16000000,
        stock_price: 0,
        rating: 60,
        category: 'pro',
        description:
            'Culpa nostrud cillum consectetur ad adipisicing deserunt ex ad incididunt aliqua aliqua pariatur ea. Commodo non dolore ea id. Aute sint incididunt occaecat non exercitation esse tempor amet nulla proident Lorem do. Dolore fugiat aliquip aliquip fugiat tempor ut cillum magna. Veniam commodo eiusmod nostrud proident eiusmod non esse pariatur non proident cillum excepteur sunt.',
        warranty: 2,
        have: true,
    },
]

export default products
