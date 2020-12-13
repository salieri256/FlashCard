/**
 * @type {string[][]}
 */
let csvArray = null;
/**
 * 何シート目か
 * @type {number}
 */
let sheetIndex = 0;
/**
 * 表かどうか
 * @type {boolean}
 */
let isFront = true;
/**
 * @type {HTMLLIElement}
 */
const settingsBtn = document.getElementById('settings-btn');
/**
 * @type {HTMLInputElement}
 */
const inputFile = document.getElementById('input-file');
/**
 * @type {HTMLLIElement}
 */
const nextBtn = document.getElementById('next-btn');
/**
 * @type {HTMLDivElement}
 */
const card = document.getElementById('card');

function main() {
    settingsBtn.addEventListener('click', () => {

    });
    inputFile.addEventListener('change', async () => {
        const file = inputFile.files[0];
        onChangeFile(file);
    });
    nextBtn.addEventListener('click', () => {
        if(csvArray === null) return;

        sheetIndex++;
        if(sheetIndex >= csvArray.length) {
            sheetIndex = 0;
        }

        updateCard();
    });
    card.addEventListener('click', () => {
        if(csvArray === null) return;

        isFront = !isFront;
        updateCard();
    });
}

/**
 * @param {File} file 
 */
async function onChangeFile(file) {
    function enableNextBtn() {
        nextBtn.classList.remove('disabled');
        nextBtn.classList.add('shadow');
    }

    /**
     * @param {string} text 
     */
    function writeOnFileBtn(text) {
        /**
         * @type {HTMLLabelElement}
         */
        const inputFileLabel = document.getElementById('input-file-label');
        inputFileLabel.innerHTML = text;
    }

    /**
     * @param {File} file
     * @returns {Promise<string | ArrayBuffer>}
     */
    function loadFile(file) {
        const fr = new FileReader();
        fr.readAsText(file);// ファイルを読み取る

        return new Promise((resolve, reject) => {
            fr.onload = e => {
                const result = e.target.result;
                resolve(result);
            };
            fr.onerror = () => {
                const errorText = `Error! ${file.name}を読み込むことができません。`;
                alert(errorText);
                reject(errorText);
            }
        });
    }

    /**
     * @param {string} data 
     */
    function toCSVArray(data) {
        const result = [];
        const rows = data.split('\n');
        for(let i = 0; i < rows.length; i++) {
            const row = rows[i];
            const items = row.split(',');
            result.push(items);
        }

        return result;
    }

    const data = await loadFile(file);// ファイルを読み込む
    if(typeof data !== 'string') {
        alert(`Error! ${file.name}を読み込むことができません。`);
        return false;
    }
    
    csvArray = toCSVArray(data);// 配列に変換
    enableNextBtn();// nextボタンを有効にする
    writeOnFileBtn(file.name);// ファイル選択ボタンにファイル名を表示
    updateCard();

    return true;
}

function updateCard() {
    /**
     * カードに文字を書き込む
     * @param {string} text 
     */
    function writeOnCard(text) {
        const cardText = document.getElementById('card-text');
        cardText.innerHTML = text;
    }

    let secondIndex;
    if(isFront) {
        card.classList.add('cut-topright');
        card.classList.remove('cut-topleft');
        secondIndex = 0;
    }
    else {
        card.classList.add('cut-topleft');
        card.classList.remove('cut-topright');
        secondIndex = 1;
    }

    writeOnCard(csvArray[sheetIndex][secondIndex]);
}

main();