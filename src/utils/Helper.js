export function stringToNumberFormat(text) {
  let value = findAndReplace(text, ".", "")
    .toString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  return value;
}

export function findAndReplace(string, target, replacement) {
  var i = 0,
    length = string.length;

  for (i; i < length; i++) {
    string = string.replace(target, replacement);
  }

  return string;
}

export const bag = [
  { label: "Vé thường", value: 6 },
  { label: "Bao 5", value: 5 },
  { label: "Bao 7", value: 7 },
  { label: "Bao 8", value: 8 },
  { label: "Bao 9", value: 9 },
  { label: "Bao 10", value: 10 },
  { label: "Bao 11", value: 11 },
  { label: "Bao 12", value: 12 },
  { label: "Bao 13", value: 13 },
  { label: "Bao 14", value: 14 },
  { label: "Bao 15", value: 15 },
  { label: "Bao 18", value: 18 }
];

export const getBagName = id => {
  let name = "";
  switch (id) {
    case 6:
      name = "Vé thường";
      break;
    case 5:
      name = "Bao 5";
      break;
    case 7:
      name = "Bao 7";
      break;
    case 8:
      name = "Bao 8";
      break;
    case 9:
      name = "Bao 9";
      break;
    case 10:
      name = "Bao 10";
      break;
    case 11:
      name = "Bao 11";
      break;
    case 12:
      name = "Bao 12";
      break;
    case 13:
      name = "Bao 13";
      break;
    case 14:
      name = "Bao 14";
      break;
    case 15:
      name = "Bao 15";
      break;
    case 18:
      name = "Bao 18";
      break;
    default:
      break;
  }

  return name;
};

export const initBag = bag => {
  let data = [];
  switch (bag) {
    case 5:
      data = ["", "", "", "", ""];
      break;
    case 7:
      data = ["", "", "", "", "", "", ""];
      break;
    case 8:
      data = ["", "", "", "", "", "", "", ""];
      break;
    case 9:
      data = ["", "", "", "", "", "", "", "", ""];
      break;
    case 10:
      data = ["", "", "", "", "", "", "", "", "", ""];
      break;
    case 11:
      data = ["", "", "", "", "", "", "", "", "", "", ""];
      break;
    case 12:
      data = ["", "", "", "", "", "", "", "", "", "", "", ""];
      break;
    case 13:
      data = ["", "", "", "", "", "", "", "", "", "", "", "", ""];
      break;
    case 14:
      data = ["", "", "", "", "", "", "", "", "", "", "", "", "", ""];
      break;
    case 15:
      data = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];
      break;
    case 18:
      data = [
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        ""
      ];
      break;
    default:
      data = ["", "", "", "", "", ""];
      break;
  }
  return data;
};

export const getPriceByBag = bag => {
  let data;
  switch (bag) {
    case 5:
      data = 400000;
      break;
    case 7:
      data = 70000;
      break;
    case 8:
      data = 280000;
      break;
    case 9:
      data = 840000;
      break;
    case 10:
      data = 2100000;
      break;
    case 11:
      data = 4620000;
      break;
    case 12:
      data = 9240000;
      break;
    case 13:
      data = 17160000;
      break;
    case 14:
      data = 30030000;
      break;
    case 15:
      data = 50050000;
      break;
    case 18:
      data = 185640000;
      break;
    default:
      data = 10000;
      break;
  }
  return data;
};

export const getPriceByBagPowers = bag => {
  let data;
  switch (bag) {
    case 5:
      data = 500000;
      break;
    case 7:
      data = 70000;
      break;
    case 8:
      data = 280000;
      break;
    case 9:
      data = 840000;
      break;
    case 10:
      data = 2100000;
      break;
    case 11:
      data = 4620000;
      break;
    case 12:
      data = 9240000;
      break;
    case 13:
      data = 17160000;
      break;
    case 14:
      data = 30030000;
      break;
    case 15:
      data = 50050000;
      break;
    case 18:
      data = 185640000;
      break;
    default:
      data = 10000;
      break;
  }
  return data;
};

export const max4dType = [
  { label: "Vé thường", value: 1 },
  // { label: 'Cuộn 1', value: 2 },
  // { label: 'Cuộn 4', value: 3 },
  { label: "Tổ hợp", value: 4 }
  // { label: 'Bao', value: 5 },
];

export const getTypeName = type => {
  let name;
  switch (type) {
    case 1:
      name = "Vé thường";
      break;
    // case 2:
    //     name = "Cuộn 1";
    //     break;
    // case 3:
    //     name = "Cuộn 4";
    //     break;
    case 4:
      name = "Tổ hợp";
      break;
    // case 5:
    //     name = "Bao";
    //     break;
    default:
      break;
  }
  return name;
};

export const getTypeNameMax4D = type => {
  let name;
  switch (type) {
    case 0:
      name = "Vé thường";
      break;
    case 4:
    case 6:
    case 12:
    case 24:
      name = "Tổ hợp";
      break;
    default:
      break;
  }
  return name;
};

export const getStatusItemName = code => {
  let name = "";
  // console.log(code)
  switch (code) {
    case "P":
      name = "Chưa xổ";
      break;
    default:
      name = "Đã xổ";
      break;
  }
  return name;
};

export const getOrderStatusName = code => {
  let name = "";
  switch (code) {
    case "S":
    case "W":
    case "F":
    case "U":
      name = "Chờ in vé";
      break;
    case "A":
      name = "Đã in vé";
      break;
    case "G":
      name = "Chờ giao vé";
      break;
    case "D":
      name = "Đã giao vé";
      break;
    case "R":
    case "T":
      name = "Lỗi in vé";
      break;
    case "E":
      name = "Không thành công";
      break;
    case "O":
      name = "Hết bộ số";
      break;
    case "H":
      name = "Chờ xử lý lỗi";
      break;
    case "I":
      name = "Đã xử lý lỗi";
      break;
    default:
      name = "N/A";
      break;
  }

  return name;
};

export const getWeekdays = id => {
  let day = "";
  switch (id) {
    case 0:
      day = "Chủ nhật";
      break;
    case 1:
      day = "Thứ 2";
      break;
    case 2:
      day = "Thứ 3";
      break;
    case 3:
      day = "Thứ 4";
      break;
    case 4:
      day = "Thứ 5";
      break;
    case 5:
      day = "Thứ 6";
      break;
    case 6:
      day = "Thứ 7";
      break;
    default:
      day = "";
      break;
  }
  return day;
};

export const getPadLeft = str => {
  let pad = "00";
  return pad.substring(0, pad.length - str.length) + str;
};
export const padLeft = (str, len, pad) => {
  let pads = "";
  while (pads.length < len) {
    pads += pad.toString();
  }
  return pads.substring(0, pads.length - str.toString().length) + str;
};
export const getNameWin = code => {
  let name = "";
  switch (code) {
    case "P":
      name = "Jackpot";
      break;
    case "A":
      name = "Giải nhất";
      break;
    case "B":
      name = "Giải nhì";
      break;
    case "C":
      name = "Giải ba";
      break;
    case "D":
      name = "KK1";
      break;
    case "E":
      name = "KK2";
      break;
    case "J":
      name = "Jackpot2";
      break;
  }
  return name;
};

export const getNameWinMax3DPlus = code => {
  let name = "";
  switch (code) {
    case "A":
      name = "Giải nhất";
      break;
    case "B":
      name = "Giải nhì";
      break;
    case "C":
      name = "Giải ba";
      break;
    case "D":
      name = "Giải tư";
      break;
    case "E":
      name = "Giải năm";
      break;
    case "F":
      name = "Giải sáu";
      break;
    case "G":
      name = "Giải bảy";
      break;
  }
  return name;
};
export const getWeekdaysShort = id => {
  let day = "";
  switch (id) {
    case 0:
      day = "CN";
      break;
    case 1:
      day = "T2";
      break;
    case 2:
      day = "T3";
      break;
    case 3:
      day = "T4";
      break;
    case 4:
      day = "T5";
      break;
    case 5:
      day = "T6";
      break;
    case 6:
      day = "T7";
      break;
    default:
      day = "";
      break;
  }
  return day;
};

export function checkPrize(lineA, lineB, lineC, lineD, lineE, lineF) {
  let numA = StatusWinToNum(lineA);
  let numB = StatusWinToNum(lineB);
  let numC = StatusWinToNum(lineC);
  let numD = StatusWinToNum(lineD);
  let numE = StatusWinToNum(lineE);
  let numF = StatusWinToNum(lineF);
  let data = [numA, numB, numC, numD, numE, numF];
  let max = data[0];
  for (let i = 0; i < 6; i++) {
    if (data[i] > max) {
      max = data[i];
    }
  }
  return max;
}

export const StatusWinToNum = id => {
  let num = 0;
  switch (id) {
    case "O":
      num = 0;
      break;
    case "G":
      num = 1;
      break;
    case "F":
      num = 2;
      break;
    case "E":
      num = 3;
      break;
    case "D":
      num = 4;
      break;
    case "C":
      num = 5;
      break;
    case "B":
      num = 6;
      break;
    case "A":
      num = 7;
      break;
    case "J":
      num = 8;
      break;
    case "P":
      num = 9;
      break;
    default:
      num = 0;
      break;
  }
  return num;
};
export const getNameWinByNum = code => {
  let name = "";
  switch (code) {
    case 9:
      name = "Jackpot";
      break;
    case 7:
      name = "Giải nhất";
      break;
    case 6:
      name = "Giải nhì";
      break;
    case 5:
      name = "Giải ba";
      break;
    case 4:
      name = "Giải KK1";
      break;
    case 3:
      name = "Giải KK2";
      break;
    case 8:
      name = "Jackpot2";
      break;
  }
  return name;
};

export const getNameWinMax3DPlusByNum = code => {
  let name = "";
  switch (code) {
    case 1:
      name = "Giải nhất";
      break;
    case 2:
      name = "Giải nhì";
      break;
    case 3:
      name = "Giải ba";
      break;
    case 4:
      name = "Giải tư";
      break;
    case 5:
      name = "Giải năm";
      break;
    case 6:
      name = "Giải sáu";
      break;
    case 7:
      name = "Giải bảy";
      break;
  }
  return name;
};

export const getDayOpen = productID => {
  const date = new Date();
  let d = date.getDay();
  const h = date.getHours();
  let name = "";

  if (h < 18) {
    switch (productID) {
      case 1:
        if (d == 0 || d == 3 || d == 5) {
          name = "Hôm nay xổ";
        }
        break;
      case 2:
      case 3:
        if (d == 2 || d == 4 || d == 6) {
          name = "Hôm nay xổ";
        }
        break;
      case 4:
      case 5:
        if (d == 1 || d == 3 || d == 5) {
          name = "Hôm nay xổ";
        }
        break;
      case 7:
        name = "Hôm nay xổ";
        break;
      case 8:
        name = "Hôm nay xổ";
        break;
      case 9:
        name = "Hôm nay xổ";
      default:
        break;
    }
  }
  // console.log(name)
  return name;
};

export const getNameKenoParity = id => {
  let name = "";
  switch (id) {
    case "1":
      name = "Chẵn";
      break;
    case "2":
      name = "Lẻ";
      break;
    case "3":
      name = "Lớn";
      break;
    case "4":
      name = "Nhỏ";
      break;
    default:
      break;
  }
  return name;
};

export const kenoLevel = [
  { label: "Bậc 1", value: 1 },
  { label: "Bậc 2", value: 2 },
  { label: "Bậc 3", value: 3 },
  { label: "Bậc 4", value: 4 },
  { label: "Bậc 5", value: 5 },
  { label: "Bậc 6", value: 6 },
  { label: "Bậc 7", value: 7 },
  { label: "Bậc 8", value: 8 },
  { label: "Bậc 9", value: 9 },
  { label: "Bậc 10", value: 10 },
];