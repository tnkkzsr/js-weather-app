
const serachButton =  document.querySelector('#search-btn');
const locationSlect = document.querySelector('#location');
const weatherInfo = document.querySelector("#weather-info");


// 都市の名前をローマ字から日本語へ変換する関数
function cityNameToJapanese (location){
    const cityMapping = {
        "hokkaido": "北海道",
        "aomori": "青森県",
        "iwate": "岩手県",
        "miyagi": "宮城県",
        "akita": "秋田県",
        "yamagata": "山形県",
        "fukushima": "福島県",
        "ibaraki": "茨城県",
        "tochigi": "栃木県",
        "gunma": "群馬県",
        "saitama": "埼玉県",
        "chiba": "千葉県",
        "tokyo": "東京都",
        "kanagawa": "神奈川県",
        "niigata": "新潟県",
        "toyama": "富山県",
        "ishikawa": "石川県",
        "fukui": "福井県",
        "yamanashi": "山梨県",
        "nagano": "長野県",
        "gifu": "岐阜県",
        "shizuoka": "静岡県",
        "aichi": "愛知県",
        "mie": "三重県",
        "shiga": "滋賀県",
        "kyoto": "京都府",
        "osaka": "大阪府",
        "hyogo": "兵庫県",
        "nara": "奈良県",
        "wakayama": "和歌山県",
        "tottori": "鳥取県",
        "shimane": "島根県",
        "okayama": "岡山県",
        "hiroshima": "広島県",
        "yamaguchi": "山口県",
        "tokushima": "徳島県",
        "kagawa": "香川県",
        "ehime": "愛媛県",
        "kochi": "高知県",
        "fukuoka": "福岡県",
        "saga": "佐賀県",
        "nagasaki": "長崎県",
        "kumamoto": "熊本県",
        "oita": "大分県",
        "miyazaki": "宮崎県",
        "kagoshima": "鹿児島県",
        "okinawa": "沖縄県"
    };
    const locationJapanese  =cityMapping[location]
    return locationJapanese

}

//JSONデータから天気情報を取得しHTMLに表示する
function getWeatherInfo(data,locationJapanese){
    const temperature = ((data.main.temp) -273.2).toFixed(1);
        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed;
        const weatherCondition = data.weather[0].description;

        weatherInfo.innerHTML =`
        <h2>${locationJapanese}</h2>
        <p>気温：${temperature}度</p>
        <p>湿度：${humidity}%</p>
        <p>風速：${windSpeed}km/s</p>
        <p>天気：${weatherCondition}</p>
        
        `;
}

serachButton.addEventListener('click', async function(){
    //天気情報の取得と表示の処理を行う
    const location = locationSlect.value;
    
    try {
        if(!location){
            alert("地域を選択してください");
            return;
        }
        
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=2c3d07680039ad9f6aadbe3d203373e8`)
        const data = await response.json();
        //都市名を日本語へ変換
        const locationJapanese = cityNameToJapanese(location);

        //それぞれの天気情報を取得
        getWeatherInfo(data,locationJapanese);
        

    } catch(error){
        console.error('There has been a problem with your fetch operation:', error);
        weatherInfo.innerHTML = "あなたが入力した地域の天気情報の情報は得ることができませんでした。";
    }

});