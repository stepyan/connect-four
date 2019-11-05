class WinningConditions {
  constructor(){
    this.winConditions = []
    this.checkConditions = [
      [0,6,1],
      [7,13,1],
      [14,20,1],
      [21,27,1],
      [28,34,1],
      [35,41,1],
      [0,35,7],
      [1,36,7],
      [2,37,7],
      [3,38,7],
      [4,39,7],
      [5,40,7],
      [6,41,7],
      [3,21,6],
      [4,28,6],
      [5,31,6],
      [6,36,6],
      [13,37,6],
      [14,38,8],
      [7,39,8],
      [0,40,8],
      [1,41,8],
      [2,34,8],
      [3,27,8]
    ]
  }
  getAllWinConditions(){
    if(this.winConditions.length > 0){
      return this.winConditions;
    }
    for(let k = 0; k < this.checkConditions.length; k++){
      const arr = this.checkConditions[k]
      const init = arr[0];
      const fin = arr[1];
      const diff = arr[2];
      const numConditions = (fin - init)/diff - 2;
      for(let i = 0; i < numConditions; i++){
        let nextArr = [];
        for(let j = 0; j < 4; j++){
          nextArr.push(init + diff * (i + j));
        }
        this.winConditions.push(nextArr);
      }
    }
    return this.winConditions;
  }
}

let winningConditions = new WinningConditions()
export default winningConditions;