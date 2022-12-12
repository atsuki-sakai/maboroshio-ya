

const ProvinceData = [
    {
      "en": "Aichi",
      "jp": "愛知県"
    },
    {
      "en": "Akita",
      "jp": "秋田県"
    },
    {
      "en": "Aomori",
      "jp": "青森県"
    },
    {
      "en": "Chiba",
      "jp": "千葉県"
    },
    {
      "en": "Ehime",
      "jp": "愛媛県"
    },
    {
      "en": "Fukui",
      "jp": "福井県"
    },
    {
      "en": "Fukuoka",
      "jp": "福岡県"
    },
    {
      "en": "Fukushima",
      "jp": "福島県"
    },
    {
      "en": "Gifu",
      "jp": "岐阜県"
    },
    {
      "en": "Gunma",
      "jp": "群馬県"
    },
    {
      "en": "Hiroshima",
      "jp": "広島県"
    },
    {
      "en": "Hokkaidō",
      "jp": "北海道"
    },
    {
      "en": "Hyōgo",
      "jp": "兵庫県"
    },
    {
      "en": "Ibaraki",
      "jp": "茨城県"
    },
    {
      "en": "Ishikawa",
      "jp": "石川県"
    },
    {
      "en": "Iwate",
      "jp": "岩手県"
    },
    {
      "en": "Kagawa",
      "jp": "香川県"
    },
    {
      "en": "Yamanashi",
      "jp": "山梨県"
    },
    {
      "en": "Yamaguchi",
      "jp": "山口県"
    },
    {
      "en": "Kōchi",
      "jp": "高知県"
    },
    {
      "en": "Kumamoto",
      "jp": "熊本県"
    },
    {
      "en": "Kyōto",
      "jp": "京都府"
    },
    {
      "en": "Mie",
      "jp": "三重県"
    },
    {
      "en": "Yamagata",
      "jp": "山形県"
    },
    {
      "en": "Miyazaki",
      "jp": "宮崎県"
    },
    {
      "en": "Nagano",
      "jp": "長野県"
    },
    {
      "en": "Nagasaki",
      "jp": "長崎県"
    },
    {
      "en": "Nara",
      "jp": "奈良県"
    },
    {
      "en": "Niigata",
      "jp": "新潟県"
    },
    {
      "en": "Ōita",
      "jp": "大分県"
    },
    {
      "en": "Okayama",
      "jp": "岡山県"
    },
    {
      "en": "Okinawa",
      "jp": "沖縄県"
    },
    {
      "en": "Ōsaka",
      "jp": "大阪府"
    },
    {
      "en": "Saga",
      "jp": "佐賀県"
    },
    {
      "en": "Saitama",
      "jp": "埼玉県"
    },
    {
      "en": "Shiga",
      "jp": "滋賀県"
    },
    {
      "en": "Shimane",
      "jp": "島根県"
    },
    {
      "en": "Shizuoka",
      "jp": "静岡県"
    },
    {
      "en": "Tochigi",
      "jp": "栃木県"
    },
    {
      "en": "Tokushima",
      "jp": "徳島県"
    },
    {
      "en": "Tottori",
      "jp": "鳥取県"
    },
    {
      "en": "Toyama",
      "jp": "富山県"
    },
    {
      "en": "Tōkyō",
      "jp": "東京都"
    },
    {
      "en": "Miyagi",
      "jp": "宮城県"
    },
    {
      "en": "Wakayama",
      "jp": "和歌山県"
    },
    {
      "en": "Kanagawa",
      "jp": "神奈川県"
    },
    {
      "en": "Kagoshima",
      "jp": "鹿児島県"
    }
]

const provinceToJP = (province: string): string => {

  const matchProvince = ProvinceData.map((_province) => {
    if(_province.en === province) {
      return _province.jp;
    }
  }).filter(e => e)[0]

  return matchProvince ?? province
}

export default provinceToJP