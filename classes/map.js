class Map {
  constructor(mapSize, nomberOfRocks) {
    this.area = [];
    this.size = mapSize;
    this.rocks = nomberOfRocks;
    this.rocksPos = [];
  }

  init = () =>{
    this.createArea(this.size, this.area);
    this.addRocks(this.area, this.rocks);
    this.displayArea(this.area);
    console.log(this.area);
  }

  createArea (size, area) {
    console.log("Create a map with " + size * size + " cases");
    for (let i = 0; i < size; i++){
      area.push([]);
      for (let j = 0; j < size; j++){
        area[i].push({
          isAccessible : true,
          coordinates : {
            x : i + 1, 
            y : j + 1
          },
          entityOnTheCase : null
        });
      }
    }
  }
    
  addRocks (area, rocks) {
    for (let i = 0; i < rocks ;i++) {
      const randomX = Math.floor(Math.random() * area.length) + 1; 
      const randomY = Math.floor(Math.random() * area.length) + 1;
      if (area[randomX - 1][randomY -1].isAccessible) {
        area[randomX - 1][randomY -1].isAccessible = false;
        this.rocksPos.push({ x : randomX - 1, y : randomY - 1});
      }
      else {
        i--;
      }
    }
  }

  displayArea (area) {
    const map = document.querySelector(".map");

    area.forEach(element => {
      const newDiv = document.createElement("div");
      map.appendChild(newDiv);
    });

    const divs = document.querySelectorAll(".map>div");

    divs.forEach((element, index) => {
      for (let i = 0; i < divs.length ;i++) {
        const newDiv = document.createElement("div");
        if (!area[index][i].isAccessible){
          newDiv.setAttribute("class", "rock");
        }
        element.appendChild(newDiv);
      }
    });
  }
}

export default Map;