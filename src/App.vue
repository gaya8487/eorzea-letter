<script>
import "./assets/css/fonts.css"; // CSS 파일을 로드합니다.
export default {
  name: "App",
  data() {
    return {
      text: "",
      textColor: "#000000", // 기본 글자 색상
      bgColor: "#FFFFFF", // 기본 배경색
      borderColor: "#000000", // 기본 테두리 색상
      borderSize: "4", // 기본 테두리 크기
      borderType: "normal", // 기본 테두리 크기
      textSize: "25", //글자 크기
      canvasWidth: 400, // 초기 캔버스 너비
      canvasHeight: 200, // 초기 캔버스 높이
      textAlignment: "left", // 초기 텍스트 가로 정렬
      textWeight: "", // 초기 글씨 두께
      textFont: "Eorzea", //초기 폰트
      setFont: "25px Eorzea",
      bgColor_notNull: true,
      borderColor_notNull: true,
      textAxisX: 10, //초기 텍스트 x 좌표
      textAxisY: 50, //초기 텍스트 y 좌표
    };
  },
  mounted() {
    this.drawText();
  },
  created() {
  },
  watch: {
    text: "drawText",
    textColor: "drawText",
    bgColor: "drawText",
    borderColor: "drawText",
    borderSize: "drawText",
    textSize: "drawText",
    canvasWidth: "drawText",
    canvasHeight: "drawText",
    textAlignment: "drawText",
    textWeight: "drawText",
    textFont: "drawText",
  },
  methods: {
    setTextAxisX() {
      this.textAxisX = 10;
      this.textAxisX = this.textAxisX + this.borderSize;
      this.drawText();
    },

    drawText() {
      const canvas = this.$refs.canvas;
      const ctx = canvas.getContext("2d");

      // Canvas 크기 설정
      canvas.width = this.canvasWidth; // 원하는 너비
      canvas.height = this.canvasHeight; // 원하는 높이

      // 배경색 설정
      ctx.fillStyle = this.bgColor;

      if (this.bgColor_notNull == true) {
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fill();
      }

      // 텍스트 스타일 설정
      ctx.font =
        this.textWeight + " " + this.textSize + "px" + " " + this.textFont; // 폰트 및 크기 설정

      // console.log(ctx.font);
      ctx.fillStyle = this.textColor; // 글자 색상 설정
      ctx.textAlign = this.textAlignment; // 선택한 정렬 옵션을 적용

      const lines = this.text.split("\n");
      const lineHeight = 30; // 줄 간격
      const letterStartX = this.calculateTextX(lines); // 글씨 시작 x

      // 각 줄을 순회하며 텍스트를 그립니다.
      for (let i = 0; i < lines.length; i++) {
        ctx.fillText(lines[i], letterStartX, this.textAxisY + i * lineHeight);
      }

      // 테두리를 그립니다.
      ctx.strokeStyle = this.borderColor; // 테두리 색상 설정
      ctx.lineWidth = this.borderSize; // 테두리 두께 설정

      if (this.borderColor_notNull == true) {
        if (this.borderType == "dash") {
          ctx.setLineDash([10]); // 간격이 10인 점선 설정
        }
        ctx.strokeRect(0, 0, canvas.width, canvas.height); // 캔버스 외곽에 테두리 그리기
      }

      // 텍스트를 Canvas에 그립니다.
      //ctx.clearRect(0, 0, canvas.width, canvas.height); // Canvas를 지우고 새로 그립니다.
      //ctx.fillText(this.text, canvas.width / 2, canvas.height / 2); // 텍스트를 가운데에 그립니다.
    },

    calculateTextX(lines) {
      if (this.textAlignment === "left") {
        return this.textAxisX; // 왼쪽 정렬
      } else if (this.textAlignment === "center") {
        return this.canvasWidth / 2; // 가운데 정렬
      } else {
        return this.canvasWidth - this.textAxisX; // 오른쪽 정렬
      }
    },

    convertTextToImage() {
      // Canvas를 이미지로 변환하여 다운로드 링크 생성
      const canvas = this.$refs.canvas;
      const imageDataUrl = canvas.toDataURL("image/png"); // 이미지 데이터 URL 생성
      const downloadLink = document.createElement("a");
      downloadLink.href = imageDataUrl;
      downloadLink.download = "eozea_letter_image.png"; // 다운로드 파일 이름
      downloadLink.click();
    },
  },
};
</script>

<template>
  <h1>[파판14] 에오르제아어 변역기</h1>

  <h2>이 사이트에 대하여</h2>
  <hr />
  <div class="font-ref">
    <ul>
      <li>입력한 문장을 에오르제아 공용어 폰트로 바꿔주는 사이트 입니다.</li>
      <li>
        폰트는 기본 영어 대/소문자와 숫자를 지원하며, 숫자를 지원하지 않는
        폰트도 있습니다.
      </li>
      <li>입력한 내용은 미리보기에 표시됩니다.</li>
      <li>
        이미지 다운로드 버튼을 눌러 작성하신 이미지를 다운받을 수 있습니다.
      </li>
      <li>각 폰트의 출처는 하단에 있습니다.</li>
    </ul>
  </div>
  <br />
  <h3>입력창</h3>
  <hr />
  <div class="contextDiv">
    <div class="context">
      <textarea
        style="width: 400px; height: 100px"
        v-model="text"
        rows="4"
        cols="50"
        placeholder="텍스트를 입력하세요"
        @input="drawText"
      ></textarea>
    </div>
  </div>

  <h3>설정</h3>
  <hr />
  <div class="config , contextDiv">
    <div class="context">
      <p>
        <span>
          <label for="textFont">폰트 선택 : </label>
          <select id="textFont" v-model="textFont" @change="drawText">
            <option value="Eorzea">Eorzea</option>
            <option value="CartaHandwriting">CartaHandwriting</option>
            <option value="EorzeanCalligraphy-Regular">
              EorzeanCalligraphy-Regular
            </option>
            <option value="EorzeanGraphite">EorzeanGraphite</option>
            <option value="EorzeanPen-Regular">EorzeanPen-Regular</option>
            <option value="EorzeanScratch-Regular">
              EorzeanScratch-Regular
            </option>
            <option value="EorzeanGraphite">EorzeanGraphite</option>
          </select>
        </span>
        <span>
          <label for="textColor">글자 색상 : </label>
          <input type="color" v-model="textColor" @change="drawText" />
        </span>
        <span>
          <label>글자 크기 : </label>
          <input
            type="number"
            size="3"
            maxlength="3"
            v-model="textSize"
            @input="drawText"
            style="width: 50px"
          />
          px
        </span>
      </p>
      <p>
        <span>
          <label for="textAlignment">텍스트 가로 정렬 : </label>
          <select id="textAlignment" v-model="textAlignment" @change="drawText">
            <option value="left">왼쪽 정렬</option>
            <option value="center">가운데 정렬</option>
            <option value="right">오른쪽 정렬</option>
          </select>
        </span>
        <span>
          <label for="textAxisX">글자 가로 위치 : </label>
          <input
            type="number"
            min="0"
            style="width: 50px"
            v-model="textAxisX"
            @change="drawText"
          />
          px
        </span>
        <span>
          <label for="textAxisY">글자 세로 위치 : </label>
          <input
            type="number"
            min="0"
            style="width: 50px"
            v-model="textAxisY"
            @change="drawText"
          />
          px
        </span>
      </p>
      <p>
        <span>
          <label for="canvasWidth">이미지 너비 : </label>
          <select id="canvasWidth" v-model="canvasWidth" @change="drawText">
            <option value="200">200</option>
            <option value="300">300</option>
            <option value="400">400</option>
            <option value="600">600</option>
            <option value="800">800</option>
          </select>
          px
        </span>
        <span>
          <label for="canvasHeight">이미지 높이 : </label>
          <select id="canvasHeight" v-model="canvasHeight" @change="drawText">
            <option value="100">100</option>
            <option value="200">200</option>
            <option value="300">300</option>
            <option value="400">400</option>
            <option value="500">500</option>
            <option value="600">500</option>
          </select>
          px
        </span>
      </p>
      <p>
        <span>
          <input type="checkbox" v-model="bgColor_notNull" @change="drawText" />
          배경색 사용
        </span>
        <span v-if="bgColor_notNull" style="background-color: ghostwhite">
          <label for="textColor">배경색 : </label>
          <input type="color" v-model="bgColor" @change="drawText" />
        </span>
      </p>
      <p>
        <span>
          <input
            type="checkbox"
            v-model="borderColor_notNull"
            @change="drawText"
          />
          테두리 사용
        </span>
        <span v-if="borderColor_notNull" style="background-color: ghostwhite">
          <label for="textColor"> 테두리 색상 : </label>
          <input
            type="color"
            v-model="borderColor"
            @change="drawText"
            v-if="borderColor_notNull"
          />
        </span>
        <span v-if="borderColor_notNull" style="background-color: ghostwhite">
          <label>테두리 두께 : </label>
          <input
            type="number"
            style="width: 50px"
            v-model="borderSize"
            @change="setTextAxisX"
          />
          px
        </span>
        <span v-if="borderColor_notNull" style="background-color: ghostwhite">
          <label for="borderType"> 테두리 타입 </label>
          <select id="borderType" v-model="borderType" @change="drawText">
            <option value="normal">실선</option>
            <option value="dash">점선</option>
          </select>
          px
        </span>
      </p>
    </div>
  </div>

  <br />
  <h3>미리보기</h3>
  <hr />
  <div class="contextDiv">
    <div class="context">
      <canvas style="border: 2px #edf2f5 dashed" ref="canvas"></canvas>
    </div>
    <div class="context">
      <button style="padding: auto; margin: " @click="convertTextToImage">
        이미지 다운로드
      </button>
    </div>
  </div>

  <br />
  <br />
  <details>
    <summary>
      <span style="font-size: 20px; font-weight: bold">폰트 출처</span>
      <hr />
    </summary>

    <div class="contextDiv">
      <div class="font-ref">
        <p>
          <span>Eorzean : </span>
          <br />
          <a href="https://ffxiv.gamerescape.com/wiki/Alphabet"
            >https://ffxiv.gamerescape.com/wiki/Alphabet</a
          >
        </p>
        <p>
          <span>
            EorzeanCalligraphy / EorzeanMess / EorzeanPen / EorzeanScratch
            :</span
          >
          <br />
          <a href="https://x.com/thatskyfii/status/1561786979158839304?s=20"
            >https://x.com/thatskyfii/status/1561786979158839304?s=20</a
          >
          <br />
        </p>
        <p>
          <span> Cartahandwriting : </span>
          <br />
          <a
            href="https://ranofwar.tumblr.com/post/151342456961/eorzean-handwriting-fonts"
            >https://ranofwar.tumblr.com/post/151342456961/eorzean-handwriting-fonts</a
          >
        </p>
        <p>
          <span> EorzeanGraphite : </span>
          <br />
          <a
            href="https://megalodon.jp/2018-0121-1307-10/dachoutom.org/ffxiv/fonts.html"
            >https://megalodon.jp/2018-0121-1307-10/dachoutom.org/ffxiv/fonts.html</a
          >
        </p>
      </div>
    </div>
  </details>
</template>
<style>
  .contextDiv {
    background: #cbdbeb;
    padding: 4px;
  }

  .font-ref {
    background: #f9f9f9;
    border: 1px solid gray;
    border-radius: 10px 10px 10px 10px;
    padding: 0 15px 0 15px;
    margin: 15px 15px 15px 15px;
  }

  .context {
    padding: 15px 0 15px 15px;
  }

  .config p span {
    border: 1px solid gray;
    padding: 8px;
    background-color: #f9f9f9;
    /* display: inline-block; */
    /*  height: 50px; */
  }

  @media only screen and (max-width: 789px) {
    .config p span {
      border: 1px solid gray;
      padding: 4px;
      background-color: #f9f9f9;
      width: 250px;
      height: 25px;
      display: inline-block;
    }
    input {
      width: 80px;
    }
    select {
      width: 80px;
    }

    .context {
      padding: 0 0 0 0;
    }
  }
</style>