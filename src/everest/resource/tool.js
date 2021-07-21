exports.getCode = (text) => {
    text = text.toLowerCase();
    text = text.replace(/\//g, '');
    text = text.replace(/-/g, '');
    text = text.replace(/--/g, '');
    text = text.replace(/,/g, '');
    text = text.replace(/ /g, '-');
    text = text.replace(/á/gi, 'a');
    text = text.replace(/é/gi, 'e');
    text = text.replace(/í/gi, 'i');
    text = text.replace(/ó/gi, 'o');
    text = text.replace(/ú/gi, 'u');
    text = text.replace(/ñ/gi, 'n');

    return text;
};

exports.onlyUnique = (value, index, self) => { 
    return self.indexOf(value) === index;
}

exports.randCode = (len) => { 
    var code = "";
    var chars = "0123456789abcdefABCDEF?¿¡!:;";

    for (x=0; x < lon; x++)
    {
        rand = Math.floor(Math.random()*chars.length);
        code += chars.substr(rand, 1);
    }

    return code;
}

exports.gDateTime = () => {
    var date = new Date();

    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    return year + "-" + month + "-" + day + " " + hour + ":" + min + ":" + sec;
}