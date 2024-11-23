const sectors = [
    { color: "#FFBC03", text: "#333333", label: "Blue star Mini Fridge" },
    { color: "#FF5A10", text: "#333333", label: "Luck Next Time" },
    { color: "#FFBC03", text: "#333333", label: "Symphony air cooler" },
    { color: "#FF5A10", text: "#333333", label: "You lost chance" },
    { color: "#FFBC03", text: "#333333", label: "Microwave Oven(20 MS)" },
    { color: "#FF5A10", text: "#333333", label: "Better Luck Next Time" },
    { color: "#FFBC03", text: "#333333", label: "Microwave Oven(25L air fryer)" },
    { color: "#FF5A10", text: "#333333", label: "Ultra Wet Grindere" },
    { color: "#FFBC03", text: "#333333", label: "Get 1 more chance" },
    { color: "#FF5A10", text: "#333333", label: "Voltas water Dispenser" },
    { color: "#FFBC03", text: "#333333", label: "Sansui 32 LED Smart Tv" },
    { color: "#FF5A10", text: "#333333", label: "Try Next Time" },
    { color: "#FFBC03", text: "#333333", label: "Water Geyser (25 Ltr)" },
    { color: "#FF5A10", text: "#333333", label: "Samsung Mobile Galaxy M14" },
  ];

  /**
   *Tomorrow Customer Mela Customers Gifts:-
*Blue star Mini Fridge 
*Symphony air cooler
*Microwave Oven(20 MS)
*Microwave Oven(25L air fryer)
*Ultra Wet Grinder
*Voltas water Dispenser 
*Sansui 32 LED Smart Tv
*Water Geyser (25 Ltr)
*Samsung Mobile Galaxy M14
   */
  
  const events = {
    listeners: {},
    addListener: function (eventName, fn) {
      this.listeners[eventName] = this.listeners[eventName] || [];
      this.listeners[eventName].push(fn);
    },
    fire: function (eventName, ...args) {
      if (this.listeners[eventName]) {
        for (let fn of this.listeners[eventName]) {
          fn(...args);
        }
      }
    },
  };
  
  const rand = (m, M) => Math.random() * (M - m) + m;
  const tot = sectors.length;
  const spinEl = document.querySelector("#spin");
  const spinEl1 = document.querySelector("#spin1");
  // const spinEl = document.querySelector("#spin");
  const custName = document.getElementById("name");
  const winnername = document.querySelector("#winner");
  const ctx = document.querySelector("#wheel").getContext("2d");
  const dia = ctx.canvas.width;
  const rad = dia / 2;
  const PI = Math.PI;
  const TAU = 2 * PI;
  const arc = TAU / sectors.length;
  
  const friction = 0.991; // 0.995=soft, 0.99=mid, 0.98=hard
  let angVel = 0; // Angular velocity
  let ang = 0; // Angle in radians
  
  let spinButtonClicked = false;
  
  const getIndex = () => Math.floor(tot - (ang / TAU) * tot) % tot;
  
  function drawSector(sector, i) {
    const ang = arc * i;
    ctx.save();
  
    // COLOR
    ctx.beginPath();
    ctx.fillStyle = sector.color;
    ctx.moveTo(rad, rad);
    ctx.arc(rad, rad, rad, ang, ang + arc);
    ctx.lineTo(rad, rad);
    ctx.fill();
  
    // TEXT
    ctx.translate(rad, rad);
    ctx.rotate(ang + arc / 2);
    ctx.textAlign = "right";
    ctx.fillStyle = sector.text;
    ctx.font = "bold 12px 'Lato', sans-serif";
    ctx.fillText(sector.label, rad - 10, 10);
    //
  
    ctx.restore();
  }
  
  function rotate() {
    const sector = sectors[getIndex()];
    ctx.canvas.style.transform = `rotate(${ang - PI / 2}rad)`;
  
    spinEl.textContent = !angVel ? "SPIN" : sector.label;
    spinEl.style.background = sector.color;
    spinEl.style.color = sector.text;
  }
  
  function frame() {
    // Fire an event after the wheel has stopped spinning
    if (!angVel && spinButtonClicked) {
      const finalSector = sectors[getIndex()];
      events.fire("spinEnd", finalSector);
      spinButtonClicked = false; // reset the flag
      return;
    }
  
    angVel *= friction; // Decrement velocity by friction
    //if (angVel < 0.002) angVel = 0; // Bring to stop
    if (angVel < 0.002) angVel = 0; // Bring to stop
    ang += angVel; // Update angle
    ang %= TAU; // Normalize angle
    rotate();
  }
  
  function engine() {
    frame();
    requestAnimationFrame(engine);
  }
  
  function init() {
    sectors.forEach(drawSector);
    rotate(); // Initial rotation
    engine(); // Start engine
    spinEl.addEventListener("click", () => {
      if (!angVel) angVel = rand(0.10, 0.90);
      spinButtonClicked = true;
    });
    spinEl1.addEventListener("click", () => {
      if (!angVel) angVel = rand(0.10, 0.90);
      spinButtonClicked = true;
    });
  }
  
  init();
  
  events.addListener("spinEnd", (sector) => {
    // winnername.innerHTML = `You won ${sector.label}`;
    winnername.innerHTML = `Congratulations ${custName.value}, You won ${sector.label} in Lucky Draw. Claim it on booking new plot`;
    //console.log(`Congratulations ${custName.value}, You won ${sector.label} in Lucky Draw By Own Your Luxury Villa`);
  });
  
