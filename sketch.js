/**
 * 全螢幕馬卡龍繽紛點陣 - 顏色與大小隨動版本
 */

let baseSpacing = 90;
let rows, cols;
let colorOffsets = []; // 儲存每個點點的初始色相偏移

function setup() {
  createCanvas(windowWidth, windowHeight);
  // 使用 HSB 模式：色相(0-360), 飽和度(0-100), 亮度(0-100)
  colorMode(HSB, 360, 100, 100, 1);
  noStroke();
  ellipseMode(CENTER);
  calculateGrid();
}

function draw() {
  // 極淺的暖白色背景，讓馬卡龍色跳出來
  background(40, 5, 98); 

  translate(width / 2, height / 2);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      
      let x = (i - (cols - 1) / 2) * baseSpacing;
      let y = (j - (rows - 1) / 2) * baseSpacing;

      // 1. 取得該位置的隨機種子（這能確保每個點的「個性」不同）
      // 我們利用座標來產生一個獨特的偏移量
      let uniqueSeed = i * 13.5 + j * 25.8;
      
      // 2. 透過 Perlin Noise 產生平滑的變量
      let noiseVal = noise(i * 0.2, j * 0.2, frameCount * 0.012);
      
      // 3. 大小隨動
      let circleSize = map(noiseVal, 0, 1, 15, 85);

      // 4. 繽紛顏色隨動：
      // 我們讓基礎色相根據座標不同而不同 (例如粉紅、粉藍、粉黃交錯)
      // 然後再加上 noiseVal 帶來的顏色波動
      let baseHue = (uniqueSeed) % 360; 
      
      // 為了維持「可愛色系」，我們限制色相在幾個特定的粉嫩區間
      // 這裡用一點點數學讓它在幾個可愛色（粉紅 330, 藍 200, 黃 55, 紫 270）之間跳躍
      let cuteHues = [340, 200, 55, 280, 160]; 
      let myBaseHue = cuteHues[(i + j) % cuteHues.length];
      
      // 讓顏色隨著大小 (noiseVal) 產生 +/- 30 度的變化
      let finalHue = myBaseHue + map(noiseVal, 0, 1, -30, 30);
      
      // 飽和度與亮度維持在馬卡龍水平
      fill(finalHue, 45, 95);

      // 繪製圓圈
      ellipse(x, y, circleSize, circleSize);
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  calculateGrid();
}

function calculateGrid() {
  cols = ceil(width / baseSpacing) + 1;
  rows = ceil(height / baseSpacing) + 1;
}