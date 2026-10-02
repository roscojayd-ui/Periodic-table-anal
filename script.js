// PERIODIC TABLE DATA
// Format: symbol, name, approximate atomic mass

const rawData = `
H|Hydrogen|1.008
He|Helium|4.0026
Li|Lithium|6.94
Be|Beryllium|9.0122
B|Boron|10.81
C|Carbon|12.011
N|Nitrogen|14.007
O|Oxygen|15.999
F|Fluorine|18.998
Ne|Neon|20.180
Na|Sodium|22.990
Mg|Magnesium|24.305
Al|Aluminium|26.982
Si|Silicon|28.085
P|Phosphorus|30.974
S|Sulfur|32.06
Cl|Chlorine|35.45
Ar|Argon|39.948
K|Potassium|39.098
Ca|Calcium|40.078
Sc|Scandium|44.956
Ti|Titanium|47.867
V|Vanadium|50.942
Cr|Chromium|51.996
Mn|Manganese|54.938
Fe|Iron|55.845
Co|Cobalt|58.933
Ni|Nickel|58.693
Cu|Copper|63.546
Zn|Zinc|65.38
Ga|Gallium|69.723
Ge|Germanium|72.630
As|Arsenic|74.922
Se|Selenium|78.971
Br|Bromine|79.904
Kr|Krypton|83.798
Rb|Rubidium|85.468
Sr|Strontium|87.62
Y|Yttrium|88.906
Zr|Zirconium|91.224
Nb|Niobium|92.906
Mo|Molybdenum|95.95
Tc|Technetium|98
Ru|Ruthenium|101.07
Rh|Rhodium|102.906
Pd|Palladium|106.42
Ag|Silver|107.868
Cd|Cadmium|112.414
In|Indium|114.818
Sn|Tin|118.710
Sb|Antimony|121.760
Te|Tellurium|127.60
I|Iodine|126.904
Xe|Xenon|131.293
Cs|Cesium|132.905
Ba|Barium|137.327
La|Lanthanum|138.905
Ce|Cerium|140.116
Pr|Praseodymium|140.908
Nd|Neodymium|144.242
Pm|Promethium|145
Sm|Samarium|150.36
Eu|Europium|151.964
Gd|Gadolinium|157.25
Tb|Terbium|158.925
Dy|Dysprosium|162.500
Ho|Holmium|164.930
Er|Erbium|167.259
Tm|Thulium|168.934
Yb|Ytterbium|173.045
Lu|Lutetium|174.967
Hf|Hafnium|178.49
Ta|Tantalum|180.948
W|Tungsten|183.84
Re|Rhenium|186.207
Os|Osmium|190.23
Ir|Iridium|192.217
Pt|Platinum|195.084
Au|Gold|196.967
Hg|Mercury|200.592
Tl|Thallium|204.38
Pb|Lead|207.2
Bi|Bismuth|208.980
Po|Polonium|209
At|Astatine|210
Rn|Radon|222
Fr|Francium|223
Ra|Radium|226
Ac|Actinium|227
Th|Thorium|232.038
Pa|Protactinium|231.036
U|Uranium|238.029
Np|Neptunium|237
Pu|Plutonium|244
Am|Americium|243
Cm|Curium|247
Bk|Berkelium|247
Cf|Californium|251
Es|Einsteinium|252
Fm|Fermium|257
Md|Mendelevium|258
No|Nobelium|259
Lr|Lawrencium|266
Rf|Rutherfordium|267
Db|Dubnium|268
Sg|Seaborgium|269
Bh|Bohrium|270
Hs|Hassium|277
Mt|Meitnerium|278
Ds|Darmstadtium|281
Rg|Roentgenium|282
Cn|Copernicium|285
Nh|Nihonium|286
Fl|Flerovium|289
Mc|Moscovium|290
Lv|Livermorium|293
Ts|Tennessine|294
Og|Oganesson|294
`;

const descriptions = {
    H: "Hydrogen is the lightest element and the most abundant chemical element in the universe.",
    He: "Helium is a colorless, odorless noble gas commonly used in balloons.",
    Li: "Lithium is a soft, lightweight metal commonly used in rechargeable batteries.",
    C: "Carbon is a key element in living organisms and many organic compounds.",
    O: "Oxygen is a reactive gas essential for respiration and combustion.",
    Fe: "Iron is a metal widely used in construction and steel production.",
    Au: "Gold is a precious metal used in jewelry and electronics.",
    Ag: "Silver is a metal known for its conductivity and use in jewelry.",
    Na: "Sodium is a reactive metal found in common salt compounds.",
    Cl: "Chlorine is a reactive halogen used in water disinfection.",
    Si: "Silicon is a metalloid widely used in computer chips and electronics.",
    U: "Uranium is a radioactive metal used as fuel in some nuclear reactors."
};

const categoryNames = {
    alkali: "Alkali Metal",
    alkaline: "Alkaline Earth Metal",
    transition: "Transition Metal",
    postTransition: "Post-transition Metal",
    metalloid: "Metalloid",
    nonmetal: "Nonmetal",
    halogen: "Halogen",
    noble: "Noble Gas",
    lanthanide: "Lanthanide",
    actinide: "Actinide"
};

// Atomic numbers by category
const categorySets = {
    alkali: [3, 11, 19, 37, 55, 87],
    alkaline: [4, 12, 20, 38, 56, 88],
    metalloid: [5, 14, 32, 33, 51, 52],
    nonmetal: [1, 6, 7, 8, 15, 16, 34],
    halogen: [9, 17, 35, 53, 85, 117],
    noble: [2, 10, 18, 36, 54, 86, 118],
    postTransition: [13, 31, 49, 50, 81, 82, 83, 84, 113, 114, 115, 116],
    lanthanide: Array.from({ length: 15 }, (_, i) => i + 57),
    actinide: Array.from({ length: 15 }, (_, i) => i + 89)
};

function getCategory(number) {
    for (const [category, numbers] of Object.entries(categorySets)) {
        if (numbers.includes(number)) return category;
    }
    return "transition";
}

// Period and group positions
const periodGroups = {
    1: [1, 18],
    2: [1, 2, 13, 14, 15, 16, 17, 18],
    3: [1, 2, 13, 14, 15, 16, 17, 18],
    4: Array.from({ length: 18 }, (_, i) => i + 1),
    5: Array.from({ length: 18 }, (_, i) => i + 1),
    6: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
    7: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]
};

// Convert data to element objects
const elements = rawData.trim().split("\n").map((line, index) => {
    const [symbol, name, mass] = line.split("|");
    const number = index + 1;

    let period, group, row, column;

    if (number <= 2) {
        period = 1;
        group = number === 1 ? 1 : 18;
        row = 1;
        column = group;
    } else if (number <= 10) {
        period = 2;
        group = number <= 4 ? number - 2 : number + 8;
        row = 2;
        column = group;
    } else if (number <= 18) {
        period = 3;
        group = number <= 12 ? number - 10 : number + 0;
        if (number === 13) group = 13;
        if (number === 14) group = 14;
        if (number === 15) group = 15;
        if (number === 16) group = 16;
        if (number === 17) group = 17;
        if (number === 18) group = 18;
        row = 3;
        column = group;
    } else if (number <= 36) {
        period = 4;
        group = number - 18;
        row = 4;
        column = group;
    } else if (number <= 54) {
        period = 5;
        group = number - 36;
        row = 5;
        column = group;
    } else if (number <= 86) {
        period = 6;
        if (number === 55) group = 1;
        else if (number === 56) group = 2;
        else if (number >= 57 && number <= 71) group = number - 54;
        else group = number - 68;
        row = number >= 57 && number <= 71 ? 8 : 6;
        column = number >= 57 && number <= 71 ? number - 54 : group;
    } else {
        period = 7;
        if (number === 87) group = 1;
        else if (number === 88) group = 2;
        else if (number >= 89 && number <= 103) group = number - 86;
        else group = number - 100;
        row = number >= 89 && number <= 103 ? 9 : 7;
        column = number >= 89 && number <= 103 ? number - 86 : group;
    }

    const category = getCategory(number);

    return {
        number,
        symbol,
        name,
        mass,
        category,
        period,
        group,
        row,
        column,
        description: descriptions[symbol] ||
            `${name} is a chemical element with the symbol ${symbol}.`
    };
});

// Create periodic table
const table = document.getElementById("periodic-table");

elements.forEach(element => {
    const card = document.createElement("button");

    card.className = `element ${element.category}`;
    card.style.gridRow = element.row;
    card.style.gridColumn = element.column;

    card.innerHTML = `
        <span class="number">${element.number}</span>
        <span class="symbol">${element.symbol}</span>
        <span class="name">${element.name}</span>
    `;

    card.setAttribute("aria-label", `${element.name}, ${element.number}`);

    card.addEventListener("click", () => {
        showDetails(element);
    });

    table.appendChild(card);
});

// Modal controls
const modal = document.getElementById("modal");
const closeBtn = document.getElementById("close-modal");

function showDetails(element) {
    document.getElementById("element-name").textContent = element.name;
    document.getElementById("modal-symbol").textContent = element.symbol;
    document.getElementById("modal-number").textContent = element.number;
    document.getElementById("atomic-number").textContent = element.number;
    document.getElementById("atomic-mass").textContent = element.mass;
    document.getElementById("group").textContent = element.group;
    document.getElementById("period").textContent = element.period;
    document.getElementById("description").textContent = element.description;

    const categoryText = categoryNames[element.category];
    document.getElementById("modal-category").textContent = categoryText;
    document.getElementById("element-subtitle").textContent = categoryText;

    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    closeBtn.focus();
}

function closeModal() {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
}

// Close with X
closeBtn.addEventListener("click", closeModal);

// Close when clicking outside popup
modal.addEventListener("click", event => {
    if (event.target === modal) {
        closeModal();
    }
});

// Close with Escape key
document.addEventListener("keydown", event => {
    if (event.key === "Escape" && modal.classList.contains("active")) {
        closeModal();
    }
});

// Search elements
const searchInput = document.getElementById("search");

searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase().trim();

    document.querySelectorAll(".element").forEach((card, index) => {
        const element = elements[index];

        const matches =
            element.name.toLowerCase().includes(query) ||
            element.symbol.toLowerCase().includes(query) ||
            String(element.number).includes(query);

        card.classList.toggle("hidden", !matches);
    });
});

// Category legend
const legend = document.getElementById("legend");

Object.entries(categoryNames).forEach(([category, name]) => {
    const item = document.createElement("div");
    item.className = "legend-item";

    const color = document.createElement("span");
    color.className = `legend-color ${category}`;

    const label = document.createElement("span");
    label.textContent = name;

    item.append(color, label);
    legend.appendChild(item);
});